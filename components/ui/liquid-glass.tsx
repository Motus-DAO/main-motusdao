"use client";

import type { CSSProperties, ReactNode } from "react";

type GlassEffectProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function GlassEffect({
  children,
  className = "",
  style = {},
}: GlassEffectProps) {
  const glassStyle: CSSProperties = {
    boxShadow:
      "0 16px 36px rgba(0, 0, 0, 0.24), 0 2px 8px rgba(0, 0, 0, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.14)",
    border: "0.7px solid rgba(255, 255, 255, 0.18)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  return (
    <div
      className={`relative flex overflow-hidden font-semibold text-black transition-all duration-700 ${className}`}
      style={glassStyle}
    >
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-inherit rounded-3xl"
        style={{
          backdropFilter: "blur(18px) saturate(120%)",
          WebkitBackdropFilter: "blur(18px) saturate(120%)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />
      <div
        className="absolute inset-0 z-10 rounded-inherit"
        style={{ background: "rgba(255, 255, 255, 0.08)" }}
      />
      <div
        className="absolute inset-0 z-20 overflow-hidden rounded-inherit rounded-3xl"
        style={{
          boxShadow:
            "inset 0 0 0 0.8px rgba(255, 255, 255, 0.16), inset 0 10px 18px rgba(255, 255, 255, 0.05)",
        }}
      />
      <div className="relative z-30 w-full">{children}</div>
    </div>
  );
}

export function GlassFilter() {
  return (
    <svg style={{ display: "none" }} aria-hidden>
      <filter
        id="glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves="1"
          seed="17"
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="100"
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="200"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
