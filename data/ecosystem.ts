import { MenuItem } from "@/components/InfiniteMenu";

/**
 * Ecosystem items for the optional 3D explorer.
 * Canonical surface copy lives in the SSR ecosystem-map section.
 */
export const ecosystemItems: MenuItem[] = [
  {
    image: "/ecosystem/wellness-hub.jpg",
    link: "https://app.motusdao.org/",
    title: "Wellness Hub",
    description: "Aplicación principal de identidad, práctica y cuidado",
  },
  {
    image: "/ecosystem/academia.jpg",
    link: "https://app.motusdao.org/academia",
    title: "Academia",
    description: "Formación profesional para psicología digital ética",
  },
  {
    image: "/ecosystem/psychat.png",
    link: "https://chat.motusdao.org/",
    title: "PsyChat / MotusAI",
    description: "Superficie conversacional híbrida humano–IA",
  },
  {
    image: "/ecosystem/metaverso.jpg",
    link: "https://metaverso.motusdao.org/",
    title: "Metaverso",
    description: "Espacios inmersivos para encuentro y comunidad",
  },
  {
    image: "/ecosystem/agents.jpg",
    link: "https://agents.motusdao.org/",
    title: "Agents",
    description: "Capa de agentes para coordinación y operación de la red",
  },
];

export const menuConfig = {
  scale: 2.6,
};
