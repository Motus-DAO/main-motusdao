import { LINKS } from "@/lib/site";

export function mottyConfig() {
  const aiApiKey =
    process.env.MOTTY_AI_API_KEY ||
    process.env.VENICE_API_KEY ||
    process.env.OPENAI_API_KEY ||
    "";

  return {
    aiBaseUrl: (
      process.env.MOTTY_AI_BASE_URL ||
      process.env.OPENAI_BASE_URL ||
      "https://api.venice.ai/api/v1"
    ).replace(/\/$/, ""),
    aiApiKey,
    /* Same Venice model Hermes uses in ~/.hermes/config.yaml. */
    aiModel: process.env.MOTTY_AI_MODEL || "deepseek-v4-flash-0731",
    mcpUrl: process.env.MOTTY_MCP_URL || LINKS.mcp,
    sessionSecret: process.env.MOTTY_SESSION_SECRET || "",
    maxToolRounds: 3,
    maxHistory: 8,
    maxMessageChars: 2000,
    maxStoredChars: 360,
    cookieName: "motty_session",
    cookieMaxAgeSec: 60 * 60 * 24 * 7,
  };
}

export function hasMottyInference(): boolean {
  return Boolean(mottyConfig().aiApiKey);
}
