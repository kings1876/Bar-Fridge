import React, { useEffect, useState } from 'react';

// Renders heavy below-the-fold sections in consecutive short tasks instead of one long one, which keeps the
// main thread responsive during the first load (lower Total Blocking Time). Every section still renders
// within a fraction of a second, never depends on scrolling or idle callbacks, and the build-time
// server render (flagged with globalThis.__SSR__) includes everything immediately.
let firstLoadDone = false;

export const Staged: React.FC<{ stage: number; minHeight?: number; children: React.ReactNode }> = ({ stage, minHeight = 480, children }) => {
  const immediate = stage <= 0 || firstLoadDone || Boolean((globalThis as { __SSR__?: boolean }).__SSR__);
  const [ready, setReady] = useState(immediate);

  useEffect(() => {
    if (ready) return;
    const t = setTimeout(() => {
      setReady(true);
      firstLoadDone = true;
    }, stage * 70);
    return () => clearTimeout(t);
  }, [ready, stage]);

  return ready ? <>{children}</> : <div aria-hidden="true" style={{ minHeight }} />;
};
