"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  onViewportWidthChange,
  registerScrollTrigger,
  scheduleScrollTriggerRefresh,
  ScrollTrigger,
  REFRESH_PRIORITY_SEQUENCE,
  SCROLL_PIN_TOP,
} from "@/lib/scroll-trigger";
import { sequencePinDistance } from "@/lib/scroll-budget";
import { SEQUENCE_DURATION, sequenceBeats } from "@/data/sequence";

type Cue = { title: string; body: string };

type ScrollCueSequenceProps = {
  hint: string;
  srOnly: string;
  cues: readonly Cue[];
};

type Point = [number, number];

const KEYHOLE_OPEN: Point[] = [
  [0, 0],
  [0, 100],
  [0, 100],
  [0, 0],
  [100, 0],
  [100, 100],
  [0, 100],
  [0, 100],
  [100, 100],
  [100, 0],
];

function keyholeShut(inner = 65): Point[] {
  const outer = 100 - inner;
  return [
    [0, 0],
    [0, 100],
    [outer, 100],
    [outer, outer],
    [inner, outer],
    [inner, inner],
    [outer, inner],
    [outer, 100],
    [100, 100],
    [100, 0],
  ];
}

function lerpPoly(from: Point[], to: Point[], t: number): Point[] {
  return from.map(([x, y], i) => [
    x + (to[i][0] - x) * t,
    y + (to[i][1] - y) * t,
  ]);
}

function polyCss(points: Point[]) {
  return `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(",")})`;
}

function findImageIndex(time: number) {
  let matched = 0;
  for (let i = 0; i < sequenceBeats.length; i += 1) {
    if (sequenceBeats[i].imageStart <= time) matched = i;
    else break;
  }
  return matched;
}

function findCueIndex(time: number) {
  return sequenceBeats.findIndex(
    (beat) => time >= beat.cueStart && time < beat.cueEnd,
  );
}

function preloadNeighbors(index: number) {
  const order: number[] = [];
  for (let i = 1; i <= 3; i += 1) {
    if (index + i < sequenceBeats.length) order.push(index + i);
    if (index - i >= 0) order.push(index - i);
  }
  for (let i = 0; i < sequenceBeats.length; i += 1) {
    if (i !== index && !order.includes(i)) order.push(i);
  }
  const timers = order.map((i, delayIndex) =>
    window.setTimeout(() => {
      const img = new Image();
      img.src = sequenceBeats[i].src;
    }, delayIndex * 120),
  );
  return () => timers.forEach(window.clearTimeout);
}

/**
 * Scroll-synced image sequence (Red viva layers).
 * Measures after upstream pins (refreshPriority) so it cannot scrub while the
 * reader is still in the definition coda / tri-path.
 */
export function ScrollCueSequence({
  hint,
  srOnly,
  cues,
}: ScrollCueSequenceProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    registerScrollTrigger();

    const pin = root.querySelector<HTMLElement>(".seq-sequence__pin");
    const keyhole = root.querySelector<HTMLElement>(".seq-sequence__keyhole");
    const preloader = root.querySelector<HTMLElement>(
      ".seq-sequence__preloader",
    );
    const images = Array.from(
      root.querySelectorAll<HTMLElement>(".seq-sequence__img"),
    );
    const overlays = Array.from(
      root.querySelectorAll<HTMLElement>(".seq-sequence__overlay"),
    );
    const corners = {
      tl: root.querySelector<HTMLElement>(".seq-sequence__corner--tl"),
      tr: root.querySelector<HTMLElement>(".seq-sequence__corner--tr"),
      bl: root.querySelector<HTMLElement>(".seq-sequence__corner--bl"),
      br: root.querySelector<HTMLElement>(".seq-sequence__corner--br"),
    };

    if (!pin || !keyhole || images.length === 0) return;

    const shut = keyholeShut(65);
    let activeImage = -1;
    let activeCue = -1;
    let preloaderGone = false;
    let lastProgress = 0;
    let direction: "down" | "up" = "down";

    gsap.set(images, { opacity: 0 });
    gsap.set(overlays, { opacity: 0, y: 24 });

    const applyKeyhole = (progress: number) => {
      // Open over the first tenth of the pin and stay open. Shutting it at the
      // end left a masked, mostly-empty frame on screen as the section
      // scrolled away, which read as a dead panel.
      let t = progress < 0.1 ? progress / 0.1 : 1;
      t = Math.max(0, Math.min(1, t));

      keyhole.style.clipPath = polyCss(lerpPoly(shut, KEYHOLE_OPEN, t));

      const inner = 65;
      const outer = 100 - inner;
      const mix = (a: number, b: number) => a + (b - a) * t;
      if (corners.tl) {
        corners.tl.style.top = `${mix(outer, 0)}%`;
        corners.tl.style.left = `${mix(outer, 0)}%`;
      }
      if (corners.tr) {
        corners.tr.style.top = `${mix(outer, 0)}%`;
        corners.tr.style.left = `${mix(inner, 100)}%`;
      }
      if (corners.bl) {
        corners.bl.style.top = `${mix(inner, 100)}%`;
        corners.bl.style.left = `${mix(outer, 0)}%`;
      }
      if (corners.br) {
        corners.br.style.top = `${mix(inner, 100)}%`;
        corners.br.style.left = `${mix(inner, 100)}%`;
      }
    };

    const showImage = (index: number, instant = false) => {
      if (index === activeImage || !images[index]) return;
      const prev = images[activeImage];
      const next = images[index];

      if (prev) {
        gsap.killTweensOf(prev);
        if (instant || !preloaderGone) prev.style.opacity = "0";
        else gsap.to(prev, { opacity: 0, duration: 0.45, ease: "power2.inOut" });
      }

      gsap.killTweensOf(next);
      if (instant || !preloaderGone) {
        next.style.opacity = "1";
        if (preloader && !preloaderGone) {
          preloader.style.opacity = "0";
          window.setTimeout(() => {
            preloader.remove();
            preloaderGone = true;
          }, 360);
        } else {
          preloaderGone = true;
        }
      } else {
        gsap.to(next, { opacity: 1, duration: 0.7, ease: "power2.out" });
      }

      activeImage = index;
    };

    const showCue = (index: number, instant = false) => {
      if (index === activeCue) return;

      overlays.forEach((el, i) => {
        gsap.killTweensOf(el);
        if (i === index) {
          if (instant) {
            gsap.set(el, { opacity: 1, y: 0 });
          } else {
            const yIn = direction === "down" ? 36 : -36;
            gsap.set(el, { opacity: 0, y: yIn });
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.32,
              ease: "power2.out",
            });
          }
        } else if (i === activeCue && !instant) {
          const yOut = direction === "down" ? -36 : 36;
          gsap.to(el, {
            opacity: 0,
            y: yOut,
            duration: 0.28,
            ease: "power1.inOut",
            onComplete: () => gsap.set(el, { y: 0 }),
          });
        } else {
          gsap.set(el, { opacity: 0, y: 0 });
        }
      });

      activeCue = index;
    };

    const render = (progress: number, instant = false) => {
      const time = progress * SEQUENCE_DURATION;
      applyKeyhole(progress);
      showImage(findImageIndex(time), instant);
      showCue(findCueIndex(time), instant);
    };

    /** Below the start line — never leave mid-scrub visuals from a stale refresh. */
    const resetResting = () => {
      direction = "down";
      lastProgress = 0;
      gsap.killTweensOf(images);
      gsap.killTweensOf(overlays);
      gsap.set(images, { opacity: 0 });
      gsap.set(overlays, { opacity: 0, y: 24 });
      activeImage = -1;
      activeCue = -1;
      applyKeyhole(0);
      const first = findImageIndex(0);
      if (images[first]) {
        images[first].style.opacity = "1";
        activeImage = first;
      }
    };

    const syncFromTrigger = (self: ScrollTrigger) => {
      lastProgress = self.progress;
      if (self.isActive) {
        render(self.progress, true);
        return;
      }
      // Inactive: either still above this beat, or already past it.
      if (self.progress === 0) resetResting();
      else render(1, true);
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: "motus-seq-sequence",
        trigger: pin,
        pin,
        start: SCROLL_PIN_TOP,
        end: () => `+=${sequencePinDistance(sequenceBeats.length)}`,
        pinSpacing: true,
        anticipatePin: 0,
        invalidateOnRefresh: true,
        refreshPriority: REFRESH_PRIORITY_SEQUENCE,
        onUpdate: (self) => {
          direction = self.progress >= lastProgress ? "down" : "up";
          lastProgress = self.progress;
          render(self.progress);
        },
        onRefresh: syncFromTrigger,
        // Entering the pin from above must start clean — not mid-timeline from
        // a refresh that ran while start/end were still wrong.
        onEnter: (self) => {
          lastProgress = self.progress;
          render(self.progress, true);
        },
        onEnterBack: (self) => {
          lastProgress = self.progress;
          render(self.progress, true);
        },
        onLeave: () => {
          render(1, true);
        },
        onLeaveBack: () => {
          resetResting();
        },
      });
    }, root);

    resetResting();

    // One refresh after mount — do not refresh again on every frame decode;
    // that re-measures mid-scroll and was desyncing this pin from the coda.
    scheduleScrollTriggerRefresh();
    const stopResize = onViewportWidthChange(scheduleScrollTriggerRefresh);

    let cancelPreload: (() => void) | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        cancelPreload = preloadNeighbors(findImageIndex(0));
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      cancelPreload?.();
      stopResize();
      ctx.revert();
      scheduleScrollTriggerRefresh();
    };
  }, []);

  return (
    <div ref={rootRef} className="seq-sequence">
      <p className="sr-only">{srOnly}</p>

      <div className="seq-sequence__pin">
        <p className="seq-sequence__hint" aria-hidden="true">
          {hint}
        </p>

        <div className="seq-sequence__frame">
          <div className="seq-sequence__images">
            {sequenceBeats.map((beat) => (
              <div key={beat.src} className="seq-sequence__img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={beat.src}
                  alt=""
                  width={1600}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>
            ))}
          </div>

          <div className="seq-sequence__overlays" aria-hidden="true">
            {cues.map((cue) => (
              <div key={cue.title} className="seq-sequence__overlay">
                <h3>{cue.title}</h3>
                <p>{cue.body}</p>
              </div>
            ))}
          </div>

          <div className="seq-sequence__preloader" />

          <div className="seq-sequence__keyhole-layer" aria-hidden="true">
            <div className="seq-sequence__keyhole" />
            <span className="seq-sequence__corner seq-sequence__corner--tl" />
            <span className="seq-sequence__corner seq-sequence__corner--tr" />
            <span className="seq-sequence__corner seq-sequence__corner--bl" />
            <span className="seq-sequence__corner seq-sequence__corner--br" />
          </div>

          <div className="seq-sequence__rail" aria-hidden="true">
            {cues.map((cue, index) => (
              <span
                key={cue.title}
                className="seq-sequence__tick"
                style={{ top: `${((index + 0.5) / cues.length) * 100}%` }}
              >
                {cue.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ol className="seq-sequence__fallback">
        {cues.map((cue, index) => (
          <li key={cue.title}>
            <strong>{cue.title}.</strong> {cue.body}
            {sequenceBeats[index] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={sequenceBeats[index].src} alt="" loading="lazy" />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
