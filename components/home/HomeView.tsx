"use client";

import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/site/SiteHeader";
import { useSite } from "@/components/providers/SiteProviders";
import PrinciplesBento from "@/components/ui/bento";
import { LINKS } from "@/lib/site";
import { definitionWords, sequenceCues } from "@/lib/messages";
import { ecosystemItems, menuConfig } from "@/data/ecosystem";
import { AnswerReveal } from "@/components/home/AnswerReveal";
import { StickyDefinitionScroll } from "@/components/home/StickyDefinitionScroll";
import { ScrollCueSequence } from "@/components/home/ScrollCueSequence";
import { TriPathIndex } from "@/components/home/TriPathIndex";
import ScrollMorphHero from "@/components/ui/scroll-morph-hero";

const InfiniteMenu = dynamic(() => import("@/components/InfiniteMenu"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[min(70vh,560px)] items-center justify-center text-sm text-white/60">
      Loading…
    </div>
  ),
});

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="btn-primary">
      {children}
    </a>
  );
}

function SecondaryButton({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className="btn-ghost"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function HomeView() {
  const { t, locale } = useSite();

  const products = [
    {
      title: t("productHub"),
      desc: t("productHubDesc"),
      href: LINKS.hub,
      eyebrow: t("productHubEyebrow"),
      image: "/ecosystem/wellness-hub.jpg",
      className:
        "max-lg:rounded-t-[2rem] lg:col-span-3 lg:rounded-tl-[2rem]",
    },
    {
      title: t("productAcademia"),
      desc: t("productAcademiaDesc"),
      href: LINKS.academia,
      eyebrow: t("productAcademiaEyebrow"),
      image: "/ecosystem/academia.jpg",
      className: "lg:col-span-3 lg:rounded-tr-[2rem]",
    },
    {
      title: t("productPsychat"),
      desc: t("productPsychatDesc"),
      href: LINKS.psychat,
      eyebrow: t("productPsychatEyebrow"),
      image: "/ecosystem/psychat.png",
      className: "lg:col-span-2 lg:rounded-bl-[2rem]",
    },
    {
      title: t("productMetaverso"),
      desc: t("productMetaversoDesc"),
      href: LINKS.metaverso,
      eyebrow: t("productMetaversoEyebrow"),
      image: "/ecosystem/metaverso.jpg",
      className: "lg:col-span-2",
    },
    {
      title: t("productAgents"),
      desc: t("productAgentsDesc"),
      href: LINKS.agents,
      eyebrow: t("productAgentsEyebrow"),
      image: "/ecosystem/agents.jpg",
      className:
        "max-lg:rounded-b-[2rem] lg:col-span-2 lg:rounded-br-[2rem]",
    },
  ];

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  return (
    <div id="top" className="relative z-10">
      <div className="network-atmosphere" aria-hidden />

      <SiteHeader />

      <main>
        {/* Hero — morph cards: hybrid line, then manifesto on scroll */}
        <section className="relative">
          <ScrollMorphHero
            introTitle={t("heroMorphCenter")}
            introHint={t("heroMorphHint")}
            activeTitle={t("heroHeadline")}
            activeBody={t("heroSupport")}
            cardBackEyebrow={t("morphCardEyebrow")}
            cardBackLabel={t("morphCardLabel")}
          >
            <PrimaryButton href="#explora">{t("heroCta")}</PrimaryButton>
            <SecondaryButton href={LINKS.hub} external>
              {t("heroSecondary")}
            </SecondaryButton>
          </ScrollMorphHero>
        </section>

        {/* Answer block — pinned word reveal */}
        <section className="border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
          <AnswerReveal label={t("answerLabel")} body={t("answerBody")} />
        </section>

        {/* Tri-path — doors right after the short definition, before conceptual depth */}
        <section
          id="explora"
          className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:px-8 md:py-20"
        >
          <p className="section-label">{t("triPathLabel")}</p>
          <h2
            className="max-w-2xl font-heading font-bold tracking-tight text-[var(--text-primary)]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {t("triPathTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
            {t("triPathSupport")}
          </p>

          <TriPathIndex
            brand={t("brand")}
            nodeLabel={t("morphCardLabel")}
            paths={[
              {
                title: t("pathUsersTitle"),
                body: t("pathUsersBody"),
                cta: t("pathUsersCta"),
                href: LINKS.hub,
              },
              {
                title: t("pathProsTitle"),
                body: t("pathProsBody"),
                cta: t("pathProsCta"),
                href: LINKS.academia,
              },
              {
                title: t("pathCommunityTitle"),
                body: t("pathCommunityBody"),
                cta: t("pathCommunityCta"),
                href: LINKS.agents,
              },
            ]}
          />
        </section>

        {/* Sticky definition coda — depth after doors */}
        <section className="border-y border-[var(--border-default)] bg-[var(--bg-primary)]">
          <StickyDefinitionScroll
            label={t("definitionLabel")}
            hint={t("definitionHint")}
            prefix={t("definitionPrefix")}
            srOnly={t("definitionSrOnly")}
            words={definitionWords[locale]}
          />
        </section>

        {/* Living network — intro + layer cards (static, always readable) */}
        <section
          id="red-viva"
          className="scroll-mt-24 border-t border-[var(--border-default)] bg-[var(--bg-elevated)]"
        >
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
            <p className="section-label">{t("layersLabel")}</p>
            <h2
              className="max-w-2xl font-heading font-bold tracking-tight text-[var(--text-primary)]"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {t("layersTitle")}
            </h2>
            <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
              {t("layersIntro")}
            </p>

            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {[
                { title: t("layer1Title"), body: t("layer1Body") },
                { title: t("layer2Title"), body: t("layer2Body") },
                { title: t("layer3Title"), body: t("layer3Body") },
              ].map((layer) => (
                <div key={layer.title}>
                  <h3 className="font-heading text-lg font-semibold">
                    <span className="text-gradient">{layer.title}</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {layer.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scroll-synced layer sequence — optional, below static copy.
            Full-bleed section: the pinned node must span the viewport width
            (same as answer/definition), so do not wrap it in max-w here. */}
        <section
          id="red-viva-secuencia"
          className="scroll-mt-24 border-y border-[var(--border-default)] bg-[var(--bg-primary)]"
        >
          <ScrollCueSequence
            hint={t("sequenceHint")}
            srOnly={t("sequenceSrOnly")}
            cues={sequenceCues[locale]}
          />
        </section>

        {/* Ecosystem map — bento with outbound surface links */}
        <section
          id="ecosistema"
          className="scroll-mt-24 border-y border-[var(--border-default)] bg-[var(--bg-elevated)]"
        >
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
            <PrinciplesBento
              label={t("productsLabel")}
              title={t("productsTitle")}
              lead={t("productsSupport")}
              items={products.map((product) => ({
                eyebrow: product.eyebrow,
                title: product.title,
                description: product.desc,
                href: product.href,
                image: product.image,
                className: product.className,
              }))}
            />
          </div>
        </section>

        {/* 3D explore */}
        <section
          id="ecosistema-3d"
          className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:px-8 md:py-20"
        >
          <p className="section-label">{t("explore3dLabel")}</p>
          <h2
            className="font-heading font-bold tracking-tight text-[var(--text-primary)]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {t("explore3dTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
            {t("explore3dSupport")}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
            {t("explore3dHint")}
          </p>
          <div className="glass-panel relative mt-8 h-[min(70vh,560px)] overflow-hidden bg-black">
            <InfiniteMenu items={ecosystemItems} scale={menuConfig.scale} />
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="scroll-mt-24 border-y border-[var(--border-default)] bg-[var(--bg-elevated)]"
        >
          <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
            <p className="section-label">{t("faqLabel")}</p>
            <h2
              className="font-heading font-bold tracking-tight text-[var(--text-primary)]"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {t("faqTitle")}
            </h2>
            <div className="mt-10 space-y-6">
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="border-t border-[var(--border-default)] pt-6"
                >
                  <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)]">
                    {item.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8">
          <h2
            className="font-heading font-bold tracking-tight text-[var(--text-primary)]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {t("finalTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
            {t("finalSupport")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButton href="#explora">{t("finalCtaExplore")}</PrimaryButton>
            <SecondaryButton href={LINKS.hub} external>
              {t("finalCtaHub")}
            </SecondaryButton>
          </div>
        </section>
      </main>

      <footer className="chrome-dark relative z-10 border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-white/60 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="font-heading text-base font-semibold">
              <span className="text-gradient">{t("footerRights")}</span>
            </p>
            <p className="mt-1">{t("footerTagline")}</p>
          </div>
          <a
            href={LINKS.mcp}
            className="text-[#EC4899] hover:underline"
            rel="noopener noreferrer"
          >
            {t("footerMcp")}
          </a>
        </div>
      </footer>
    </div>
  );
}
