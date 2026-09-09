/**
 * Public Motty (this landing widget) always runs the in-process tool loop.
 * OpenClaw / Hermes stays out of the visitor path.
 *
 * Motty Personal (later) may be provisioned with the Motus OpenClaw launcher.
 * That provisioner is a seam only — do not wire it into `/api/motty`.
 */
export const MOTTY_SURFACE = "public" as const;

export type MottySurface = typeof MOTTY_SURFACE;

export type MottyRuntimeKind = "in-process-loop" | "openclaw";

export type MottyProvisioner = "none" | "openclaw-launcher";

export function getPublicMottyRuntime(): MottyRuntimeKind {
  return "in-process-loop";
}

export function getPublicMottyProvisioner(): MottyProvisioner {
  return "none";
}
