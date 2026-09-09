"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode, type RefObject } from "react";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export type ScrollSplitCardItem = {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  icon?: ReactNode;
};

type ScrollSplitCardProps = {
  className?: string;
  imageSrc: string;
  cards: ScrollSplitCardItem[];
  containerRef?: RefObject<HTMLElement | null>;
  startHint?: string;
  endLine?: string;
};

function CardBack({ card }: { card: ScrollSplitCardItem }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: GRAIN,
          backgroundRepeat: "repeat",
        }}
      />
      <div className="relative z-10 mb-auto">{card.icon}</div>
      <h3 className="relative z-10 mb-3 font-heading text-lg font-semibold leading-tight tracking-tight md:mb-4 md:text-2xl">
        {card.title}
      </h3>
      <p className="relative z-10 text-xs leading-relaxed opacity-80 md:text-sm">
        {card.description}
      </p>
    </>
  );
}

export function ScrollSplitCard({
  className,
  imageSrc,
  cards,
  containerRef: externalContainerRef,
  startHint,
  endLine,
}: ScrollSplitCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const visibleCards = cards.slice(0, 3);

  const { scrollYProgress } = useScroll(
    externalContainerRef
      ? {
          target: containerRef,
          container: externalContainerRef,
          offset: ["start start", "end end"],
        }
      : {
          target: containerRef,
          offset: ["start 72px", "end end"],
        },
  );

  const leftX = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, -48, -24]);
  const rightX = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 48, 24]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);
  const rotateY = useTransform(scrollYProgress, [0.4, 0.8], [0, 180]);
  const rotateZLeft = useTransform(scrollYProgress, [0.4, 0.8], [0, 6]);
  const rotateZRight = useTransform(scrollYProgress, [0.4, 0.8], [0, -6]);
  const borderRadiusLeft = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["16px 0px 0px 16px", "16px 16px 16px 16px"],
  );
  const borderRadiusMiddle = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["0px 0px 0px 0px", "16px 16px 16px 16px"],
  );
  const borderRadiusRight = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["0px 16px 16px 0px", "16px 16px 16px 16px"],
  );
  const borderOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.2]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.4]);
  const boxShadow = useMotionTemplate`inset 0 1px 1px rgba(255, 255, 255, ${borderOpacity}), inset 0 -24px 48px rgba(0, 0, 0, ${shadowOpacity}), 0 25px 50px -12px rgba(0, 0, 0, ${shadowOpacity})`;
  const cardsY = useTransform(scrollYProgress, [0.8, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.8, 1], [40, 0]);
  const startTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const startTextY = useTransform(scrollYProgress, [0, 0.1], [0, 20]);

  if (reduceMotion) {
    return (
      <div ref={containerRef} className={cn("w-full px-4 py-12 md:px-8", className)}>
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {visibleCards.map((card) => (
            <div
              key={card.title}
              className="relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl border border-white/5 p-6 md:p-8"
              style={{ backgroundColor: card.bgColor, color: card.textColor }}
            >
              <CardBack card={card} />
            </div>
          ))}
        </div>
        {endLine ? (
          <p className="mx-auto mt-10 max-w-2xl text-center font-heading text-xl font-semibold tracking-tight text-[var(--text-primary)] md:text-2xl">
            {endLine}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[280vh] w-full", className)}
    >
      <div className="sticky top-[var(--pin-top)] flex h-[var(--pin-stage)] w-full items-center justify-center overflow-hidden [perspective:1200px]">
        {startHint ? (
          <motion.p
            className="absolute top-[18%] left-0 right-0 text-center text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]"
            style={{ opacity: startTextOpacity, y: startTextY }}
          >
            {startHint}
          </motion.p>
        ) : null}

        <motion.div
          style={{ scale, y: cardsY, transformStyle: "preserve-3d" }}
          className="relative flex h-[min(400px,58svh)] w-full max-w-4xl px-4"
        >
          {visibleCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="relative h-full flex-1"
              style={{
                x: i === 0 ? leftX : i === 2 ? rightX : 0,
                rotateY,
                rotateZ: i === 0 ? rotateZLeft : i === 2 ? rotateZRight : 0,
                zIndex: i,
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="absolute inset-0 overflow-hidden [backface-visibility:hidden]"
                style={{
                  zIndex: 2,
                  borderRadius:
                    i === 0
                      ? borderRadiusLeft
                      : i === 2
                        ? borderRadiusRight
                        : borderRadiusMiddle,
                  boxShadow,
                }}
              >
                <div
                  className="absolute inset-0 h-full w-[300%]"
                  style={{
                    left: `${-100 * i}%`,
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                  }}
                />
              </motion.div>

              <motion.div
                className={cn(
                  "absolute inset-0 flex flex-col justify-end overflow-hidden p-4 [backface-visibility:hidden] will-change-transform md:p-8",
                  "border border-white/5 bg-gradient-to-br from-white/10 to-transparent",
                )}
                style={{
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                  transform: "rotateY(180deg)",
                  zIndex: 1,
                  borderRadius:
                    i === 0
                      ? borderRadiusLeft
                      : i === 2
                        ? borderRadiusRight
                        : borderRadiusMiddle,
                  boxShadow,
                }}
              >
                <CardBack card={card} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {endLine ? (
          <motion.p
            className="absolute bottom-[14%] left-0 right-0 px-5 text-center font-heading text-xl font-semibold tracking-tight text-[var(--text-primary)] md:text-2xl"
            style={{ opacity: textOpacity, y: textY }}
          >
            {endLine}
          </motion.p>
        ) : null}
      </div>
    </div>
  );
}
