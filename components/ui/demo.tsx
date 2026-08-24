import PrinciplesBento from "@/components/ui/bento";

/** Local demo — Motus Principles bento */
export default function DemoOne() {
  return (
    <div className="bg-black p-10">
      <PrinciplesBento
        label="Principios"
        title="Invariantes de la red"
        lead="Arquitectura de cuidado, no promesas vacías."
        items={[
          {
            eyebrow: "Clínica",
            title: "Responsabilidad clínica humana",
            description:
              "La IA asiste. El juicio clínico permanece en el profesional.",
            image:
              "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
            className: "max-lg:rounded-t-[2rem] lg:col-span-3 lg:rounded-tl-[2rem]",
          },
          {
            eyebrow: "Agencia",
            title: "Agencia y consentimiento",
            description:
              "Las personas deben poder entender y decidir sobre su información y su proceso.",
            image:
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
            className: "lg:col-span-3 lg:rounded-tr-[2rem]",
          },
          {
            eyebrow: "Privacidad",
            title: "Privacidad por diseño",
            description:
              "La arquitectura asume vigilancia como riesgo por defecto — y se construye en sentido contrario.",
            image:
              "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1200&q=80",
            className: "lg:col-span-2 lg:rounded-bl-[2rem]",
          },
          {
            eyebrow: "Híbrido",
            title: "Cuidado híbrido",
            description: "Humanos y sistemas coordinan. Ninguno borra al otro.",
            image:
              "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
            className: "lg:col-span-2",
          },
          {
            eyebrow: "Madurez",
            title: "Evidencia y madurez",
            description:
              "Etiquetamos capacidades por madurez verificable. No afirmamos lo que aún no sostiene evidencia.",
            image:
              "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
            className: "max-lg:rounded-b-[2rem] lg:col-span-2 lg:rounded-br-[2rem]",
          },
        ]}
      />
    </div>
  );
}
