/**
 * Handoff is a configurable adapter. Do not hardcode WhatsApp / email / Agents.
 * Slice 4 will call this from `handoffToHuman()`. Until then it is unused by the loop.
 */
export type HandoffKind = "disabled" | "url" | "email";

export type HandoffAdapter = {
  id: string;
  kind: HandoffKind;
  href?: string;
  label?: string;
};

export function getHandoffAdapter(): HandoffAdapter {
  const kind = parseKind(process.env.MOTTY_HANDOFF_KIND);
  const href = process.env.MOTTY_HANDOFF_URL?.trim() || undefined;
  const label = process.env.MOTTY_HANDOFF_LABEL?.trim() || undefined;

  if (kind === "disabled" && href) {
    return {
      id: "env",
      kind: href.startsWith("mailto:") ? "email" : "url",
      href,
      label,
    };
  }

  return { id: "env", kind, href, label };
}

function parseKind(value: string | undefined): HandoffKind {
  if (value === "url" || value === "email" || value === "disabled") return value;
  return "disabled";
}
