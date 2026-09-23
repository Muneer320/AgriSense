import { expect, test, type Page, type APIRequestContext } from '@playwright/test';

const api = 'http://localhost:8103/api/v1';
const emulator = 'http://localhost:9099';

async function signIn(page: Page, request: APIRequestContext, phone: string) {
  await page.goto('/sign-up');
  await expect(page.getByText('Using the local Firebase Auth Emulator.', { exact: false })).toBeVisible();
  await page.getByLabel('Phone number', { exact: true }).fill(phone);
  await page.getByRole('button', { name: 'Send code', exact: true }).click();
  await expect(page.getByLabel('Verification code', { exact: true })).toBeVisible();
  const codes = await request.get(`${emulator}/emulator/v1/projects/demo-agrisense/verificationCodes`);
  expect(codes.ok()).toBeTruthy();
  const selected = (await codes.json()).verificationCodes.filter((c: { phoneNumber: string }) => c.phoneNumber === phone).at(-1);
  expect(Boolean(selected?.code)).toBeTruthy();
  await page.getByLabel('Verification code', { exact: true }).fill(selected.code);
  const verified = page.waitForResponse(r => r.url().includes('accounts:signInWithPhoneNumber') && r.status() === 200);
  await page.getByRole('button', { name: 'Verify and continue', exact: true }).click();
  const token: string = (await (await verified).json()).idToken;
  await expect(page).toHaveURL('http://127.0.0.1:5176/');
  return token;
}

test('real emulator sign-in, onboarding, media journal, persistence and account isolation', async ({ page, request, browser }, info) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  // Reserved fictional US range. Only the demo-agrisense Auth Emulator is used.
  const phone = `+165055501${String(Date.now() % 90).padStart(2, '0')}`;
  const token = await signIn(page, request, phone);
  const headers = { Authorization: `Bearer ${token}` };
  const me = await request.get(`${api}/me`, { headers });
  expect((await me.json()).meta.data_mode).toBe('demo');

  const name = `Synthetic wheat field ${Date.now()}`;
  await page.goto('/onboarding');
  await page.getByRole('checkbox', { name: /I agree to AgriSense/ }).check();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByRole('button', { name: 'Use my location', exact: true }).click();
  await expect(page.getByText('Location captured', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByLabel('Field name', { exact: true }).fill(name);
  await page.getByLabel('Area', { exact: true }).fill('1');
  await page.getByRole('button', { name: 'hectare', exact: true }).click();
  const created = page.waitForResponse(r => r.url() === `${api}/fields` && r.request().method() === 'POST');
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  const fieldResponse = await created;
  expect(fieldResponse.status(), await fieldResponse.text()).toBe(201);
  const field = (await fieldResponse.json()).data;
  await expect(page.getByRole('heading', { name: 'Which crop?', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByRole('button', { name: /I have a soil card/ }).click();
  await expect(page.getByRole('button', { name: 'Choose a photo', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page).toHaveURL(`http://127.0.0.1:5176/?field=${field.id}`);
  await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();

  // Create the season through the real form, not a fixture or direct database seed.
  await page.getByText('I already know which crop', { exact: true }).click();
  await page.getByRole('button', { name: 'Wheat', exact: true }).click();
  await page.getByLabel('Sowing date (leave blank if you are not sure)', { exact: true }).fill('2026-10-01');
  const seasonSaved = page.waitForResponse(r => r.url() === `${api}/fields/${field.id}/seasons` && r.request().method() === 'POST');
  await page.getByRole('button', { name: 'Add this crop', exact: true }).click();
  const seasonResponse = await seasonSaved;
  expect(seasonResponse.status(), await seasonResponse.text()).toBe(201);
  const season = (await seasonResponse.json()).data;
  await page.reload();
  await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
  await expect(page.getByText('Wheat', { exact: true }).first()).toBeVisible();
  await expect(page.locator('[aria-busy="true"]')).toHaveCount(0);
  await page.screenshot({ path: info.outputPath('field-desktop.png'), fullPage: true });
  await page.goto('/journal');
  await page.getByRole('button', { name: 'Add entry', exact: true }).click();
  const note = `Synthetic inspection ${Date.now()}`;
  await page.getByLabel('Note (optional)', { exact: true }).fill(note);
  // Valid synthetic 1px PNG, generated fixture; never a farmer/device photograph.
  await page.locator('input[type=file]').setInputFiles({
    name: 'synthetic-field.png', mimeType: 'image/png',
    buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aVl8AAAAASUVORK5CYII=', 'base64'),
  });
  const saved = page.waitForResponse(r => r.url().includes(`/seasons/${season.id}/journal`) && r.request().method() === 'POST');
  await page.getByRole('button', { name: 'Save to journal', exact: true }).click();
  const savedResponse = await saved;
  expect(savedResponse.status(), await savedResponse.text()).toBe(201);
  await expect(page.getByRole('button', { name: 'Save to journal', exact: true })).not.toBeVisible();
  await expect(page.getByText(note, { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText(note, { exact: true })).toBeVisible();
  const journal = await request.get(`${api}/seasons/${season.id}/journal`, { headers });
  const entry = (await journal.json()).data.items.find((e: { text: string }) => e.text === note);
  expect(entry.media_ids).toHaveLength(1);
  await page.getByRole('button', { name: 'View photo 1', exact: true }).click();
  await expect.poll(() => page.getByAltText('Attached field photo 1').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await page.screenshot({ path: info.outputPath('journal-desktop.png'), fullPage: true });

  for (const width of [360, 768, 1280, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: info.outputPath('journal-mobile.png'), fullPage: true });
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  const cached = await page.evaluate(async () => {
    const urls: string[] = [];
    for (const key of await caches.keys()) for (const r of await (await caches.open(key)).keys()) urls.push(r.url);
    return urls;
  });
  expect(cached.some(url => /\/api\/|8103|9099/.test(url))).toBe(false);
  expect((await request.get(`${api}/fields/${field.id}`)).status()).toBe(401);

  const other = await browser.newContext();
  const otherPage = await other.newPage();
  const otherToken = await signIn(otherPage, request, '+16505550199');
  expect((await request.get(`${api}/fields/${field.id}`, { headers: { Authorization: `Bearer ${otherToken}` } })).status()).toBe(404);
  expect((await request.get(`${api}/media/${entry.media_ids[0]}/access`, { headers: { Authorization: `Bearer ${otherToken}` } })).status()).toBe(404);
  await other.close();
  expect(errors).toEqual([]);
});

test('public routes preserve the published port and fit all required viewport sizes', async ({ page }) => {
  for (const path of ['/', '/sign-up', '/sign-in']) {
    await page.goto(path);
    expect(new URL(page.url()).port).toBe('5176');
    for (const width of [360, 768, 1280, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
});
