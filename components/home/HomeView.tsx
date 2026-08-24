"use client";

import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/site/SiteHeader";
import { useSite } from "@/components/providers/SiteProviders";
import PrinciplesBento from "@/components/ui/bento";
import { LINKS } from "@/lib/site";
import { definitionWords, sequenceCues } from "@/lib/messages";
import { ecosystemItems, menuConfig } from "@/data/ecosystem";
import { StickyDefinitionScroll } from "@/components/home/StickyDefinitionScroll";
import { ScrollCueSequence } from "@/components/home/ScrollCueSequence";
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
    },
    {
      title: t("productAcademia"),
      desc: t("productAcademiaDesc"),
      href: LINKS.academia,
    },
    {
      title: t("productPsychat"),
      desc: t("productPsychatDesc"),
      href: LINKS.psychat,
    },
    {
      title: t("productMetaverso"),
      desc: t("productMetaversoDesc"),
      href: LINKS.metaverso,
    },
    {
      title: t("productGobernanza"),
      desc: t("productGobernanzaDesc"),
      href: LINKS.gobernanza,
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

        {/* Answer block + sticky definition coda */}
        <section className="border-y border-[var(--border-default)] bg-[var(--bg-elevated)]">
          <div className="mx-auto max-w-3xl px-5 pt-14 md:px-8 md:pt-16">
            <p className="section-label">{t("answerLabel")}</p>
            <p className="text-lg leading-relaxed text-[var(--text-primary)] md:text-xl">
              {t("answerBody")}
            </p>
          </div>
          <StickyDefinitionScroll
            prefix={t("definitionPrefix")}
            srOnly={t("definitionSrOnly")}
            words={definitionWords[locale]}
          />
        </section>

        {/* Tri-path */}
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

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
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
                href: LINKS.gobernanza,
              },
            ].map((path) => (
              <article key={path.href} className="glass-panel p-6">
                <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)]">
                  {path.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {path.body}
                </p>
                <a
                  href={path.href}
                  className="link-accent mt-5 inline-block text-sm"
                  rel="noopener noreferrer"
                >
                  {path.cta} →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Living network layers + scroll sequence */}
        <section
          id="red-viva"
          className="scroll-mt-24 border-y border-[var(--border-default)] bg-[var(--bg-elevated)]"
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

            <div className="mt-10">
              <ScrollCueSequence
                hint={t("sequenceHint")}
                srOnly={t("sequenceSrOnly")}
                cues={sequenceCues[locale]}
              />
            </div>

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

        {/* Product map */}
        <section
          id="productos"
          className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20"
        >
          <p className="section-label">{t("productsLabel")}</p>
          <h2
            className="font-heading font-bold tracking-tight text-[var(--text-primary)]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {t("productsTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
            {t("productsSupport")}
          </p>
          <ul className="mt-10 divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
            {products.map((product) => (
              <li key={product.href}>
                <a
                  href={product.href}
                  className="group flex flex-col gap-1 py-5 transition-colors md:flex-row md:items-baseline md:justify-between md:gap-8"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="font-heading text-lg font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[#EC4899]">
                    {product.title}
                  </span>
                  <span className="max-w-xl text-sm text-[var(--text-secondary)] md:text-right">
                    {product.desc}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Principles — Motus bento */}
        <section
          id="principios"
          className="scroll-mt-24 border-y border-[var(--border-default)] bg-[var(--bg-elevated)]"
        >
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
            <PrinciplesBento
              label={t("principlesLabel")}
              title={t("principlesTitle")}
              lead={t("principlesLead")}
              items={[
                {
                  eyebrow: t("principle1Eyebrow"),
                  title: t("principle1Title"),
                  description: t("principle1Body"),
                  image:
                    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
                  className:
                    "max-lg:rounded-t-[2rem] lg:col-span-3 lg:rounded-tl-[2rem]",
                },
                {
                  eyebrow: t("principle2Eyebrow"),
                  title: t("principle2Title"),
                  description: t("principle2Body"),
                  image:
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
                  className: "lg:col-span-3 lg:rounded-tr-[2rem]",
                },
                {
                  eyebrow: t("principle3Eyebrow"),
                  title: t("principle3Title"),
                  description: t("principle3Body"),
                  image:
                    "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1200&q=80",
                  className: "lg:col-span-2 lg:rounded-bl-[2rem]",
                },
                {
                  eyebrow: t("principle4Eyebrow"),
                  title: t("principle4Title"),
                  description: t("principle4Body"),
                  image:
                    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
                  className: "lg:col-span-2",
                },
                {
                  eyebrow: t("principle5Eyebrow"),
                  title: t("principle5Title"),
                  description: t("principle5Body"),
                  image:
                    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
                  className:
                    "max-lg:rounded-b-[2rem] lg:col-span-2 lg:rounded-br-[2rem]",
                },
              ]}
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
