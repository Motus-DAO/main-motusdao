"use client";

import IntroAnimation from "@/components/ui/scroll-morph-hero";

export default function Demo() {
  return (
    <div className="relative h-[800px] w-full overflow-hidden rounded-lg border border-white/10">
      <IntroAnimation
        introTitle="Infraestructura para redes vivas de cuidado."
        introHint="DESPLAZA PARA EXPLORAR"
        activeTitle="Red viva"
        activeBody="El cuidado no cabe en una sesión aislada. Explora la topología de la red."
      />
    </div>
  );
}
