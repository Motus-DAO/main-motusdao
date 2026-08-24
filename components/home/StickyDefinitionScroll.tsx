import type { CSSProperties } from "react";

type StickyDefinitionScrollProps = {
  prefix: string;
  srOnly: string;
  words: readonly string[];
};

/**
 * Scroll-driven sticky definition list.
 * Interaction pattern adapted from Jhey Tompkins’ “you can scroll” demo (MIT).
 * Scoped Motus restyle: Jura, purple→pink hues, no demo chrome.
 */
export function StickyDefinitionScroll({
  prefix,
  srOnly,
  words,
}: StickyDefinitionScrollProps) {
  const count = Math.max(words.length, 1);

  return (
    <div
      className="sticky-definition"
      style={{ "--count": count } as CSSProperties}
    >
      <p className="sr-only">{srOnly}</p>
      <div className="sticky-definition__stage">
        <p className="sticky-definition__prefix" aria-hidden="true">
          {prefix}&nbsp;
        </p>
        <ul className="sticky-definition__list" aria-hidden="true">
          {words.map((word, index) => (
            <li
              key={word}
              style={{ "--i": index } as CSSProperties}
            >
              {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
