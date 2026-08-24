import { SITE_NAME, SITE_URL, LINKS } from "@/lib/site";
import { messages } from "@/lib/messages";

export function JsonLd() {
  const es = messages.es;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: es.answerBody,
    sameAs: [LINKS.hub, LINKS.psychat, LINKS.mcp],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${SITE_NAME} — ${es.heroHeadline}`,
    description: es.answerBody,
    url: SITE_URL,
    inLanguage: ["es", "en"],
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: es.faq1Q,
        acceptedAnswer: { "@type": "Answer", text: es.faq1A },
      },
      {
        "@type": "Question",
        name: es.faq2Q,
        acceptedAnswer: { "@type": "Answer", text: es.faq2A },
      },
      {
        "@type": "Question",
        name: es.faq3Q,
        acceptedAnswer: { "@type": "Answer", text: es.faq3A },
      },
      {
        "@type": "Question",
        name: es.faq4Q,
        acceptedAnswer: { "@type": "Answer", text: es.faq4A },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
