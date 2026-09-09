import { LINKS } from "@/lib/site";
import type { MottyAudience } from "@/lib/motty/types";

/**
 * Checkout v1 is a deep link, not a payment API.
 * `getRecommendedOffer()` (slice 3) will read this catalog.
 */
export type MottyOfferId =
  | "wellness-hub"
  | "academia"
  | "agents"
  | "psychat";

export type MottyOffer = {
  id: MottyOfferId;
  audience: MottyAudience;
  href: string;
  labelEs: string;
  labelEn: string;
};

export const MOTTY_OFFERS: readonly MottyOffer[] = [
  {
    id: "wellness-hub",
    audience: "users",
    href: LINKS.hub,
    labelEs: "Wellness Hub",
    labelEn: "Wellness Hub",
  },
  {
    id: "academia",
    audience: "professionals",
    href: LINKS.academia,
    labelEs: "Academia",
    labelEn: "Academy",
  },
  {
    id: "agents",
    audience: "community",
    href: LINKS.agents,
    labelEs: "Agents",
    labelEn: "Agents",
  },
  {
    id: "psychat",
    audience: "users",
    href: LINKS.psychat,
    labelEs: "PsyChat / MotusAI",
    labelEn: "PsyChat / MotusAI",
  },
];

export function recommendOffer(audience: MottyAudience): MottyOffer {
  if (audience === "professionals") {
    return MOTTY_OFFERS.find((offer) => offer.id === "academia")!;
  }
  if (audience === "community") {
    return MOTTY_OFFERS.find((offer) => offer.id === "agents")!;
  }
  return MOTTY_OFFERS.find((offer) => offer.id === "wellness-hub")!;
}

export function getOffer(id: MottyOfferId): MottyOffer | undefined {
  return MOTTY_OFFERS.find((offer) => offer.id === id);
}
