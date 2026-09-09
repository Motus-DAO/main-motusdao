import type { Locale } from "@/lib/messages";
import type { PublicKnowledgeNamespace } from "@/lib/motty/namespaces";

export type MottyRole = "user" | "assistant";

export type MottyMessage = {
  role: MottyRole;
  content: string;
};

export type MottyAudience = "users" | "professionals" | "community" | "unknown";

export type MottyLead = {
  name?: string;
  email?: string;
  audience?: MottyAudience;
  intent?: string;
};

export type MottySession = {
  id: string;
  locale: Locale;
  messages: MottyMessage[];
  lead: MottyLead;
  offerId?: string;
  handoff?: { at: string; reason?: string; channelId?: string };
  createdAt: string;
  updatedAt: string;
};

export type SearchKnowledgeInput = {
  query: string;
  namespace?: PublicKnowledgeNamespace | string;
};

export type ToolResult = {
  ok: boolean;
  tool: string;
  data?: unknown;
  error?: string;
};
