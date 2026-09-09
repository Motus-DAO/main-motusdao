"use client";

import { GraduationCap, HeartHandshake, Network } from "lucide-react";
import { LayoutGroup, motion } from "framer-motion";
import { ShiftCard } from "@/components/ui/shift-card";

export type TriPathItem = {
  title: string;
  body: string;
  cta: string;
  href: string;
  job: string;
  detail: string;
  chips: readonly string[];
  image: string;
  imageAlt: string;
  layoutId: string;
};

type TriPathIndexProps = {
  paths: readonly TriPathItem[];
  nodeLabel: string;
  brand: string;
  nodeHint: string;
};

const INDEX = ["01", "02", "03"] as const;

const ICONS = [HeartHandshake, GraduationCap, Network] as const;

export function TriPathIndex({
  paths,
  nodeLabel,
  brand,
  nodeHint,
}: TriPathIndexProps) {
  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {paths.map((path, i) => (
          <DoorShiftCard key={path.href} path={path} index={i} />
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-2" aria-hidden>
        <div
          className="rounded-full p-px"
          style={{ backgroundImage: "var(--grad-brand)" }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-primary)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
          </div>
        </div>
        <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
          {nodeLabel}
        </p>
        <p className="font-heading text-xs font-semibold text-[var(--text-primary)]">
          {brand}
        </p>
        <p className="mt-1 text-center text-sm text-[var(--text-secondary)]">
          {nodeHint}
        </p>
      </div>
    </div>
  );
}

function DoorShiftCard({
  path,
  index,
}: {
  path: TriPathItem;
  index: number;
}) {
  const Icon = ICONS[index] ?? HeartHandshake;
  const ordinal = INDEX[index] ?? "00";

  const topContent = (
    <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] pr-[5.5rem] text-[var(--text-primary)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
      <div className="flex items-start gap-2.5 px-3 py-2.5">
        <span className="mt-0.5 font-heading text-[11px] font-semibold tracking-[0.14em] text-gradient">
          {ordinal}
        </span>
        <Icon
          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-pink)]"
          aria-hidden
        />
        <h3 className="line-clamp-2 font-heading text-sm font-semibold leading-tight tracking-tight md:text-[0.95rem]">
          {path.title}
        </h3>
      </div>
    </div>
  );

  const topAnimateContent = (
    <>
      <motion.img
        layout
        src={path.image}
        layoutId={path.layoutId}
        width={72}
        height={88}
        alt=""
        className="absolute top-1.5 right-2 z-10 rounded-md object-cover shadow-lg"
      />
      <motion.div
        className="absolute top-1 right-1.5 ml-auto h-[84px] w-[76px] rounded-md border-2 border-dashed border-[var(--brand-purple)]/70 dark:border-[var(--brand-pink)]/70"
        initial={{ opacity: 0, scale: 1.5, filter: "blur(4px)" }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          transition: { delay: 0.32, duration: 0.16 },
        }}
        exit={{
          opacity: 0,
          y: 80,
          filter: "blur(4px)",
          transition: { duration: 0 },
        }}
      />
    </>
  );

  const middleContent = (
    <motion.img
      layout
      src={path.image}
      layoutId={path.layoutId}
      width={200}
      height={168}
      alt={path.imageAlt}
      className="h-[168px] w-[92%] rounded-md border border-[var(--border-default)] object-cover shadow-[var(--shadow-glass)]"
    />
  );

  const bottomContent = (
    <div className="pb-3">
      <div className="rounded-t-xl border-t border-[var(--border-default)] bg-[var(--bg-elevated)]/95 px-4 pb-4 backdrop-blur-md">
        <div className="flex items-center gap-2 pt-2.5 font-heading text-sm font-medium text-[var(--text-primary)]">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundImage: "var(--grad-brand)" }}
            aria-hidden
          />
          <p>{path.job}</p>
        </div>
        <div className="shift-card-details opacity-0 transition-opacity duration-200 group-data-[expanded=true]:opacity-100">
          <p className="mt-2 text-pretty text-[13px] leading-5 text-[var(--text-secondary)]">
            {path.detail}
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {path.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-2 py-0.5 text-[11px] tracking-wide text-[var(--text-secondary)]"
              >
                {chip}
              </li>
            ))}
          </ul>
          <span className="btn-primary mt-3 w-full text-xs">{path.cta} →</span>
        </div>
        <p className="sr-only">{path.body}</p>
      </div>
    </div>
  );

  return (
    <LayoutGroup id={path.layoutId}>
      <ShiftCard
        href={path.href}
        aria-label={`${path.title}. ${path.cta}`}
        topContent={topContent}
        topAnimateContent={topAnimateContent}
        middleContent={middleContent}
        bottomContent={bottomContent}
        transition={{ delay: index * 0.08, duration: 0.45 }}
      />
    </LayoutGroup>
  );
}
