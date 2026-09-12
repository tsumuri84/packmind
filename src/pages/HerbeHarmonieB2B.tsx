'use client';

import { useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail, Minus, Phone, Plus } from 'lucide-react';

const FONTS =
  "@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap');";

const DISPLAY = "font-['Fraunces',_Georgia,_'Times_New_Roman',_serif]";
const TEXT = "font-['Archivo',_ui-sans-serif,_system-ui,_sans-serif]";

const GREEN = '#2C4A3E';

const photo = (id: string, crop = '') => {
  const url = (w: number) =>
    `https://images.unsplash.com/photo-${id}?q=80&w=${w}${crop}`;
  return {
    src: url(900),
    srcSet: [480, 768, 1200].map((w) => `${url(w)} ${w}w`).join(', '),
  };
};

const IMAGES = {
  spa: photo('1502047805166-5080c59a3994', '&fit=crop&crop=entropy'),
  coffret: photo('1469122312224-c5846569feb1', '&fit=crop&crop=top'),
};

const SEGMENTS = [
  'Spas et maisons de soin',
  'Hôtellerie de luxe',
  'Concept stores',
  'Cadeaux d’affaires',
];

const METRICS = [
  { value: '100 %', label: 'Cultivé & extrait en France' },
  { value: '+50', label: 'Partenaires indépendants' },
  { value: '48h', label: 'Livraison sur-mesure' },
];

const CASES = [
  {
    segment: 'Les spas & retraites',
    besoin:
      'Les protocoles de soin réclament des textures et des dosages que le catalogue standard ne couvre jamais tout à fait.',
    reponse:
      'Création de macérats de massage exclusifs et d’huiles sublinguales pour accompagner les protocoles de soin, dosés avec vos praticiens et reproductibles d’une récolte à l’autre.',
    image: IMAGES.spa,
    alt: 'Flacon de verre ambré sur une surface minérale, lumière rasante',
  },
  {
    segment: 'Cadeaux d’affaires prestige',
    besoin:
      'Un cadeau de fin d’année doit tenir devant un comité de direction sans verser dans l’alcool ni dans l’objet publicitaire.',
    reponse:
      'Coffrets botaniques personnalisés, sans alcool, pour remercier vos collaborateurs ou vos clients, avec un emballage éco-conçu neutre et un mot imprimé à vos couleurs.',
    image: IMAGES.coffret,
    alt: 'Coffret texturé fermé par un lien de lin, sur fond de terre ocre',
  },
];

const SERVICES = [
  {
    title: 'Marque blanche',
    detail:
      'Votre marque sur nos formules, de l’étiquette au numéro de lot. Nous restons le producteur déclaré, vous restez le seul nom visible en rayon.',
  },
  {
    title: 'Assemblage botanique dédié',
    detail:
      'Un profil aromatique construit avec vous à partir de nos trois parcelles, puis figé sur trois récoltes pour que votre gamme ne bouge pas d’une année sur l’autre.',
  },
  {
    title: 'Conditionnement spécifique',
    detail:
      'Formats hors catalogue, verre teinté, doseurs, étuis. Les séries courtes démarrent à 200 unités par référence.',
  },
  {
    title: 'Formation de vos équipes',
    detail:
      'Une demi-journée sur site ou au domaine : origine, cadre légal, argumentaire de vente et limites à ne pas franchir devant un client.',
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({
  children,
  tone = 'dark',
}: {
  children: ReactNode;
  tone?: 'dark' | 'light';
}) {
  return (
    <p
      className={`${TEXT} text-[0.6875rem] uppercase tracking-[0.22em] ${
        tone === 'dark' ? 'text-[#1C231F]/70' : 'text-[#F2EFE9]/75'
      }`}
    >
      {children}
    </p>
  );
}

function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="px-6 pb-20 pt-16 sm:px-10 lg:pb-28 lg:pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <Eyebrow>Partenariats professionnels</Eyebrow>
      </motion.div>

      <motion.h1
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        className={`${DISPLAY} mt-10 max-w-[16ch] text-[clamp(2.25rem,5.6vw,5.25rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em]`}
      >
        L’excellence botanique, pour vos clients.
      </motion.h1>

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="lg:col-span-6"
        >
          <p
            className={`${TEXT} max-w-xl text-[0.9375rem] leading-[1.75] text-[#1C231F]/80`}
          >
            Spas, hôtels de luxe, concept stores et cadeaux d’affaires. Des
            formulations sur-mesure issues de nos terres du Luberon, produites
            et extraites sur le domaine, livrées sous votre marque ou sous la
            nôtre.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
            <a
              href="#contact"
              className={`${TEXT} bg-[#1C231F] px-9 py-5 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-[#F2EFE9] transition-colors duration-200 hover:bg-[#5A7160] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A7160]`}
            >
              Demander un devis
            </a>
            <a
              href="#cas"
              className={`${TEXT} inline-flex items-center gap-2 border-b border-[#1C231F]/40 pb-1 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors duration-200 hover:border-[#1C231F]`}
            >
              Voir les cas d’usage
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          className="lg:col-span-4 lg:col-start-9"
        >
          <Eyebrow>Nous travaillons avec</Eyebrow>
          <ul className={`${TEXT} mt-6 border-t border-[#1C231F]/20`}>
            {SEGMENTS.map((segment) => (
              <li
                key={segment}
                className="border-b border-[#1C231F]/15 py-3.5 text-[0.875rem] text-[#1C231F]/85"
              >
                {segment}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function Metrics() {
  return (
    <section className="border-y border-[#1C231F]/20">
      <dl className="grid grid-cols-1 divide-y divide-[#1C231F]/20 md:grid-cols-3 md:divide-x md:divide-y-0">
        {METRICS.map((metric, index) => (
          <Reveal key={metric.value} delay={index * 0.08}>
            <div className="px-6 py-12 sm:px-10 md:py-16">
              <dt
                className={`${DISPLAY} text-[clamp(2.75rem,5.5vw,4.5rem)] font-normal leading-none tracking-[-0.02em] tabular-nums`}
              >
                {metric.value}
              </dt>
              <dd
                className={`${TEXT} mt-6 text-[0.6875rem] uppercase tracking-[0.22em] text-[#1C231F]/70`}
              >
                {metric.label}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

function CaseStudies() {
  return (
    <section id="cas" className="scroll-mt-12 px-6 py-24 sm:px-10 lg:py-32">
      <Reveal>
        <Eyebrow>Cas d’usage</Eyebrow>
        <h2
          className={`${DISPLAY} mt-5 max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.01em]`}
        >
          Ce que nos partenaires nous demandent réellement
        </h2>
      </Reveal>

      <div className="mt-20 space-y-24 lg:space-y-32">
        {CASES.map((item, index) => {
          const imageFirst = index % 2 === 0;

          return (
            <article
              key={item.segment}
              className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16"
            >
              <Reveal
                className={`lg:col-span-5 ${
                  imageFirst ? 'lg:order-1' : 'lg:order-2 lg:col-start-8'
                }`}
              >
                <img
                  {...item.image}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt={item.alt}
                  className="aspect-[3/4] w-full object-cover"
                />
              </Reveal>

              <Reveal
                delay={0.1}
                className={`flex flex-col justify-center lg:col-span-6 ${
                  imageFirst ? 'lg:order-2 lg:col-start-7' : 'lg:order-1'
                }`}
              >
                <h3
                  className={`${DISPLAY} text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold uppercase leading-[1.05] tracking-[-0.01em]`}
                >
                  {item.segment}
                </h3>

                <dl className={`${TEXT} mt-10 border-t border-[#1C231F]/20`}>
                  <div className="border-b border-[#1C231F]/15 py-6">
                    <dt className="text-[0.6875rem] uppercase tracking-[0.22em] text-[#1C231F]/70">
                      Le besoin
                    </dt>
                    <dd className="mt-3 max-w-lg text-[0.9375rem] leading-[1.75] text-[#1C231F]/80">
                      {item.besoin}
                    </dd>
                  </div>
                  <div className="py-6">
                    <dt className="text-[0.6875rem] uppercase tracking-[0.22em] text-[#C48B5E]">
                      Notre réponse
                    </dt>
                    <dd className="mt-3 max-w-lg text-[0.9375rem] leading-[1.75] text-[#1C231F]/85">
                      {item.reponse}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Services() {
  const [open, setOpen] = useState<string | null>(SERVICES[0].title);
  const reduce = useReducedMotion();

  return (
    <section
      id="sur-mesure"
      className="scroll-mt-12 border-t border-[#1C231F]/20 px-6 py-24 sm:px-10 lg:py-32"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <Eyebrow>Sur-mesure</Eyebrow>
          <h2
            className={`${DISPLAY} mt-5 text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.01em]`}
          >
            Quatre façons de travailler ensemble
          </h2>
        </Reveal>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="border-t border-[#1C231F]/20">
            {SERVICES.map((service, index) => {
              const isOpen = open === service.title;
              const panelId = `service-panel-${index}`;
              const buttonId = `service-button-${index}`;

              return (
                <Reveal key={service.title} delay={index * 0.05}>
                  <div className="border-b border-[#1C231F]/15">
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? null : service.title)}
                        className={`${TEXT} flex w-full items-center justify-between gap-6 py-7 text-left transition-colors duration-200 hover:text-[#5A7160] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A7160]`}
                      >
                        <span
                          className={`${DISPLAY} text-[1.25rem] font-semibold tracking-[-0.01em] lg:text-[1.5rem]`}
                        >
                          {service.title}
                        </span>
                        {isOpen ? (
                          <Minus
                            className="h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <Plus className="h-4 w-4 shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    </h3>

                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      initial={false}
                      animate={{ height: isOpen ? 'auto' : 0 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: 0.5, ease: EASE }
                      }
                      className="overflow-hidden"
                    >
                      <p
                        className={`${TEXT} max-w-xl pb-8 text-[0.9375rem] leading-[1.75] text-[#1C231F]/80`}
                      >
                        {service.detail}
                      </p>
                    </motion.div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState('');

  return (
    <section
      id="contact"
      className="scroll-mt-12 px-6 py-24 text-[#F2EFE9] sm:px-10 lg:py-32"
      style={{ backgroundColor: GREEN }}
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Eyebrow tone="light">Devis et partenariats</Eyebrow>
          <h2
            className={`${DISPLAY} mt-5 text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.01em]`}
          >
            Parlons de votre volume
          </h2>
          <p
            className={`${TEXT} mt-8 max-w-sm text-[0.9375rem] leading-[1.75] text-[#F2EFE9]/85`}
          >
            Réponse sous deux jours ouvrés, avec un échantillon envoyé avant
            toute commande. Les séries courtes démarrent à 200 unités.
          </p>

          <ul className={`${TEXT} mt-12 space-y-4 text-[0.875rem]`}>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a
                href="mailto:pro@herbe-harmonie.fr"
                className="border-b border-[#F2EFE9]/40 pb-0.5 transition-colors hover:border-[#F2EFE9]"
              >
                pro@herbe-harmonie.fr
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="tabular-nums">04 90 00 00 00</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const nom = form.elements.namedItem('nom') as HTMLInputElement;
              const societe = form.elements.namedItem(
                'societe',
              ) as HTMLInputElement;
              const demande = form.elements.namedItem(
                'demande',
              ) as HTMLTextAreaElement;

              setStatus(
                nom.value.trim() && societe.value.trim() && demande.value.trim()
                  ? 'Demande enregistrée. Nous revenons vers vous sous deux jours ouvrés.'
                  : 'Merci de renseigner votre nom, votre société et votre demande.',
              );
            }}
          >
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="b2b-nom"
                  className={`${TEXT} text-[0.6875rem] uppercase tracking-[0.22em] text-[#F2EFE9]/75`}
                >
                  Nom
                </label>
                <input
                  id="b2b-nom"
                  name="nom"
                  type="text"
                  required
                  autoComplete="name"
                  className={`${TEXT} mt-4 w-full border-b border-[#F2EFE9]/40 bg-transparent pb-3 text-[0.9375rem] text-[#F2EFE9] placeholder:text-[#F2EFE9]/45 focus:border-[#C48B5E] focus:outline-none`}
                  placeholder="Camille Fabre"
                />
              </div>

              <div>
                <label
                  htmlFor="b2b-societe"
                  className={`${TEXT} text-[0.6875rem] uppercase tracking-[0.22em] text-[#F2EFE9]/75`}
                >
                  Société
                </label>
                <input
                  id="b2b-societe"
                  name="societe"
                  type="text"
                  required
                  autoComplete="organization"
                  className={`${TEXT} mt-4 w-full border-b border-[#F2EFE9]/40 bg-transparent pb-3 text-[0.9375rem] text-[#F2EFE9] placeholder:text-[#F2EFE9]/45 focus:border-[#C48B5E] focus:outline-none`}
                  placeholder="Maison Ventoux"
                />
              </div>
            </div>

            <div className="mt-10">
              <label
                htmlFor="b2b-demande"
                className={`${TEXT} text-[0.6875rem] uppercase tracking-[0.22em] text-[#F2EFE9]/75`}
              >
                Votre demande
              </label>
              <textarea
                id="b2b-demande"
                name="demande"
                rows={4}
                required
                className={`${TEXT} mt-4 w-full resize-y border-b border-[#F2EFE9]/40 bg-transparent pb-3 text-[0.9375rem] leading-[1.7] text-[#F2EFE9] placeholder:text-[#F2EFE9]/45 focus:border-[#C48B5E] focus:outline-none`}
                placeholder="Nature du projet, volumes envisagés, échéance."
              />
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-8">
              <button
                type="submit"
                className={`${TEXT} bg-[#F2EFE9] px-9 py-5 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-[#1C231F] transition-colors duration-200 hover:bg-[#C48B5E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2EFE9]`}
              >
                Envoyer
              </button>
              <p
                role="status"
                aria-live="polite"
                className={`${TEXT} text-[0.8125rem] text-[#F2EFE9]/85`}
              >
                {status}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function HerbeHarmonieB2B() {
  return (
    <div
      className={`${TEXT} min-h-screen bg-[#F2EFE9] text-[#1C231F] antialiased selection:bg-[#1C231F] selection:text-[#F2EFE9]`}
    >
      <style>{FONTS}</style>

      <a
        href="#contenu"
        className={`${TEXT} sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[#1C231F] focus:px-5 focus:py-3 focus:text-[0.8125rem] focus:uppercase focus:tracking-[0.12em] focus:text-[#F2EFE9]`}
      >
        Aller au contenu
      </a>

      <header className="border-b border-[#1C231F]/20">
        <div className="flex items-baseline justify-between px-6 py-5 sm:px-10">
          <a
            href="/"
            className={`${DISPLAY} text-[1.0625rem] font-semibold tracking-[-0.01em]`}
          >
            Herbe &amp; Harmonie
          </a>
          <nav className="flex items-baseline gap-8 text-[0.75rem] uppercase tracking-[0.14em]">
            <a href="#cas" className="hidden hover:text-[#5A7160] sm:inline">
              Cas d’usage
            </a>
            <a
              href="#sur-mesure"
              className="hidden hover:text-[#5A7160] sm:inline"
            >
              Sur-mesure
            </a>
            <a href="#contact" className="hover:text-[#5A7160]">
              Devis
            </a>
          </nav>
        </div>
      </header>

      <main id="contenu">
        <Hero />
        <Metrics />
        <CaseStudies />
        <Services />
        <Contact />
      </main>

      <footer className="px-6 py-12 sm:px-10">
        <div
          className={`${TEXT} flex flex-col gap-2 text-[0.75rem] text-[#1C231F]/70 sm:flex-row sm:items-center sm:justify-between`}
        >
          <span>
            © {new Date().getFullYear()} Herbe &amp; Harmonie — Espace
            professionnel
          </span>
          <span>THC &lt; 0,3 %. Vente interdite aux mineurs.</span>
        </div>
      </footer>
    </div>
  );
}
