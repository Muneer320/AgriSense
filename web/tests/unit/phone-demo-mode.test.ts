import { afterEach, expect, it, vi } from 'vitest';
import { needsSmsVerification } from '@/lib/phone';

afterEach(()=>vi.unstubAllEnvs());
it('the local demo uses the real emulator Phone Auth path for a fictional number',()=>{
  vi.stubEnv('NEXT_PUBLIC_LOCAL_DEMO','true');
  expect(needsSmsVerification('+16505550123')).toBe(true);
  vi.stubEnv('NEXT_PUBLIC_LOCAL_DEMO','false');
  expect(needsSmsVerification('+16505550123')).toBe(false);
});
