'use client';

import { useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Plus,
  ShoppingBag,
  Sun,
} from 'lucide-react';

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1502047805166-5080c59a3994?q=80&w=1200',
  terroir:
    'https://images.unsplash.com/photo-1469122312224-c5846569feb1?q=80&w=1000&h=1300&fit=crop&crop=entropy',
  huile:
    'https://images.unsplash.com/photo-1502047805166-5080c59a3994?q=80&w=800&h=1000&fit=crop&crop=entropy',
  baume:
    'https://images.unsplash.com/photo-1469122312224-c5846569feb1?q=80&w=800&h=1000&fit=crop&crop=top',
  infusion:
    'https://images.unsplash.com/photo-1502047805166-5080c59a3994?q=80&w=800&h=1000&fit=crop&crop=top',
};

const STATS = [
  { value: '420 m', label: "Altitude d'implantation" },
  { value: '100 %', label: 'Récolte à la main' },
  { value: '48 h', label: 'Du champ au flacon' },
];

const PROCESS = [
  {
    step: '01',
    title: 'Semis en terrasses',
    detail:
      'Des parcelles de restanques exposées plein sud, sur les sols ocre d’Apt.',
  },
  {
    step: '02',
    title: 'Récolte manuelle',
    detail:
      'Coupe sélective à la serpette, fleur par fleur, entre septembre et octobre.',
  },
  {
    step: '03',
    title: 'Extraction à froid',
    detail:
      'CO₂ supercritique sous 18 °C pour préserver terpènes et cannabinoïdes.',
  },
  {
    step: '04',
    title: 'Mise en flacon',
    detail:
      'Conditionnement en verre ambré, numéroté par lot et analysé en laboratoire.',
  },
];

const PRODUCTS = [
  {
    name: 'Huile Botanique 10%',
    origin: 'Parcelle des Claparèdes',
    tag: 'RÉCOLTE 2026',
    price: '54€',
    volume: '30 ml',
    image: IMAGES.huile,
    alt: 'Flacon d’huile botanique posé sur la terre ocre du Luberon',
  },
  {
    name: 'Baume Racines',
    origin: 'Plateau de Sault',
    tag: 'TERROIR',
    price: '38€',
    volume: '50 ml',
    image: IMAGES.baume,
    alt: 'Baume artisanal et végétation sèche du plateau de Sault',
  },
  {
    name: 'Infusion Sérénité',
    origin: 'Vallon de Roussillon',
    tag: 'ÉDITION LIMITÉE',
    price: '24€',
    volume: '80 g',
    image: IMAGES.infusion,
    alt: 'Fleurs séchées destinées à l’infusion, vallon de Roussillon',
  },
];

const MARQUEE_TEXT =
  '100% NATUREL • RÉCOLTE ARTISANALE DANS LE LUBERON • CIRCUIT COURT • ';

const EASE = [0.22, 1, 0.36, 1] as const;

const DISPLAY_XL = 'text-[clamp(2.25rem,5.6vw,6rem)]';
const DISPLAY_M = 'text-[clamp(1.75rem,4vw,3rem)]';

function DisplayLine({ text, delay }: { text: string; delay: number }) {
  const reduce = useReducedMotion();

  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block break-words"
        initial={reduce ? { opacity: 0 } : { y: '112%' }}
        animate={reduce ? { opacity: 1 } : { y: '0%' }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );
}

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
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <p className="mb-6 flex items-center gap-4 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase tracking-[0.28em] text-[#1C231F]/70">
      <span className="text-[#C48B5E]">{index}</span>
      <span className="h-px w-12 bg-[#1C231F]/25" />
      <span>{label}</span>
    </p>
  );
}

function HarvestSeal() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative h-24 w-24 rounded-full bg-[#5A7160] shadow-[0_18px_40px_-18px_rgba(28,35,31,0.55)] lg:h-28 lg:w-28"
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path
            id="harvest-seal-path"
            fill="none"
            d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
          />
        </defs>
        <text
          className="fill-[#F2EFE9] text-[7.5px] uppercase"
          style={{ fontFamily: 'Inter, ui-sans-serif, sans-serif' }}
        >
          <textPath
            href="#harvest-seal-path"
            startOffset="0%"
            textLength="219"
            lengthAdjust="spacing"
          >
            Récolte 2026 • Apt • Luberon •
          </textPath>
        </text>
      </motion.svg>
      <Sun
        strokeWidth={1.2}
        className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-[#F2EFE9]"
      />
    </div>
  );
}

function HeroVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -48]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={{ y }}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="relative overflow-hidden rounded-t-full border border-[#1C231F]/10"
      >
        <img
          src={IMAGES.hero}
          alt="Collines et champs de Provence dans la lumière de fin de journée"
          className="aspect-[4/5] w-full object-cover lg:aspect-[3/4]"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
          className="absolute inset-x-4 bottom-4 flex items-center gap-3 bg-[#F2EFE9]/95 px-4 py-3 backdrop-blur-sm sm:inset-x-auto sm:left-6 sm:bottom-6 sm:px-5 sm:py-4"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C48B5E]">
            <MapPin className="h-4 w-4 text-[#F2EFE9]" strokeWidth={2.4} />
          </span>
          <span className="font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] leading-tight">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em]">
              Récolté près d&apos;Apt
            </span>
            <span className="mt-1 block text-xs text-[#1C231F]/70">
              Vaucluse, France
            </span>
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
        className="absolute right-4 top-4 sm:right-6 sm:top-8 lg:-right-6"
      >
        <HarvestSeal />
      </motion.div>
    </div>
  );
}

function Marquee() {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-hidden bg-[#1C231F] py-4">
      <motion.div
        className="flex w-max whitespace-nowrap"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 1].map((block) => (
          <span
            key={block}
            aria-hidden={block === 1}
            className="font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-medium uppercase tracking-[0.22em] text-[#F2EFE9]"
          >
            {MARQUEE_TEXT.repeat(4)}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function TerroirSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);

  return (
    <section
      id="terroir"
      ref={ref}
      className="scroll-mt-28 px-6 py-28 sm:px-10 lg:py-40"
    >
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="overflow-hidden">
              <motion.img
                style={{ y }}
                src={IMAGES.terroir}
                alt="Sols ocre et végétation sèche du plateau du Luberon"
                className="aspect-[3/4] w-full scale-110 object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <Eyebrow index="01" label="Le terroir" />
            <h2
              className={`font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] ${DISPLAY_M} font-bold uppercase leading-[1.02] tracking-tight`}
            >
              Une terre qui donne le ton
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-base font-light leading-relaxed text-[#1C231F]/75">
              L&apos;ocre du Luberon retient la chaleur et la restitue la nuit.
              Nos plants poussent lentement, concentrent leurs terpènes, et
              donnent une matière première dense, résineuse, impossible à
              obtenir en culture forcée.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-14 grid grid-cols-1 gap-8 border-t border-[#1C231F]/15 pt-10 sm:grid-cols-3">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-3xl font-bold tracking-tight">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase leading-snug tracking-[0.18em] text-[#1C231F]/70">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section
      id="methode"
      className="scroll-mt-28 px-6 pb-28 sm:px-10 lg:pb-40"
    >
      <Reveal>
        <Eyebrow index="02" label="La méthode" />
        <h2
          className={`mb-16 font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] ${DISPLAY_M} font-bold uppercase leading-[1.02] tracking-tight`}
        >
          Du champ au flacon
        </h2>
      </Reveal>

      <div className="border-t border-[#1C231F]/15">
        {PROCESS.map(({ step, title, detail }, index) => (
          <Reveal key={step} delay={index * 0.05}>
            <div className="grid grid-cols-1 gap-3 border-b border-[#1C231F]/15 py-10 transition-colors duration-500 hover:bg-[#1C231F]/[0.02] sm:grid-cols-12 sm:items-baseline sm:gap-10">
              <span className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-bold tracking-[0.2em] text-[#C48B5E] sm:col-span-1">
                {step}
              </span>
              <h3 className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-xl font-semibold uppercase tracking-tight sm:col-span-4 lg:text-2xl">
                {title}
              </h3>
              <p className="max-w-md font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-light leading-relaxed text-[#1C231F]/75 sm:col-span-7">
                {detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[number];
  index: number;
}) {
  const { name, origin, tag, price, volume, image, alt } = product;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="group flex h-full flex-col border border-[#1C231F]/10 bg-[#FBFAF7] transition-colors duration-500 hover:border-[#1C231F]/25">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={alt}
            className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          />
          <span className="absolute left-4 top-4 rounded-full bg-[#F2EFE9] px-3 py-1 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1C231F]">
            {tag}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-lg font-semibold uppercase leading-tight tracking-tight">
            {name}
          </h3>
          <p className="mt-2 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase tracking-[0.16em] text-[#1C231F]/70">
            {origin}
          </p>

          <div className="mt-auto flex items-baseline justify-between gap-4 border-t border-[#1C231F]/10 pt-6">
            <p className="flex items-baseline gap-2">
              <span className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-xl font-bold tracking-tight">
                {price}
              </span>
              <span className="font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase tracking-[0.16em] text-[#1C231F]/70">
                {volume}
              </span>
            </p>
            <button
              type="button"
              aria-label={`Ajouter ${name} au panier`}
              className="flex shrink-0 items-center gap-2 self-center rounded-full border border-[#1C231F]/30 px-5 py-2.5 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-300 hover:border-[#1C231F] hover:bg-[#1C231F] hover:text-[#F2EFE9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A7160]"
            >
              Ajouter
              <Plus className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Manifesto() {
  return (
    <section className="bg-[#1C231F] px-6 py-28 text-[#F2EFE9] sm:px-10 lg:py-40">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase tracking-[0.28em] text-[#F2EFE9]/60">
            Manifeste
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="mt-10 font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold uppercase leading-[1.15] tracking-tight [text-wrap:balance]">
            Nous ne vendons pas du CBD. Nous mettons en flacon{' '}
            <span className="text-[#C48B5E]">un versant du Luberon</span>, une
            saison, et le travail de six paires de mains.
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 flex items-center gap-4 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm text-[#F2EFE9]/70">
            <span className="h-px w-10 bg-[#F2EFE9]/40" />
            Camille Roux, fondatrice et productrice
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Newsletter() {
  const [status, setStatus] = useState('');

  return (
    <section className="px-6 py-28 sm:px-10 lg:py-40">
      <div className="grid grid-cols-1 gap-14 border border-[#1C231F]/15 p-8 lg:grid-cols-2 lg:gap-20 lg:p-16">
        <Reveal>
          <Eyebrow index="04" label="Carnet de récolte" />
          <h2
            className={`font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] ${DISPLAY_M} font-bold uppercase leading-[1.02] tracking-tight`}
          >
            Une lettre par saison
          </h2>
          <p className="mt-6 max-w-sm font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-light leading-relaxed text-[#1C231F]/75">
            L&apos;avancée des parcelles, les analyses de lot, et
            l&apos;ouverture des ventes en avant-première.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex items-end">
          <form
            className="w-full"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              const field = event.currentTarget.elements.namedItem(
                'email',
              ) as HTMLInputElement;
              setStatus(
                field.checkValidity()
                  ? 'Merci, vous recevrez notre prochaine lettre de récolte.'
                  : 'Merci de renseigner une adresse e-mail valide.',
              );
            }}
          >
            <label
              htmlFor="newsletter-email"
              className="font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase tracking-[0.2em] text-[#1C231F]/70"
            >
              Votre adresse e-mail
            </label>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="camille@domaine.fr"
                className="w-full border-b border-[#1C231F]/30 bg-transparent pb-3 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-base placeholder:text-[#1C231F]/40 focus:border-[#5A7160] focus:outline-none"
              />
              <button
                type="submit"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#1C231F] px-7 py-4 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-semibold uppercase tracking-[0.16em] text-[#F2EFE9] transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A7160]"
              >
                S&apos;inscrire
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p
              role="status"
              aria-live="polite"
              className="mt-4 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs text-[#5A7160]"
            >
              {status}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default function HerbeHarmonieLanding() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-[#F2EFE9] text-[#1C231F] antialiased selection:bg-[#5A7160] selection:text-[#F2EFE9]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>

      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[#C48B5E]"
      />

      <header className="sticky top-0 z-50 border-b border-[#1C231F]/10 bg-[#F2EFE9]/90 backdrop-blur-md">
        <nav className="flex items-center justify-between px-6 py-5 sm:px-10">
          <span className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-bold uppercase tracking-tight sm:text-base">
            Herbe &amp; Harmonie
          </span>
          <div className="hidden gap-10 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase tracking-[0.18em] md:flex">
            <a href="#terroir" className="hover:text-[#5A7160]">
              Terroir
            </a>
            <a href="#methode" className="hover:text-[#5A7160]">
              Méthode
            </a>
            <a href="#essentiels" className="hover:text-[#5A7160]">
              Boutique
            </a>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase tracking-[0.18em] hover:text-[#5A7160]"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            Panier (0)
          </button>
        </nav>
      </header>

      <section className="grid grid-cols-1 items-center gap-16 px-6 pb-28 pt-12 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:pb-40 lg:pt-20">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-8 flex items-start gap-3 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase leading-relaxed tracking-[0.28em] text-[#1C231F]/70"
          >
            <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C48B5E]" />
            Domaine artisanal, Apt — Vaucluse
          </motion.p>

          <h1
            className={`font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] ${DISPLAY_XL} font-extrabold uppercase leading-[0.88] tracking-tight`}
          >
            <DisplayLine text="L'Or Vert" delay={0.1} />
            <DisplayLine text="Du Luberon" delay={0.22} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="mt-10 max-w-sm font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-base font-light leading-relaxed text-[#1C231F]/75"
          >
            Cultivé et récolté à la main sur les hauteurs d&apos;Apt, notre CBD
            porte la lumière et l&apos;ocre du Luberon dans chaque formule.
            Extraction à froid, circuit court, lot tracé.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <a
              href="#essentiels"
              className="group flex items-center gap-3 rounded-full bg-[#1C231F] px-8 py-4 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-semibold uppercase tracking-[0.16em] text-[#F2EFE9] transition-opacity duration-300 hover:opacity-85"
            >
              Découvrir la gamme
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#terroir"
              className="rounded-full border border-[#1C231F] px-8 py-4 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-semibold uppercase tracking-[0.16em] transition-colors duration-300 hover:bg-[#1C231F] hover:text-[#F2EFE9]"
            >
              Notre terroir
            </a>
          </motion.div>
        </div>

        <HeroVisual />
      </section>

      <Marquee />

      <TerroirSection />

      <ProcessSection />

      <section
        id="essentiels"
        className="scroll-mt-28 px-6 pb-28 sm:px-10 lg:pb-40"
      >
        <Reveal>
          <Eyebrow index="03" label="La gamme" />
          <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
            <h2
              className={`font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] ${DISPLAY_M} font-bold uppercase leading-[1.02] tracking-tight`}
            >
              Nos Essentiels
            </h2>
            <p className="max-w-xs font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-light leading-relaxed text-[#1C231F]/75">
              Trois formules, une seule récolte. Chaque lot est analysé et
              numéroté avant expédition.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </section>

      <Manifesto />

      <Newsletter />

      <footer className="border-t border-[#1C231F]/10 px-6 pb-12 pt-20 sm:px-10">
        <div className="grid grid-cols-2 gap-12 pb-20 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm lg:grid-cols-4">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#1C231F]/70">
              Boutique
            </p>
            <ul className="space-y-3 text-[#1C231F]/80">
              <li>Huiles</li>
              <li>Baumes</li>
              <li>Infusions</li>
              <li>Coffrets</li>
            </ul>
          </div>
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#1C231F]/70">
              Le domaine
            </p>
            <ul className="space-y-3 text-[#1C231F]/80">
              <li>Notre terroir</li>
              <li>Méthode d&apos;extraction</li>
              <li>Analyses de lot</li>
              <li>Visites à Apt</li>
            </ul>
          </div>
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#1C231F]/70">
              Aide
            </p>
            <ul className="space-y-3 text-[#1C231F]/80">
              <li>Livraison</li>
              <li>Retours</li>
              <li>Contact</li>
              <li>CGV</li>
            </ul>
          </div>
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#1C231F]/70">
              Domaine
            </p>
            <p className="leading-relaxed text-[#1C231F]/80">
              Chemin des Claparèdes
              <br />
              84400 Apt, Vaucluse
              <br />
              France
            </p>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="select-none break-words border-t border-[#1C231F]/10 pt-12 font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-[clamp(2.5rem,11vw,8rem)] font-extrabold uppercase leading-none tracking-tight text-[#1C231F]/10"
        >
          Herbe &amp; Harmonie
        </p>

        <div className="mt-12 flex flex-col gap-3 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase tracking-wider text-[#1C231F]/70 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Herbe &amp; Harmonie — Récolté et
            façonné dans le Luberon
          </span>
          <span>
            Produits conformes, THC &lt; 0,3 %. Vente interdite aux mineurs.
          </span>
        </div>
      </footer>
    </div>
  );
}
