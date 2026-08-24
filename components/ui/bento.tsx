"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type BentoItem = {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  image: string;
  className?: string;
  fade?: ("top" | "bottom")[];
  dark?: boolean;
};

type PrinciplesBentoProps = {
  label: string;
  title: string;
  lead: string;
  items: BentoItem[];
};

/**
 * Motus Principles bento — structure from FUIBentoGridDark,
 * content wired for MotusDAO network invariants (not demo sales copy).
 */
export default function PrinciplesBento({
  label,
  title,
  lead,
  items,
}: PrinciplesBentoProps) {
  return (
    <div className="flex w-full flex-col">
      <p className="section-label">{label}</p>
      <h2
        className="font-heading font-bold tracking-tight text-[var(--text-primary)]"
        style={{ fontSize: "var(--text-h2)" }}
      >
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-lg font-medium tracking-tight text-[var(--text-secondary)] md:text-xl">
        <span className="text-gradient">{lead}</span>
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 lg:grid-cols-6 lg:grid-rows-2">
        {items.map((item) => (
          <BentoCard
            key={String(item.title)}
            eyebrow={item.eyebrow}
            title={item.title}
            description={item.description}
            graphic={
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
            }
            fade={item.fade}
            dark={item.dark}
            className={item.className}
          />
        ))}
      </div>
    </div>
  );
}

export function BentoCard({
  dark = false,
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
}: {
  dark?: boolean;
  className?: string;
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  graphic?: ReactNode;
  fade?: ("top" | "bottom")[];
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg",
        "transform-gpu bg-black shadow-sm ring-1 ring-white/10",
        "dark:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]",
        "data-[dark]:bg-gray-800 data-[dark]:ring-white/15",
      )}
    >
      <div className="relative h-[22rem] shrink-0 sm:h-[26rem] lg:h-[29rem]">
        {graphic}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-white to-50% opacity-25 group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-white to-50% opacity-25 group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]" />
        )}
      </div>
      <div className="relative z-20 mt-[-110px] h-auto min-h-[12rem] isolate p-8 text-white backdrop-blur-xl sm:p-10 lg:h-[14rem]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#EC4899]">
          {eyebrow}
        </p>
        <p className="mt-1 font-heading text-xl font-medium tracking-tight text-white sm:text-2xl/8">
          {title}
        </p>
        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-200">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
