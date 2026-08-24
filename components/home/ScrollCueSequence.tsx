"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  order.forEach((i, delayIndex) => {
    window.setTimeout(() => {
      const img = new Image();
      img.src = sequenceBeats[i].src;
    }, delayIndex * 80);
  });
}

/**
 * Scroll-synced image sequence with cue overlays and keyhole reveal.
 * Adapted from Less Rain’s GSAP ScrollTrigger slideshow demo.
 * Motus restyle: no ScrollSmoother, protocol cues, brand surfaces.
 */
export function ScrollCueSequence({
  hint,
  srOnly,
  cues,
}: ScrollCueSequenceProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

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
    keyhole.style.clipPath = polyCss(shut);

    const applyKeyhole = (progress: number) => {
      let t = 1;
      if (progress < 0.12) t = progress / 0.12;
      else if (progress > 0.88) t = 1 - (progress - 0.88) / 0.12;
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

    const showImage = (index: number) => {
      if (index === activeImage || !images[index]) return;
      const prev = images[activeImage];
      const next = images[index];

      if (prev) {
        gsap.killTweensOf(prev);
        if (!preloaderGone) prev.style.opacity = "0";
        else gsap.to(prev, { opacity: 0, duration: 0.45, ease: "power2.inOut" });
      }

      gsap.killTweensOf(next);
      if (!preloaderGone) {
        next.style.opacity = "1";
        if (preloader) {
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

    const showCue = (index: number) => {
      if (index === activeCue) return;

      overlays.forEach((el, i) => {
        gsap.killTweensOf(el);
        if (i === index) {
          const yIn = direction === "down" ? 36 : -36;
          gsap.set(el, { opacity: 0, y: yIn });
          gsap.to(el, { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" });
        } else if (i === activeCue) {
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

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        pin,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 6.5)}`,
        scrub: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          direction = self.progress >= lastProgress ? "down" : "up";
          lastProgress = self.progress;
          const time = self.progress * SEQUENCE_DURATION;
          applyKeyhole(self.progress);
          showImage(findImageIndex(time));
          showCue(findCueIndex(time));
        },
      });
    }, root);

    const first = findImageIndex(0);
    const firstImg = images[first]?.querySelector("img");
    const start = () => {
      showImage(first);
      showCue(findCueIndex(0.4));
      applyKeyhole(0);
      preloadNeighbors(first);
    };

    if (firstImg?.complete && firstImg.naturalWidth > 0) start();
    else firstImg?.addEventListener("load", start, { once: true });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="seq-sequence">
      <p className="sr-only">{srOnly}</p>
      <p className="seq-sequence__hint" aria-hidden="true">
        {hint}
      </p>

      <div className="seq-sequence__pin">
        <div className="seq-sequence__frame">
          <div className="seq-sequence__images">
            {sequenceBeats.map((beat, index) => (
              <div key={beat.src} className="seq-sequence__img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={beat.src}
                  alt=""
                  width={1600}
                  height={900}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "low"}
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
              <img src={sequenceBeats[index].src} alt="" />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
