"use client";

import { useState } from "react";

export type TriPathItem = {
  title: string;
  body: string;
  cta: string;
  href: string;
};

type TriPathIndexProps = {
  paths: readonly TriPathItem[];
  nodeLabel: string;
  brand: string;
};

const INDEX = ["01", "02", "03"] as const;

export function TriPathIndex({ paths, nodeLabel, brand }: TriPathIndexProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_10.5rem] lg:grid-rows-3 lg:items-stretch">
      <span
        aria-hidden
        className="pointer-events-none absolute top-4 bottom-4 left-[1.15rem] w-px opacity-35 lg:hidden"
        style={{ backgroundImage: "var(--grad-brand)" }}
      />

      {paths.map((path, i) => (
        <div
          key={path.href}
          className="lg:col-start-1"
          style={{ gridRow: i + 1 }}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          onFocusCapture={() => setActive(i)}
          onBlurCapture={() => setActive(null)}
        >
          <a
            href={path.href}
            rel="noopener noreferrer"
            className="group flex h-full items-center gap-5 py-6 no-underline md:gap-8 md:py-7 lg:pr-4"
          >
            <span
              className={`w-8 shrink-0 font-heading text-sm font-semibold tracking-[0.14em] ${
                active === i ? "text-gradient" : "text-[var(--text-muted)]"
              }`}
            >
              {INDEX[i]}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="font-heading text-xl font-semibold tracking-tight text-[var(--text-primary)] md:text-[1.35rem]">
                  {path.title}
                </h3>
                <span className="link-accent shrink-0 text-sm">
                  {path.cta} →
                </span>
              </span>
              <span className="mt-2 block max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
                {path.body}
              </span>
            </span>
          </a>
          {i < paths.length - 1 ? (
            <div className="ml-12 border-b border-[var(--border-default)] lg:ml-0" />
          ) : null}
        </div>
      ))}

      <aside
        className="relative col-start-2 row-span-3 row-start-1 mt-2 hidden min-h-[12rem] lg:mt-0 lg:block"
        aria-hidden
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 300"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="tripath-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          {[50, 150, 250].map((y, i) => (
            <path
              key={y}
              d={`M0 ${y} C 42 ${y}, 42 150, 68 150`}
              stroke="url(#tripath-grad)"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
              style={{
                opacity: active === null ? 0.72 : active === i ? 1 : 0.18,
                transition: "opacity 180ms ease",
              }}
            />
          ))}
        </svg>
        <div className="absolute top-1/2 right-0 flex w-[4.75rem] -translate-y-1/2 flex-col items-center gap-2">
          <div
            className="rounded-full p-px"
            style={{ backgroundImage: "var(--grad-brand)" }}
          >
            <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[var(--bg-primary)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </div>
          </div>
          <p className="text-center font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {nodeLabel}
          </p>
          <p className="text-center font-heading text-xs font-semibold text-[var(--text-primary)]">
            {brand}
          </p>
        </div>
      </aside>

      <div
        className="mt-8 flex flex-col items-center gap-2 lg:hidden"
        aria-hidden
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--bg-elevated)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
        </div>
        <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
          {nodeLabel}
        </p>
        <p className="font-heading text-xs font-semibold text-[var(--text-primary)]">
          {brand}
        </p>
      </div>
    </div>
  );
}
