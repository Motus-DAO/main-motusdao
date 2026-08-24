/**
 * Home scroll budget.
 *
 * Every pinned section spends viewport-heights of scroll the reader cannot
 * skip, so the total is capped deliberately rather than derived per section:
 *
 *   hero morph track      0.8 vh of scroll (1.8vh track, 1vh sticky stage)
 *   answer reveal         1.6 vh max
 *   definition coda       1.8 vh max
 *   layer sequence        2.2 vh max
 *   -------------------------------
 *   total                ~6.4 vh
 *
 * Two constraints hold this together:
 *   1. Total scroll-locked motion stays under ~7 viewports.
 *   2. The primary CTA (tri-path `#explora`) stays within ~5 viewports of the
 *      top — it sits after the hero, answer and definition beats.
 *
 * Growing copy must not silently grow the pins, which is why each function
 * clamps instead of scaling linearly with word count.
 */

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const viewports = (units: number) => Math.round(window.innerHeight * units);

/** Hero morph track height in vh; the sticky stage inside it is 100vh. */
export const HERO_TRACK_VH = 180;

/** Word-by-word GEO answer reveal. ~40 words of copy lands on the cap. */
export function answerPinDistance(wordCount: number) {
  return viewports(clamp(0.6 + wordCount * 0.025, 0.9, 1.6));
}

/** Definition coda — one noun per ~0.13vh, capped so 12+ nouns stay bearable. */
export function definitionPinDistance(wordCount: number) {
  return viewports(clamp(0.4 + wordCount * 0.13, 0.9, 1.8));
}

/** Red viva layer sequence — one beat per ~0.22vh. */
export function sequencePinDistance(beatCount: number) {
  return viewports(clamp(0.5 + beatCount * 0.22, 1.2, 2.2));
}
