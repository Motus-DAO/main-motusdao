import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export { ScrollTrigger };

let configured = false;
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Site header + safe area — keep pins from jumping under the chrome. A pinned
 * stage must be exactly `100svh - SCROLL_PIN_OFFSET` tall (see `--pin-stage`
 * in globals.css), otherwise it either hangs below the fold or leaves a strip
 * of the neighbouring section on screen for the whole pin.
 */
export const SCROLL_PIN_OFFSET = 72;
export const SCROLL_PIN_TOP = `top ${SCROLL_PIN_OFFSET}px`;

/**
 * Higher refreshes first. Downstream pins must measure after upstream
 * pin-spacers exist; otherwise their start lands too early, they scrub while
 * the reader is still in an earlier beat, then jump to the real range broken.
 */
export const REFRESH_PRIORITY_ANSWER = 30;
export const REFRESH_PRIORITY_DEFINITION = 20;
export const REFRESH_PRIORITY_SEQUENCE = 10;

export function registerScrollTrigger() {
  gsap.registerPlugin(ScrollTrigger);
  if (configured) return;
  configured = true;
  ScrollTrigger.config({
    // One onUpdate per tick instead of per scroll event.
    limitCallbacks: true,
    // Mobile URL-bar show/hide fires resize; re-measuring several pinned
    // sections mid-scroll makes the page jump.
    ignoreMobileResize: true,
  });
}

/** Debounced refresh after multiple pin sections mount or resize. */
export function scheduleScrollTriggerRefresh() {
  if (refreshTimer) clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    refreshTimer = null;
    ScrollTrigger.refresh(true);
  }, 120);
}

/**
 * Resize subscription that ignores height-only changes. Pin distances are
 * derived from `innerHeight`, so reacting to every viewport height change
 * would re-measure pins on every mobile scroll gesture.
 */
export function onViewportWidthChange(handler: () => void) {
  let lastWidth = window.innerWidth;

  const onResize = () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    handler();
  };

  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}
