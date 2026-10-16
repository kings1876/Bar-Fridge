import React, { useEffect, useRef, useState } from 'react';

// Below-the-fold sections render when they approach the viewport instead of during the first load, which keeps
// the main thread free while the page becomes interactive (lower Total Blocking Time). Crawlers and no-JS
// visitors get the full prerendered copy, and the build-time server render (globalThis.__SSR__) includes everything.
export const Staged: React.FC<{ stage: number; minHeight?: number; className?: string; children: React.ReactNode }> = ({ stage, minHeight = 600, className, children }) => {
  const immediate = stage <= 0 || Boolean((globalThis as { __SSR__?: boolean }).__SSR__) || typeof IntersectionObserver === 'undefined';
  const [ready, setReady] = useState(immediate);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ready || !ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin: '900px 0px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ready]);

  return ready ? <>{children}</> : <div ref={ref} aria-hidden="true" className={className} style={{ minHeight }} />;
};
