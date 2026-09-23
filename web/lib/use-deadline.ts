"use client";
import { useCallback, useSyncExternalStore } from "react";

/** A display deadline must change even when the user leaves the page idle. */
export function useDeadlineReached(deadline: number | null): boolean {
  const read = useCallback(
    () => deadline === null || !Number.isFinite(deadline) || Date.now() >= deadline,
    [deadline],
  );
  const subscribe = useCallback((notify: () => void) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    function schedule() {
      if (deadline === null || !Number.isFinite(deadline)) return;
      const remaining = deadline - Date.now();
      if (remaining <= 0) { notify(); return; }
      timer = setTimeout(schedule, Math.min(remaining + 1, 2_147_483_647));
    }
    if (deadline !== null && deadline > Date.now()) schedule();
    return () => { if (timer !== undefined) clearTimeout(timer); };
  }, [deadline]);
  // Missing/invalid server-side deadlines are treated conservatively.
  return useSyncExternalStore(subscribe, read, () => true);
}
