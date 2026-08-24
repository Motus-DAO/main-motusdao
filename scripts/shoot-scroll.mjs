/**
 * Screenshot the home page at each pinned beat, into scripts/.shots (ignored).
 * Companion to diagnose-scroll.mjs for eyeballing scroll transitions.
 */
import { chromium } from "playwright";

const URL = process.env.URL ?? "http://localhost:3000";
const OUT = "scripts/.shots";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console: ${m.text().slice(0, 160)}`);
});

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(3000);

const stops = [
  ["01-hero", 0],
  ["02-hero-morphed", 1200],
  ["03-answer", 2300],
  ["04-answer-end", 3000],
  ["05-definition", 4400],
  ["06-definition-mid", 5100],
  ["07-tripath", 6100],
  ["08-sequence", 8000],
  ["09-sequence-mid", 8900],
  ["10-after-sequence", 9800],
];

for (const [name, y] of stops) {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/${name}.png` });
}

console.log(errors.length ? errors.join("\n") : "no page errors");
await browser.close();
