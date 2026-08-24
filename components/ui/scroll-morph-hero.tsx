"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { HERO_TRACK_VH } from "@/lib/scroll-budget";

const CARD_W = 72;
const CARD_H = 102;
const CARD_W_MOBILE = 46;
const CARD_H_MOBILE = 64;
const MOBILE_BP = 768;
/** Half of intro max-w-[11.5rem] plus gap so type sits in the hole. */
const MOBILE_TEXT_HALF = 92;
const MOBILE_INNER_GAP = 28;

const TOTAL_IMAGES = 19;
const IMAGES = Array.from(
  { length: TOTAL_IMAGES },
  (_, i) => `/hero/morph/${String(i + 1).padStart(2, "0")}.webp`,
);

/** Rotation sweep, in degrees, the arc travels over the second half of the track. */
const ARC_SWEEP = 300;
/**
 * How much of the card spread rides past the visible apex. Much above ~0.4 and
 * the arc has emptied itself before the hero finishes, leaving a bare stage.
 */
const SWEEP_FRACTION = 0.4;
/** Manifesto copy becomes clickable once the morph is essentially done. */
const INTERACTIVE_AT = 0.66;

const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

type Layout = {
  isMobile: boolean;
  cardW: number;
  cardH: number;
  circleRadius: number;
  arcRadius: number;
  arcCenterY: number;
  spreadAngle: number;
  startAngle: number;
  angleStep: number;
  maxScale: number;
};

function measureLayout(width: number, height: number): Layout {
  const isMobile = width === 0 || width < MOBILE_BP;
  const cardW = isMobile ? CARD_W_MOBILE : CARD_W;
  const cardH = isMobile ? CARD_H_MOBILE : CARD_H;
  const minDimension = Math.min(width, height);
  const circleRadius = isMobile
    ? Math.max(
        MOBILE_TEXT_HALF + MOBILE_INNER_GAP + Math.hypot(cardW, cardH) / 2,
        Math.min(width * 0.5, minDimension * 0.48),
      )
    : Math.min(minDimension * 0.34, 340);
  const arcRadius =
    Math.min(width, height * 1.5) * (isMobile ? 1.35 : 1.05);
  const spreadAngle = isMobile ? 100 : 128;

  return {
    isMobile,
    cardW,
    cardH,
    circleRadius,
    arcRadius,
    arcCenterY: height * (isMobile ? 0.38 : 0.28) + arcRadius,
    spreadAngle,
    startAngle: -90 - spreadAngle / 2,
    angleStep: spreadAngle / (TOTAL_IMAGES - 1),
    maxScale: isMobile ? 1.35 : 1.7,
  };
}

type Placement = { x: number; y: number; rotate: number };

function placeCard(
  layout: Layout,
  index: number,
  morph: number,
  sweep: number,
  parallax: number,
): Placement {
  const circleAngle = (index / TOTAL_IMAGES) * 360;
  const circleRad = (circleAngle * Math.PI) / 180;

  const sweepProgress = clamp01(sweep / ARC_SWEEP);
  const arcAngle =
    layout.startAngle +
    index * layout.angleStep -
    sweepProgress * layout.spreadAngle * SWEEP_FRACTION;
  const arcRad = (arcAngle * Math.PI) / 180;

  return {
    x: lerp(
      Math.cos(circleRad) * layout.circleRadius,
      Math.cos(arcRad) * layout.arcRadius + parallax,
      morph,
    ),
    y: lerp(
      Math.sin(circleRad) * layout.circleRadius,
      Math.sin(arcRad) * layout.arcRadius + layout.arcCenterY,
      morph,
    ),
    rotate: lerp(circleAngle + 90, arcAngle + 90, morph),
  };
}

type FlipCardProps = {
  src: string;
  index: number;
  layout: Layout;
  morph: MotionValue<number>;
  sweep: MotionValue<number>;
  parallax: MotionValue<number>;
  backEyebrow: string;
  backLabel: string;
};

/**
 * Position comes straight off motion values, so scrolling never re-renders
 * React — nineteen cards moving through a spring per frame is what made this
 * hero feel heavy.
 */
function FlipCard({
  src,
  index,
  layout,
  morph,
  sweep,
  parallax,
  backEyebrow,
  backLabel,
}: FlipCardProps) {
  const placement = useTransform(
    [morph, sweep, parallax],
    ([latestMorph, latestSweep, latestParallax]: number[]) =>
      placeCard(layout, index, latestMorph, latestSweep, latestParallax),
  );

  const x = useTransform(placement, (p) => p.x);
  const y = useTransform(placement, (p) => p.y);
  const rotate = useTransform(placement, (p) => p.rotate);
  const scale = useTransform(morph, (m) => lerp(1, layout.maxScale, m));

  return (
    <motion.div
      style={{
        position: "absolute",
        ...(layout.isMobile
          ? {
              left: "50%",
              top: "50%",
              marginLeft: -layout.cardW / 2,
              marginTop: -layout.cardH / 2,
            }
          : {}),
        width: layout.cardW,
        height: layout.cardH,
        x,
        y,
        rotate,
        scale,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="group cursor-pointer"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl bg-zinc-800 shadow-lg ring-1 ring-white/10"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            width={CARD_W * 2}
            height={CARD_H * 2}
            decoding="async"
            fetchPriority={index < 6 ? "high" : "low"}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-transparent" />
        </div>
        <div
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[#0B101A] p-3 shadow-lg"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="mb-1 text-[8px] font-bold uppercase tracking-widest text-[#EC4899]">
            {backEyebrow}
          </p>
          <p className="text-center text-[10px] font-medium text-white">
            {backLabel}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export type ScrollMorphHeroProps = {
  introTitle: string;
  introHint: string;
  activeTitle: string;
  activeBody: string;
  cardBackEyebrow?: string;
  cardBackLabel?: string;
  children?: ReactNode;
  className?: string;
};

/**
 * Hero morph: circle of cards around a short line, then scroll opens
 * the manifesto + arc. Driven by page scroll (sticky), not wheel-capture.
 */
export default function ScrollMorphHero({
  introTitle,
  introHint,
  activeTitle,
  activeBody,
  cardBackEyebrow = "Motus",
  cardBackLabel = "Nodo",
  children,
  className = "",
}: ScrollMorphHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [interactive, setInteractive] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  /**
   * `useReducedMotion` is null on the server but resolves on the first client
   * render, so branching on it directly hydrates a different tree (track
   * height, intro opacity and all nineteen card transforms).
   */
  const reduceMotion = hydrated && prefersReducedMotion === true;

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setStageSize((current) => {
          const { width, height } = entry.contentRect;
          if (current.width === width && current.height === height) {
            return current;
          }
          return { width, height };
        });
      }
    });
    observer.observe(stage);
    setStageSize({ width: stage.offsetWidth, height: stage.offsetHeight });
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const morphProgress = useTransform(scrollYProgress, [0.04, 0.42], [0, 1]);
  const sweepProgress = useTransform(
    scrollYProgress,
    [0.42, 1],
    [0, ARC_SWEEP],
  );
  const smoothMorph = useSpring(morphProgress, { stiffness: 42, damping: 22 });
  const smoothSweep = useSpring(sweepProgress, { stiffness: 42, damping: 22 });

  const pointerX = useMotionValue(0);
  const smoothParallax = useSpring(pointerX, { stiffness: 30, damping: 20 });

  const settled = useMotionValue(1);
  const still = useMotionValue(0);
  const morph = reduceMotion ? settled : smoothMorph;
  const sweep = reduceMotion ? still : smoothSweep;
  const parallax = reduceMotion ? still : smoothParallax;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduceMotion) return;
    const onMove = (event: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      pointerX.set(
        (((event.clientX - rect.left) / rect.width) * 2 - 1) * 90,
      );
    };
    stage.addEventListener("mousemove", onMove);
    return () => stage.removeEventListener("mousemove", onMove);
  }, [pointerX, reduceMotion]);

  const introOpacity = useTransform(morph, (m) => Math.max(1 - m * 1.7, 0));
  const contentOpacity = useTransform(morph, (m) =>
    clamp01((m - 0.45) / 0.35),
  );
  const contentShift = useTransform(contentOpacity, (o) => (1 - o) * 16);

  useMotionValueEvent(morph, "change", (latest) => {
    const next = latest > INTERACTIVE_AT;
    setInteractive((current) => (current === next ? current : next));
  });

  const layout = useMemo(
    () => measureLayout(stageSize.width, stageSize.height),
    [stageSize.width, stageSize.height],
  );
  const measured = stageSize.width > 0 && stageSize.height > 0;

  return (
    <div
      ref={trackRef}
      className={`relative ${className}`}
      style={{ height: reduceMotion ? "auto" : `${HERO_TRACK_VH}vh` }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 isolate flex h-svh w-full items-center justify-center overflow-hidden bg-[var(--bg-primary)]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{ backgroundImage: "var(--grad-bg-ambient)" }}
          aria-hidden
        />

        <motion.div
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center"
          style={{ opacity: introOpacity }}
        >
          <p
            className="max-w-[11.5rem] text-balance font-heading font-bold leading-[1.15] tracking-tight text-[var(--text-primary)] sm:max-w-[14.5rem] sm:text-2xl md:max-w-[16.5rem] md:text-[1.75rem] lg:max-w-[18rem] lg:text-3xl"
            style={{
              fontFamily: "var(--font-heading), system-ui, sans-serif",
              fontSize: "clamp(1.2rem, 2.4vw, 1.85rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {introTitle}
          </p>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)] md:mt-5 md:text-[11px] md:tracking-[0.28em]">
            {introHint}
          </p>
          {/* White mark on dark; black mark on light. */}
          <img
            src="/brand/motus-mark-white.png"
            alt="MotusDAO"
            width={48}
            height={48}
            className="mt-4 hidden h-8 w-8 object-contain dark:block md:mt-6 md:h-12 md:w-12"
          />
          <img
            src="/brand/motus-mark-black.png"
            alt="MotusDAO"
            width={48}
            height={48}
            className="mt-4 block h-8 w-8 object-contain dark:hidden md:mt-6 md:h-12 md:w-12"
          />
        </motion.div>

        <motion.div
          className="absolute top-[12%] z-20 flex w-full flex-col items-center px-5 text-center"
          style={{
            opacity: contentOpacity,
            y: contentShift,
            pointerEvents: interactive ? "auto" : "none",
          }}
        >
          <h1
            className="max-w-3xl font-heading font-bold tracking-tight text-[var(--text-primary)]"
            style={{ fontSize: "var(--text-display)", lineHeight: 1.05 }}
          >
            {activeTitle}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            {activeBody}
          </p>
          {children ? (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {children}
            </div>
          ) : null}
        </motion.div>

        {/*
          Cards wait for the first measurement: their position is a function of
          stage size, so rendering them before it is known would both misplace
          them and hand React a transform the server could not have produced.
        */}
        <div className="relative flex h-full w-full items-center justify-center">
          {measured
            ? IMAGES.map((src, index) => (
                <FlipCard
                  key={src}
                  src={src}
                  index={index}
                  layout={layout}
                  morph={morph}
                  sweep={sweep}
                  parallax={parallax}
                  backEyebrow={cardBackEyebrow}
                  backLabel={cardBackLabel}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
