import { act, renderHook } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { useDeadlineReached } from '@/lib/use-deadline';

afterEach(()=>vi.useRealTimers());
it('an idle page notices expiry without a parent rerender',()=>{
  vi.useFakeTimers();vi.setSystemTime(new Date('2026-10-01T10:00:00Z'));
  const deadline=Date.now()+2000;
  const {result}=renderHook(()=>useDeadlineReached(deadline));
  expect(result.current).toBe(false);
  act(()=>vi.advanceTimersByTime(2500));
  expect(result.current).toBe(true);
});
it('changing the selected record observes its new deadline immediately',()=>{
  vi.useFakeTimers();vi.setSystemTime(new Date('2026-10-01T10:00:00Z'));
  const {result,rerender}=renderHook(({deadline}:{deadline:number|null})=>useDeadlineReached(deadline),{initialProps:{deadline:Date.now()-1000 as number|null}});
  expect(result.current).toBe(true);
  rerender({deadline:Date.now()+5000});expect(result.current).toBe(false);
  rerender({deadline:null});expect(result.current).toBe(true);
});
