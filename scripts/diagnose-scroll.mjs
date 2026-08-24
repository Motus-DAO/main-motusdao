/**
 * Pin-geometry check for the home page. Reports where each pinned section sits
 * in the viewport while it is pinned; every stage should read `[72..<height>]`.
 * A stage that starts below 72 leaves a strip of its neighbour on screen, and
 * one that ends past the viewport height hangs below the fold. Both read to a
 * visitor as sections colliding or as dead space.
 *
 * Run against `npm run dev`: `node scripts/diagnose-scroll.mjs`
 */
import { chromium } from "playwright";

const URL = process.env.URL ?? "http://localhost:3000";
const VIEWPORT = { width: 1440, height: 900 };
/** Always-fixed decorative backdrop — not a pinned section. */
const IGNORED = ["network-atmosphere"];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: VIEWPORT });

const problems = [];
page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
page.on("console", (msg) => {
  if (msg.type() === "error") problems.push(`console: ${msg.text().slice(0, 200)}`);
});

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(3000);

const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
console.log(
  `\ndocument ${docHeight}px = ${(docHeight / VIEWPORT.height).toFixed(1)} viewports\n`,
);

const seen = new Map();
const step = Math.round(VIEWPORT.height / 3);

for (let y = 0; y <= docHeight - VIEWPORT.height; y += step) {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.waitForTimeout(200);

  const pinned = await page.evaluate((ignored) => {
    return [...document.querySelectorAll("body *")]
      .filter((el) => getComputedStyle(el).position === "fixed")
      .map((el) => {
        const rect = el.getBoundingClientRect();
        const name =
          (typeof el.className === "string" ? el.className.split(/\s+/)[0] : "") ||
          el.tagName.toLowerCase();
        return { name, top: Math.round(rect.top), bottom: Math.round(rect.bottom) };
      })
      .filter((e) => !ignored.includes(e.name))
      .filter((e) => e.bottom - e.top > 120);
  }, IGNORED);

  if (pinned.length > 1) {
    problems.push(
      `y=${y}: ${pinned.length} sections pinned at once — ${pinned.map((p) => p.name).join(" + ")}`,
    );
  }
  for (const p of pinned) {
    if (!seen.has(p.name)) seen.set(p.name, p);
  }
}

console.log("pinned stage geometry (want top=72, bottom=%d):", VIEWPORT.height);
for (const [name, box] of seen) {
  const ok = box.top === 72 && box.bottom <= VIEWPORT.height;
  console.log(
    `  ${ok ? "ok  " : "BAD "} ${name.padEnd(26)} [${box.top}..${box.bottom}]`,
  );
}

console.log(problems.length ? `\nproblems:\n  ${problems.join("\n  ")}` : "\nno problems");
await browser.close();
