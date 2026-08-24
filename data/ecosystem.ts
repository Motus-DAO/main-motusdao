import { MenuItem } from "@/components/InfiniteMenu";

/**
 * Ecosystem items for the optional 3D explorer.
 * Canonical surface copy lives in the SSR network-invariants section.
 */
export const ecosystemItems: MenuItem[] = [
  {
    image: "/hub.png",
    link: "https://app.motusdao.org/",
    title: "Wellness Hub",
    description: "Aplicación principal de identidad, práctica y cuidado",
  },
  {
    image: "/academia.png",
    link: "https://app.motusdao.org/academia",
    title: "Academia",
    description: "Formación profesional para psicología digital ética",
  },
  {
    image: "/psychat.png",
    link: "https://chat.motusdao.org/",
    title: "PsyChat / MotusAI",
    description: "Superficie conversacional híbrida humano–IA",
  },
  {
    image: "/metaverse.png",
    link: "https://metaverso.motusdao.org/",
    title: "Metaverso",
    description: "Espacios inmersivos para encuentro y comunidad",
  },
  {
    image: "/gobernanza.png",
    link: "https://agents.motusdao.org/",
    title: "Agents",
    description: "Capa de agentes para coordinación y operación de la red",
  },
];

export const menuConfig = {
  scale: 2.6,
};
