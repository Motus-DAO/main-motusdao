import { SITE_NAME, SITE_URL, LINKS } from "@/lib/site";
import { messages } from "@/lib/messages";

export function JsonLd() {
  const en = messages.en;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: en.answerBody,
    sameAs: [LINKS.hub, LINKS.psychat, LINKS.mcp],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${SITE_NAME} — ${en.heroHeadline}`,
    description: en.answerBody,
    url: SITE_URL,
    inLanguage: ["en", "es"],
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
        name: en.faq1Q,
        acceptedAnswer: { "@type": "Answer", text: en.faq1A },
      },
      {
        "@type": "Question",
        name: en.faq2Q,
        acceptedAnswer: { "@type": "Answer", text: en.faq2A },
      },
      {
        "@type": "Question",
        name: en.faq3Q,
        acceptedAnswer: { "@type": "Answer", text: en.faq3A },
      },
      {
        "@type": "Question",
        name: en.faq4Q,
        acceptedAnswer: { "@type": "Answer", text: en.faq4A },
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
