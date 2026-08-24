export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.motusdao.org";

export const SITE_NAME = "MotusDAO";

export const LINKS = {
  hub: "https://app.motusdao.org/",
  academia: "https://app.motusdao.org/academia",
  psychat: "https://chat.motusdao.org/",
  metaverso: "https://metaverso.motusdao.org/",
  agents: "https://agents.motusdao.org/",
  mcp: "https://mcp.motusdao.org/mcp",
  mcpHealth: "https://mcp.motusdao.org/health",
} as const;
