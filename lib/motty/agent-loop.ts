import { mottyConfig } from "@/lib/motty/config";
import {
  formatKnowledgeForVisitor,
  searchPublicKnowledge,
} from "@/lib/motty/mcp";
import { createChatCompletion, type ProviderMessage } from "@/lib/motty/provider";
import { mottySystemPrompt } from "@/lib/motty/system-prompt";
import { enabledToolSchemas, executeMottyTool } from "@/lib/motty/tools";
import type { MottySession } from "@/lib/motty/types";

const FALLBACK_ES =
  "Puedo orientarte con el conocimiento público de MotusDAO, pero ahora mismo no pude completar la respuesta. Elige una puerta: Wellness Hub, Academia o Agents.";
const FALLBACK_EN =
  "I can orient you with public MotusDAO knowledge, but I could not finish this reply. Choose a door: Wellness Hub, Academy, or Agents.";

export async function runPublicMottyTurn(input: {
  session: MottySession;
  userMessage: string;
}): Promise<{ session: MottySession; reply: string }> {
  const { session, userMessage } = input;
  const { maxToolRounds, aiApiKey } = mottyConfig();

  if (!aiApiKey) {
    const reply = await groundedFallback(userMessage, session.locale);
    return { session, reply };
  }

  const messages: ProviderMessage[] = [
    { role: "system", content: mottySystemPrompt(session.locale) },
    ...session.messages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
    { role: "user", content: userMessage },
  ];

  const tools = enabledToolSchemas();
  let working = session;

  for (let round = 0; round < maxToolRounds; round += 1) {
    const completion = await createChatCompletion({ messages, tools });
    const { message } = completion;
    const calls = message.tool_calls ?? [];

    if (!calls.length) {
      const reply = (message.content ?? "").trim() || fallbackCopy(session.locale);
      return { session: working, reply };
    }

    messages.push({
      role: "assistant",
      content: message.content,
      tool_calls: calls,
    });

    for (const call of calls) {
      let parsed: unknown = {};
      try {
        parsed = call.function.arguments
          ? JSON.parse(call.function.arguments)
          : {};
      } catch {
        parsed = {};
      }

      const executed = await executeMottyTool(
        call.function.name,
        parsed,
        working,
      );
      working = executed.session;

      messages.push({
        role: "tool",
        tool_call_id: call.id,
        content: JSON.stringify(executed.result),
      });
    }
  }

  const last = await createChatCompletion({
    messages: [
      ...messages,
      {
        role: "system",
        content:
          "Stop calling tools. Answer the visitor now from the tool results you already have.",
      },
    ],
  });

  const reply =
    (last.message.content ?? "").trim() || fallbackCopy(session.locale);
  return { session: working, reply };
}

async function groundedFallback(
  userMessage: string,
  locale: MottySession["locale"],
): Promise<string> {
  try {
    const hits = await searchPublicKnowledge({ query: userMessage });
    const context = formatKnowledgeForVisitor(hits);
    if (!hits.length || !context) return fallbackCopy(locale);

    if (locale === "en") {
      return `I am Motty, a guide to the MotusDAO ecosystem — not a therapist.\n\n${context}\n\nDoors: Wellness Hub (users), Academy (professionals), Agents (community / investors).`;
    }
    return `Soy Motty, guía del ecosistema MotusDAO — no soy terapeuta.\n\n${context}\n\nPuertas: Wellness Hub (usuarios), Academia (profesionales), Agents (comunidad / inversores).`;
  } catch {
    return fallbackCopy(locale);
  }
}

function fallbackCopy(locale: MottySession["locale"]): string {
  return locale === "en" ? FALLBACK_EN : FALLBACK_ES;
}
