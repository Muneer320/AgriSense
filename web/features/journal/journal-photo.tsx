"use client";

import { Button, Callout } from '@/components/ui';
import { media } from '@/lib/api/routes';
import { useDeadlineReached } from '@/lib/use-deadline';
import { useState } from 'react';

/** Fetch an owner-authorized, expiring link only when the user asks to view it. */
export function JournalPhoto({ id, index }: { id: string; index: number }) {
  const [access, setAccess] = useState<{ url: string; expires_at: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const expired = useDeadlineReached(access ? Date.parse(access.expires_at) : null);
  async function open() {
    setBusy(true); setError(false);
    try { setAccess((await media.access(id)).data); }
    catch { setError(true); }
    finally { setBusy(false); }
  }
  return <div className="mt-2">
    {access && !expired ? <a href={access.url} target="_blank" rel="noopener noreferrer" className="inline-block rounded-control border border-mist p-1">
      {/* eslint-disable-next-line @next/next/no-img-element -- short-lived authenticated media link; never sent through an image proxy. */}
      <img src={access.url} alt={`Attached field photo ${index}`} referrerPolicy="no-referrer" className="max-h-48 max-w-full rounded-control object-contain" />
      <span className="block px-1 py-1 text-xs text-forest underline">Open photo {index}</span>
    </a> : <Button variant="secondary" busy={busy} onClick={()=>void open()}>View photo {index}</Button>}
    {error ? <Callout tone="caution" className="mt-1 text-xs">This photo could not be opened. Try again in a moment.</Callout> : null}
  </div>;
}
