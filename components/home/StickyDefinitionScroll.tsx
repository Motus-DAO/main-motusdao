"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import {
  onViewportWidthChange,
  registerScrollTrigger,
  scheduleScrollTriggerRefresh,
  REFRESH_PRIORITY_DEFINITION,
  SCROLL_PIN_TOP,
} from "@/lib/scroll-trigger";
import { definitionPinDistance } from "@/lib/scroll-budget";

type StickyDefinitionScrollProps = {
  label: string;
  hint: string;
  prefix: string;
  srOnly: string;
  words: readonly string[];
};

const INACTIVE_OPACITY = 0.52;
const ACTIVE_OPACITY = 1;

/**
 * Scroll-pinned definition coda: prefix stays fixed while nouns cycle in focus.
 * GSAP pin replaces faint CSS-only scroll so the beat is readable before tri-path.
 */
export function StickyDefinitionScroll({
  label,
  hint,
  prefix,
  srOnly,
  words,
}: StickyDefinitionScrollProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const prefixRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const count = Math.max(words.length, 1);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const prefix = prefixRef.current;
    const list = listRef.current;
    if (!root || !pin || !prefix || !list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    registerScrollTrigger();

    const items = gsap.utils.toArray<HTMLElement>(
      list.querySelectorAll(".sticky-definition__word-item"),
    );
    if (items.length === 0) return;

    const buildTimeline = () => {
      // Measure with the list at rest (y:0). Offsets bring each noun's center
      // onto the prefix center — not the pin midpoint — so the reading line
      // stays flush with “MotusDAO es”.
      gsap.set(list, { y: 0 });
      const stageTop = pin.getBoundingClientRect().top;
      const prefixRect = prefix.getBoundingClientRect();
      const targetY =
        prefixRect.top - stageTop + prefixRect.height * 0.5;

      const offsets = items.map((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top - stageTop + rect.height * 0.5;
        return targetY - itemCenter;
      });

      // Progress 0 must already show the first noun. A plain .to() from y:0
      // spent the first scrub segment travelling from mid-list → word 0.
      gsap.set(list, { y: offsets[0] });
      gsap.set(items, { opacity: INACTIVE_OPACITY });
      gsap.set(items[0], { opacity: ACTIVE_OPACITY });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: SCROLL_PIN_TOP,
          end: () => `+=${definitionPinDistance(items.length)}`,
          scrub: true,
          // Pin the whole section, header included: pinning the inner stage
          // parked it 178px down the viewport and pushed its own last words
          // below the fold.
          pin: root,
          pinSpacing: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          refreshPriority: REFRESH_PRIORITY_DEFINITION,
        },
      });

      const segment = 1;
      offsets.forEach((offset, index) => {
        const at = index * segment;
        const from = index === 0 ? offset : offsets[index - 1];
        tl.fromTo(
          list,
          { y: from },
          {
            y: offset,
            ease: "none",
            duration: segment,
            immediateRender: index === 0,
          },
          at,
        );
        tl.to(
          items,
          { opacity: INACTIVE_OPACITY, ease: "none", duration: 0.01 },
          at,
        );
        tl.to(
          items[index],
          { opacity: ACTIVE_OPACITY, ease: "none", duration: 0.01 },
          at,
        );
      });

      return tl;
    };

    const ctx = gsap.context(() => {
      buildTimeline();
      root.classList.add("sticky-definition--gsap");
    }, root);

    const refresh = () => scheduleScrollTriggerRefresh();
    window.addEventListener("load", refresh);
    const stopResize = onViewportWidthChange(refresh);

    scheduleScrollTriggerRefresh();

    return () => {
      root.classList.remove("sticky-definition--gsap");
      window.removeEventListener("load", refresh);
      stopResize();
      ctx.revert();
      scheduleScrollTriggerRefresh();
    };
  }, [words]);

  return (
    <div
      ref={rootRef}
      className="sticky-definition"
      style={{ "--count": count } as CSSProperties}
    >
      <div className="sticky-definition__header">
        <p className="section-label">{label}</p>
        <p className="sticky-definition__hint" aria-hidden="true">
          {hint}
        </p>
        <p className="sr-only">{srOnly}</p>
      </div>

      <div ref={pinRef} className="sticky-definition__pin">
        <div className="sticky-definition__stage">
          <p ref={prefixRef} className="sticky-definition__prefix">
            {prefix}&nbsp;
          </p>
          <ul ref={listRef} className="sticky-definition__list">
            {words.map((word, index) => (
              <li
                key={word}
                className="sticky-definition__word-item"
                style={{ "--i": index } as CSSProperties}
              >
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
