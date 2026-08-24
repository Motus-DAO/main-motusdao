"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
  src: string;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: {
    x: number;
    y: number;
    rotation: number;
    scale: number;
    opacity: number;
  };
  backEyebrow: string;
  backLabel: string;
  width: number;
  height: number;
  pinCenter?: boolean;
}

const CARD_W = 72;
const CARD_H = 102;
const CARD_W_MOBILE = 46;
const CARD_H_MOBILE = 64;
const MOBILE_BP = 768;
/** Half of intro max-w-[11.5rem] plus gap so type sits in the hole. */
const MOBILE_TEXT_HALF = 92;
const MOBILE_INNER_GAP = 28;

function FlipCard({
  src,
  target,
  backEyebrow,
  backLabel,
  width,
  height,
  pinCenter = false,
}: FlipCardProps) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 42, damping: 16 }}
      style={{
        position: "absolute",
        ...(pinCenter
          ? {
              left: "50%",
              top: "50%",
              marginLeft: -width / 2,
              marginTop: -height / 2,
            }
          : {}),
        width,
        height,
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

const TOTAL_IMAGES = 19;
const IMAGES = Array.from(
  { length: TOTAL_IMAGES },
  (_, i) => `/hero/morph/${String(i + 1).padStart(2, "0")}.webp`,
);

const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;

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
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(stage);
    setContainerSize({ width: stage.offsetWidth, height: stage.offsetHeight });
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const morphProgress = useTransform(scrollYProgress, [0.04, 0.42], [0, 1]);
  const scrollRotate = useTransform(scrollYProgress, [0.42, 1], [0, 300]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 42, damping: 22 });
  const smoothScrollRotate = useSpring(scrollRotate, {
    stiffness: 42,
    damping: 22,
  });

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      mouseX.set((((e.clientX - rect.left) / rect.width) * 2 - 1) * 90);
    };
    stage.addEventListener("mousemove", onMove);
    return () => stage.removeEventListener("mousemove", onMove);
  }, [mouseX]);

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setMorphValue(1);
      return;
    }
    const unsubMorph = smoothMorph.on("change", setMorphValue);
    const unsubRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubMorph();
      unsubRotate();
      unsubParallax();
    };
  }, [reduceMotion, smoothMorph, smoothScrollRotate, smoothMouseX]);

  const images = useMemo(() => IMAGES.slice(0, TOTAL_IMAGES), []);

  const contentOpacity = Math.min(Math.max((morphValue - 0.45) / 0.35, 0), 1);
  const centerOpacity = Math.max(1 - morphValue * 1.7, 0);

  const isMobile =
    containerSize.width === 0 || containerSize.width < MOBILE_BP;
  const cardW = isMobile ? CARD_W_MOBILE : CARD_W;
  const cardH = isMobile ? CARD_H_MOBILE : CARD_H;
  const minDimension = Math.min(containerSize.width, containerSize.height);
  const circleRadius = isMobile
    ? Math.max(
        MOBILE_TEXT_HALF + MOBILE_INNER_GAP + Math.hypot(cardW, cardH) / 2,
        Math.min(containerSize.width * 0.5, minDimension * 0.48),
      )
    : Math.min(minDimension * 0.34, 340);

  return (
    <div
      ref={trackRef}
      className={`relative ${reduceMotion ? "h-auto" : "h-[260vh]"} ${className}`}
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

        <div
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center"
          style={{ opacity: centerOpacity }}
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
        </div>

        <div
          className="absolute top-[12%] z-20 flex w-full flex-col items-center px-5 text-center"
          style={{
            opacity: contentOpacity,
            transform: `translateY(${(1 - contentOpacity) * 16}px)`,
            pointerEvents: contentOpacity > 0.6 ? "auto" : "none",
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
        </div>

        <div className="relative flex h-full w-full items-center justify-center">
          {images.map((src, i) => {
            const circleAngle = (i / TOTAL_IMAGES) * 360;
            const circleRad = (circleAngle * Math.PI) / 180;
            const circlePos = {
              x: Math.cos(circleRad) * circleRadius,
              y: Math.sin(circleRad) * circleRadius,
              rotation: circleAngle + 90,
            };

            const baseRadius = Math.min(
              containerSize.width,
              containerSize.height * 1.5,
            );
            const arcRadius = baseRadius * (isMobile ? 1.35 : 1.05);
            const arcApexY = containerSize.height * (isMobile ? 0.38 : 0.28);
            const arcCenterY = arcApexY + arcRadius;
            const spreadAngle = isMobile ? 100 : 128;
            const startAngle = -90 - spreadAngle / 2;
            const step = spreadAngle / (TOTAL_IMAGES - 1);
            const scrollProgress = Math.min(Math.max(rotateValue / 300, 0), 1);
            const boundedRotation = -scrollProgress * spreadAngle * 0.75;
            const currentArcAngle = startAngle + i * step + boundedRotation;
            const arcRad = (currentArcAngle * Math.PI) / 180;
            const t = reduceMotion ? 1 : morphValue;

            const target = {
              x: lerp(circlePos.x, Math.cos(arcRad) * arcRadius + parallaxValue, t),
              y: lerp(circlePos.y, Math.sin(arcRad) * arcRadius + arcCenterY, t),
              rotation: lerp(circlePos.rotation, currentArcAngle + 90, t),
              scale: lerp(1, isMobile ? 1.35 : 1.7, t),
              opacity: 1,
            };

            return (
              <FlipCard
                key={`${src}-${i}`}
                src={src}
                index={i}
                total={TOTAL_IMAGES}
                phase="circle"
                target={target}
                backEyebrow={cardBackEyebrow}
                backLabel={cardBackLabel}
                width={cardW}
                height={cardH}
                pinCenter={isMobile}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
