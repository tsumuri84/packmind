'use client';

import { useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

const FONTS =
  "@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap');";

const DISPLAY = "font-['Fraunces',_Georgia,_'Times_New_Roman',_serif]";
const TEXT = "font-['Archivo',_ui-sans-serif,_system-ui,_sans-serif]";

const photo = (id: string, crop = '') => {
  const url = (w: number) =>
    `https://images.unsplash.com/photo-${id}?q=80&w=${w}${crop}`;
  return {
    src: url(1200),
    srcSet: [480, 768, 1200, 1800].map((w) => `${url(w)} ${w}w`).join(', '),
  };
};

const IMAGES = {
  hero: photo('1502047805166-5080c59a3994'),
  terroir: photo('1469122312224-c5846569feb1', '&fit=crop&crop=entropy'),
  huile: photo('1502047805166-5080c59a3994', '&fit=crop&crop=entropy'),
  baume: photo('1469122312224-c5846569feb1', '&fit=crop&crop=top'),
  infusion: photo('1502047805166-5080c59a3994', '&fit=crop&crop=top'),
};

const FICHE = [
  { label: 'Parcelles', value: 'Claparèdes, Sault, Roussillon' },
  { label: 'Altitude', value: '380 à 460 m' },
  { label: 'Récolte', value: 'Manuelle, septembre à octobre' },
  { label: 'Extraction', value: 'CO₂ supercritique, 18 °C' },
  { label: 'Délai champ-flacon', value: '48 heures' },
];

const PROCESS = [
  {
    step: '01',
    title: 'Semis en terrasses',
    detail:
      'Des restanques exposées plein sud, sur les sols ocre au nord d’Apt. Densité volontairement basse, sans irrigation d’appoint.',
  },
  {
    step: '02',
    title: 'Récolte manuelle',
    detail:
      'Coupe sélective à la serpette, fleur par fleur, en trois passages entre la mi-septembre et la fin octobre.',
  },
  {
    step: '03',
    title: 'Extraction à froid',
    detail:
      'CO₂ supercritique maintenu sous 18 °C, pour garder les terpènes que la distillation à chaud détruit.',
  },
  {
    step: '04',
    title: 'Mise en flacon',
    detail:
      'Verre ambré, numéroté par lot, accompagné de son analyse de laboratoire consultable en ligne.',
  },
];

const PRODUCTS = [
  {
    ref: 'HB-10',
    name: 'Huile Botanique',
    strength: '10 %',
    origin: 'Parcelle des Claparèdes',
    note: 'Résineuse, poivrée, longue en bouche. Sublinguale, matin ou soir.',
    volume: '30 ml',
    price: '54 €',
    image: IMAGES.huile,
    alt: 'Flacon d’huile botanique sur la terre ocre du Luberon',
  },
  {
    ref: 'BR-02',
    name: 'Baume Racines',
    strength: '4 %',
    origin: 'Plateau de Sault',
    note: 'Cire d’abeille et huile d’olive du moulin voisin. Pour les mains et les articulations.',
    volume: '50 ml',
    price: '38 €',
    image: IMAGES.baume,
    alt: 'Baume artisanal et végétation sèche du plateau de Sault',
  },
  {
    ref: 'IS-01',
    name: 'Infusion Sérénité',
    strength: '2 %',
    origin: 'Vallon de Roussillon',
    note: 'Fleurs entières, verveine et camomille. Infusion longue, dix minutes.',
    volume: '80 g',
    price: '24 €',
    image: IMAGES.infusion,
    alt: 'Fleurs séchées destinées à l’infusion, vallon de Roussillon',
  },
];

const MARQUEE_TEXT =
  '100% naturel — Récolte artisanale dans le Luberon — Circuit court — ';

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
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({
  label,
  title,
  className = '',
}: {
  label: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p
        className={`${TEXT} mb-5 text-[0.6875rem] uppercase tracking-[0.2em] text-[#1C231F]/70`}
      >
        {label}
      </p>
      <h2
        className={`${DISPLAY} max-w-xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.01em]`}
      >
        {title}
      </h2>
    </div>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 60]);

  return (
    <section
      ref={ref}
      className="grid grid-cols-1 items-end gap-14 border-b border-[#1C231F]/15 lg:grid-cols-12 lg:gap-0"
    >
      <div className="px-6 pt-16 sm:px-10 lg:col-span-7 lg:pb-24 lg:pr-16 lg:pt-28">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className={`${TEXT} mb-10 text-[0.6875rem] uppercase tracking-[0.2em] text-[#1C231F]/70`}
        >
          Domaine artisanal — Apt, Vaucluse
        </motion.p>

        <motion.h1
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className={`${DISPLAY} text-[clamp(2.75rem,6.2vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.02em]`}
        >
          L’or vert
          <br />
          du Luberon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className={`${TEXT} mt-10 max-w-md text-[0.9375rem] leading-[1.75] text-[#1C231F]/80`}
        >
          Trois parcelles sur les hauteurs d’Apt, récoltées à la main et
          extraites à froid dans les quarante-huit heures. Une seule récolte par
          an, tracée du rang au flacon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5"
        >
          <a
            href="#gamme"
            className={`${TEXT} bg-[#1C231F] px-8 py-4 text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-[#F2EFE9] transition-colors duration-200 hover:bg-[#5A7160] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A7160]`}
          >
            Voir la gamme
          </a>
          <a
            href="#terroir"
            className={`${TEXT} border-b border-[#1C231F]/40 pb-1 text-[0.8125rem] font-medium uppercase tracking-[0.12em] transition-colors duration-200 hover:border-[#1C231F]`}
          >
            Le domaine
          </a>
        </motion.div>
      </div>

      <div className="lg:col-span-5">
        <motion.div
          style={{ y }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="relative"
        >
          <img
            {...IMAGES.hero}
            sizes="(min-width: 1024px) 42vw, 100vw"
            alt="Rangs de culture sur les hauteurs d’Apt à la fin du jour"
            className="aspect-[4/5] w-full object-cover lg:aspect-[3/4]"
          />
          <p
            className={`${TEXT} absolute bottom-0 left-0 bg-[#F2EFE9] px-4 py-3 text-[0.6875rem] uppercase tracking-[0.16em] text-[#1C231F]/80`}
          >
            Récolte 2026 — Parcelle des Claparèdes
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-hidden border-b border-[#1C231F]/15 bg-[#1C231F] py-3.5">
      <motion.div
        className="flex w-max whitespace-nowrap"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 1].map((block) => (
          <span
            key={block}
            aria-hidden={block === 1}
            className={`${TEXT} text-[0.75rem] tracking-[0.1em] text-[#F2EFE9]/90`}
          >
            {MARQUEE_TEXT.repeat(6)}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Terroir() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);

  return (
    <section
      id="terroir"
      ref={ref}
      className="scroll-mt-12 grid grid-cols-1 items-center gap-14 border-b border-[#1C231F]/15 py-24 lg:grid-cols-12 lg:gap-0 lg:py-0"
    >
      <div className="order-2 px-6 sm:px-10 lg:order-1 lg:col-span-5 lg:py-32 lg:pl-0 lg:pr-16">
        <div className="overflow-hidden">
          <motion.img
            style={{ y }}
            {...IMAGES.terroir}
            sizes="(min-width: 1024px) 40vw, 100vw"
            alt="Sols ocre et végétation sèche du plateau du Luberon"
            className="aspect-[3/4] w-full scale-105 object-cover"
          />
        </div>
      </div>

      <div className="order-1 px-6 sm:px-10 lg:order-2 lg:col-span-6 lg:col-start-7 lg:py-32">
        <Reveal>
          <SectionHead
            label="Le terroir"
            title="Un sol qui force la plante à se concentrer"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className={`${TEXT} mt-8 max-w-md space-y-5 text-[0.9375rem] leading-[1.75] text-[#1C231F]/80`}>
            <p>
              L’ocre retient la chaleur de la journée et la restitue une partie
              de la nuit. Les plants poussent lentement, sans excès d’eau, et
              concentrent leurs terpènes plutôt que leur biomasse.
            </p>
            <p>
              C’est une matière première dense et résineuse, qu’aucune culture
              sous serre ne reproduit. Le rendement en pâtit. Le profil
              aromatique, non.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <dl className={`${TEXT} mt-14 max-w-md border-t border-[#1C231F]/20`}>
            {FICHE.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-8 border-b border-[#1C231F]/15 py-4"
              >
                <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-[#1C231F]/70">
                  {row.label}
                </dt>
                <dd className="text-right text-[0.875rem] tabular-nums">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function Methode() {
  return (
    <section
      id="methode"
      className="scroll-mt-12 border-b border-[#1C231F]/15 px-6 py-24 sm:px-10 lg:py-32"
    >
      <Reveal>
        <SectionHead
          label="La méthode"
          title="Quatre gestes, une seule saison"
          className="mb-16"
        />
      </Reveal>

      <ol className="border-t border-[#1C231F]/20">
        {PROCESS.map(({ step, title, detail }, index) => (
          <Reveal key={step} delay={index * 0.05}>
            <li className="grid grid-cols-1 gap-y-3 border-b border-[#1C231F]/15 py-9 sm:grid-cols-12 sm:gap-8">
              <span
                className={`${TEXT} text-[0.75rem] tabular-nums tracking-[0.16em] text-[#C48B5E] sm:col-span-1`}
              >
                {step}
              </span>
              <h3
                className={`${DISPLAY} text-[1.375rem] font-semibold leading-tight tracking-[-0.01em] sm:col-span-4 lg:text-[1.5rem]`}
              >
                {title}
              </h3>
              <p
                className={`${TEXT} max-w-lg text-[0.9375rem] leading-[1.7] text-[#1C231F]/80 sm:col-span-7`}
              >
                {detail}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Gamme() {
  return (
    <section
      id="gamme"
      className="scroll-mt-12 border-b border-[#1C231F]/15 px-6 py-24 sm:px-10 lg:py-32"
    >
      <Reveal>
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <SectionHead label="La gamme" title="Trois formules, une récolte" />
          <p
            className={`${TEXT} max-w-xs text-[0.875rem] leading-[1.7] text-[#1C231F]/75`}
          >
            Chaque lot porte son numéro et son analyse. Quand la récolte est
            épuisée, la référence disparaît jusqu’à l’année suivante.
          </p>
        </div>
      </Reveal>

      <div className="border-t border-[#1C231F]/20">
        {PRODUCTS.map((product, index) => (
          <Reveal key={product.ref} delay={index * 0.05}>
            <article className="grid grid-cols-1 gap-6 border-b border-[#1C231F]/15 py-8 sm:grid-cols-12 sm:items-center sm:gap-8">
              <div className="sm:col-span-3 lg:col-span-2">
                <img
                  {...product.image}
                  sizes="(min-width: 1024px) 9rem, 7rem"
                  alt={product.alt}
                  className="aspect-[4/5] w-28 max-w-[9rem] object-cover sm:w-full"
                />
              </div>

              <div className="sm:col-span-4 lg:col-span-3">
                <p
                  className={`${TEXT} text-[0.6875rem] uppercase tracking-[0.16em] text-[#1C231F]/70`}
                >
                  {product.ref} — {product.strength}
                </p>
                <h3
                  className={`${DISPLAY} mt-2 text-[1.375rem] font-semibold leading-tight tracking-[-0.01em]`}
                >
                  {product.name}
                </h3>
                <p
                  className={`${TEXT} mt-1 text-[0.8125rem] text-[#1C231F]/75`}
                >
                  {product.origin}
                </p>
              </div>

              <p
                className={`${TEXT} max-w-sm text-[0.9375rem] leading-[1.7] text-[#1C231F]/80 sm:col-span-5 lg:col-span-4`}
              >
                {product.note}
              </p>

              <div className="flex items-baseline justify-between gap-6 sm:col-span-12 sm:justify-start lg:col-span-3 lg:justify-end">
                <p className={`${TEXT} text-[0.8125rem] text-[#1C231F]/75`}>
                  {product.volume}
                </p>
                <p
                  className={`${DISPLAY} text-[1.25rem] font-semibold tabular-nums lg:w-24 lg:text-right`}
                >
                  {product.price}
                </p>
                <button
                  type="button"
                  aria-label={`Ajouter ${product.name} au panier`}
                  className={`${TEXT} border border-[#1C231F] px-5 py-2.5 text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-[#1C231F] hover:text-[#F2EFE9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A7160]`}
                >
                  Ajouter
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Engagement() {
  return (
    <section className="border-b border-[#1C231F]/15 bg-[#1C231F] px-6 py-24 text-[#F2EFE9] sm:px-10 lg:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <p
          className={`${TEXT} text-[0.6875rem] uppercase tracking-[0.2em] text-[#F2EFE9]/70 lg:col-span-3`}
        >
          Ce que nous ne faisons pas
        </p>

        <div className="lg:col-span-8 lg:col-start-5">
          <Reveal>
            <p
              className={`${DISPLAY} max-w-2xl text-[clamp(1.5rem,2.8vw,2.25rem)] font-normal leading-[1.3] tracking-[-0.01em]`}
            >
              Pas de culture sous serre, pas d’achat de matière première à
              l’extérieur, pas de seconde récolte pour tenir le stock. Quand la
              parcelle a donné, elle a donné.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl
              className={`${TEXT} mt-14 grid max-w-2xl grid-cols-1 gap-y-4 border-t border-[#F2EFE9]/25 pt-6 sm:grid-cols-2 sm:gap-x-10`}
            >
              <div className="flex justify-between gap-6 border-b border-[#F2EFE9]/15 pb-4 sm:border-none sm:pb-0">
                <dt className="text-[0.8125rem] text-[#F2EFE9]/75">
                  Surface cultivée
                </dt>
                <dd className="text-[0.8125rem] tabular-nums">4,2 hectares</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-[#F2EFE9]/15 pb-4 sm:border-none sm:pb-0">
                <dt className="text-[0.8125rem] text-[#F2EFE9]/75">
                  Récolte 2026
                </dt>
                <dd className="text-[0.8125rem] tabular-nums">1 840 flacons</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-[#F2EFE9]/15 pb-4 sm:border-none sm:pb-0">
                <dt className="text-[0.8125rem] text-[#F2EFE9]/75">
                  Analyses par lot
                </dt>
                <dd className="text-[0.8125rem] tabular-nums">3</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="text-[0.8125rem] text-[#F2EFE9]/75">
                  Teneur THC
                </dt>
                <dd className="text-[0.8125rem] tabular-nums">&lt; 0,3 %</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [status, setStatus] = useState('');

  return (
    <section className="border-b border-[#1C231F]/15 px-6 py-24 sm:px-10 lg:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead
            label="Carnet de récolte"
            title="Une lettre par saison, pas davantage"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p
            className={`${TEXT} max-w-md text-[0.9375rem] leading-[1.75] text-[#1C231F]/80`}
          >
            L’avancée des parcelles, les analyses de lot dès leur publication, et
            l’ouverture des ventes avant le reste de la liste.
          </p>

          <form
            className="mt-10 max-w-md"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              const field = event.currentTarget.elements.namedItem(
                'email',
              ) as HTMLInputElement;
              setStatus(
                field.checkValidity()
                  ? 'Inscription enregistrée. À la prochaine récolte.'
                  : 'Merci de renseigner une adresse e-mail valide.',
              );
            }}
          >
            <label
              htmlFor="newsletter-email"
              className={`${TEXT} text-[0.6875rem] uppercase tracking-[0.16em] text-[#1C231F]/70`}
            >
              Adresse e-mail
            </label>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="vous@exemple.fr"
                className={`${TEXT} w-full border-b border-[#1C231F]/40 bg-transparent pb-3 text-[0.9375rem] placeholder:text-[#1C231F]/45 focus:border-[#5A7160] focus:outline-none`}
              />
              <button
                type="submit"
                className={`${TEXT} shrink-0 bg-[#1C231F] px-8 py-4 text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-[#F2EFE9] transition-colors duration-200 hover:bg-[#5A7160] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A7160]`}
              >
                S’inscrire
              </button>
            </div>
            <p
              role="status"
              aria-live="polite"
              className={`${TEXT} mt-4 text-[0.8125rem] text-[#5A7160]`}
            >
              {status}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function HerbeHarmonieLanding() {
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

      <header className="border-b border-[#1C231F]/15">
        <div className="flex items-baseline justify-between px-6 py-5 sm:px-10">
          <a href="#" className={`${DISPLAY} text-[1.0625rem] font-semibold tracking-[-0.01em]`}>
            Herbe &amp; Harmonie
          </a>
          <nav className="flex items-baseline gap-8 text-[0.75rem] uppercase tracking-[0.14em]">
            <a href="#terroir" className="hidden hover:text-[#5A7160] sm:inline">
              Terroir
            </a>
            <a href="#methode" className="hidden hover:text-[#5A7160] sm:inline">
              Méthode
            </a>
            <a href="#gamme" className="hover:text-[#5A7160]">
              Gamme
            </a>
            <span className="text-[#1C231F]/70">Panier (0)</span>
          </nav>
        </div>
      </header>

      <main id="contenu">
        <Hero />
        <Marquee />
        <Terroir />
        <Methode />
        <Gamme />
        <Engagement />
        <Newsletter />
      </main>

      <footer className="px-6 py-16 sm:px-10">
        <div className="grid grid-cols-2 gap-10 text-[0.875rem] lg:grid-cols-4">
          <div>
            <p className="mb-5 text-[0.6875rem] uppercase tracking-[0.16em] text-[#1C231F]/70">
              Boutique
            </p>
            <ul className="space-y-2.5 text-[#1C231F]/85">
              <li>Huiles</li>
              <li>Baumes</li>
              <li>Infusions</li>
            </ul>
          </div>
          <div>
            <p className="mb-5 text-[0.6875rem] uppercase tracking-[0.16em] text-[#1C231F]/70">
              Le domaine
            </p>
            <ul className="space-y-2.5 text-[#1C231F]/85">
              <li>Terroir</li>
              <li>Méthode</li>
              <li>Analyses de lot</li>
            </ul>
          </div>
          <div>
            <p className="mb-5 text-[0.6875rem] uppercase tracking-[0.16em] text-[#1C231F]/70">
              Aide
            </p>
            <ul className="space-y-2.5 text-[#1C231F]/85">
              <li>Livraison</li>
              <li>Retours</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <p className="mb-5 text-[0.6875rem] uppercase tracking-[0.16em] text-[#1C231F]/70">
              Adresse
            </p>
            <p className="leading-[1.7] text-[#1C231F]/85">
              Chemin des Claparèdes
              <br />
              84400 Apt, Vaucluse
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-[#1C231F]/15 pt-6 text-[0.75rem] text-[#1C231F]/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Herbe &amp; Harmonie</span>
          <span>THC &lt; 0,3 %. Vente interdite aux mineurs.</span>
        </div>
      </footer>
    </div>
  );
}
