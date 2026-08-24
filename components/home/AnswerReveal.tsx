"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import {
  onViewportWidthChange,
  registerScrollTrigger,
  scheduleScrollTriggerRefresh,
  REFRESH_PRIORITY_ANSWER,
  SCROLL_PIN_TOP,
} from "@/lib/scroll-trigger";
import { answerPinDistance } from "@/lib/scroll-budget";

type AnswerRevealProps = {
  label: string;
  body: string;
};

/** Invisible until scrub; words appear only as the pin progresses. */
const RESTING_OPACITY = 0;

function splitWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean);
}

/**
 * Scroll-pinned word reveal for the GEO answer block.
 * Pins until the paragraph finishes so the sticky definition coda stays below.
 */
export function AnswerReveal({ label, body }: AnswerRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const words = useMemo(() => splitWords(body), [body]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const text = textRef.current;
    if (!root || !text) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    registerScrollTrigger();

    const wordEls = text.querySelectorAll<HTMLElement>(".answer-reveal__word");
    if (wordEls.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(wordEls, { opacity: RESTING_OPACITY });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: SCROLL_PIN_TOP,
          end: () => `+=${answerPinDistance(wordEls.length)}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          refreshPriority: REFRESH_PRIORITY_ANSWER,
        },
      });

      tl.to(wordEls, {
        opacity: 1,
        ease: "none",
        stagger: 0.65,
        duration: 3.2,
      });
      tl.to({}, { duration: 0.35 });
    }, root);

    const refresh = () => scheduleScrollTriggerRefresh();
    window.addEventListener("load", refresh);
    const stopResize = onViewportWidthChange(refresh);

    scheduleScrollTriggerRefresh();

    return () => {
      window.removeEventListener("load", refresh);
      stopResize();
      ctx.revert();
      scheduleScrollTriggerRefresh();
    };
  }, [body]);

  return (
    <div ref={rootRef} className="answer-reveal">
      <div className="answer-reveal__container">
        <p className="section-label">{label}</p>
        <p ref={textRef} className="answer-reveal__text">
          {words.map((word, index) => (
            <span key={`${index}-${word}`} className="answer-reveal__word">
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
