import { MenuItem } from "@/components/InfiniteMenu";

/**
 * Ecosystem items for the optional 3D explorer.
 * Canonical product copy lives in the SSR/product map sections.
 */
export const ecosystemItems: MenuItem[] = [
  {
    image: "/hub.png",
    link: "https://app.motusdao.org/",
    title: "Hub",
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
    link: "https://psychat.motusdao.org/",
    title: "PsyChat",
    description: "Superficie conversacional híbrida humano–IA",
  },
  {
    image: "/metaverse.png",
    link: "https://play.workadventu.re/@/motusdao/motusdao/great-place-to-work",
    title: "Metaverso",
    description: "Espacios inmersivos para encuentro y comunidad",
  },
  {
    image: "/gobernanza.png",
    link: "https://www.motusdao.org/gobernanza-motusdao",
    title: "Gobernanza",
    description: "Participación y dirección de la red viva",
  },
];

export const menuConfig = {
  scale: 2.6,
};
