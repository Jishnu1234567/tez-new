import { useEffect, useLayoutEffect, useState } from 'react';

// Helpers that keep the first render identical on the server (prerender) and in the
// browser, then adapt to the device once the page is running.

/* useLayoutEffect in the browser, useEffect during the build-time render (no warning). */
export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* False on the first render, then the live result of the media query. */
export function useMediaQuery(query) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

/* True once the component is running in the browser. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/* Picks the phone or desktop video only after mount, so phones never start the large file. */
export function useVideoSrc(desktop, mobile, query = '(max-width: 900px)') {
  const mounted = useMounted();
  const small = useMediaQuery(query);
  if (!mounted) return undefined;
  return small && mobile ? mobile : desktop;
}
