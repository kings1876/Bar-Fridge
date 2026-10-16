import React, { useEffect, useState } from 'react';

// Mounts non-critical interactive chrome shortly after the page has loaded, so the first render stays small.
// The build-time server render (globalThis.__SSR__) includes it immediately.
export const AfterLoad: React.FC<{ minHeight?: number; children: React.ReactNode }> = ({ minHeight = 0, children }) => {
  const [ready, setReady] = useState(Boolean((globalThis as { __SSR__?: boolean }).__SSR__));

  useEffect(() => {
    if (ready) return;
    let t: ReturnType<typeof setTimeout>;
    const go = () => { t = setTimeout(() => setReady(true), 400); };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
    return () => { clearTimeout(t); window.removeEventListener('load', go); };
  }, [ready]);

  return ready ? <>{children}</> : <div aria-hidden="true" style={{ minHeight }} />;
};
