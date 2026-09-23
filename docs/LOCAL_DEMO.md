# Run the local AgriSense demo

This fork includes a synthetic local demonstration of the actual web app, API, database and authentication flow. No team environment file, Firebase account, Google Cloud project or model key is required.

## Start

Install Git and Docker with Compose v2. Use Linux containers; Docker Desktop with WSL2 works on Windows. The first build downloads Python, Node and container dependencies.

```sh
git clone https://github.com/Muneer320/AgriSense.git
cd AgriSense
git switch codex/cleanup-demo
docker compose -p agrisense-demo up -d --build --wait
```

Open **http://localhost:5176**. The page shows a permanent local synthetic demo notice. All four services should be healthy (`docker compose -p agrisense-demo ps`).

| Service | Local address | Purpose |
| --- | --- | --- |
| Web | http://localhost:5176 | Static production export served by nginx |
| API readiness | http://localhost:8103/health/ready | FastAPI plus database readiness |
| Auth Emulator UI | http://localhost:4000 | Local synthetic accounts |
| Auth Emulator | http://localhost:9099 | Firebase SDK and Admin verification |
| PostgreSQL | Internal Compose network only | Field, season, journal and job records |

Published ports bind to loopback. This configuration is for one local developer, with disposable database trust authentication inside the Compose network. Do not expose it publicly or reuse it as a production deployment.

## Five-minute walkthrough

1. Select **Start with your field**. Use the fictional number **+16505550123**, then **Send code**. No SMS is sent. Read its newly generated code with `docker compose -p agrisense-demo logs --tail=30 auth`. Enter that code and choose **Verify and continue**. There is no fixed shared code.
2. Choose **Add your first field**, read the separate consent choices, and continue. Use browser location or village/pincode search. Use synthetic field details and images only.
3. Enter a name and area. Crop and soil information can be deferred. **I have a soil card** opens the real uploader. Extraction needs a configured Google model and is unavailable in this credential-free demo; skip it rather than entering invented readings. Human review of a returned draft is separately covered by component tests.
4. Save the field. Add a wheat season from the dashboard, then open **Journal → Add entry**. Add a note and optional synthetic photo. Save, reload, and use **View photo** to obtain an expiring owner-authorized link.
5. Explore plan, water and money screens and change language. Missing evidence and unavailable providers remain visible. The synthetic demo does not certify spray timing or provide field advice.

The five central dictionaries cover shared navigation and selected controls. Some explanatory copy, journal and agronomist screens remain English. Non-English terminology is pending human review. WhatsApp conversation handling still defaults to English.

## Data and shutdown

Compose keeps PostgreSQL, local media and Auth Emulator exports in named volumes. A normal stop and restart retain them:

```sh
docker compose -p agrisense-demo down
docker compose -p agrisense-demo up -d --wait
```

The emulator exports on graceful shutdown; allow it to finish if you want to retain local accounts. Never use real farmer records here. Do not commit browser sessions, exported accounts, media volumes or emulator logs. The service worker precaches public shell assets only; private API responses and bearer tokens are not cached there.

## Repeat the checks

Node **>=22.12** is required; CI uses Node 24. Start Compose first. This suite uses real local services, fictional numbers and a generated image fixture:

```sh
cd web
npm ci
npx playwright install chromium
npx playwright test --config playwright.demo.config.ts
```

On Windows with Chrome installed, set `DEMO_CHROME_PATH` to its executable path instead of downloading Chromium. The test config writes synthetic screenshots only, with trace/video/auth-state exports disabled. Do not repoint the suite at a real Firebase project.

The separate `npm run test:e2e` suite defaults to contract fixtures. Its success is UI evidence, **not** backend integration evidence. See [development checks](DEVELOPMENT.md).

## Troubleshooting

- If a port is occupied, stop the application using it. Choosing other web/API ports also requires rebuilding the public URLs in `infra/demo/web.Dockerfile` and matching API public URLs/CORS settings; changing port mappings alone is insufficient.
- Retry a Docker registry TLS timeout after connectivity recovers; no data reset is needed.
- Refresh after rebuilding the web image. nginx preserves the published port on redirects such as `/sign-in`.
- OCR, grounded assistant answers, forecast-dependent recommendations and outbound WhatsApp need actual providers. Their unavailable states are expected here. `WHATSAPP_SEND_MODE=outbox` stays set; no real message is sent.
- [Historical team setup](TEAM_SETUP_AND_MANUAL_TESTING.md) describes the original cloud environment. This demo does not consume that credential file or verify/repair the former public deployment.
