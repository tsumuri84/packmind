'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Droplets,
  FlaskConical,
  MapPin,
  Package,
  Plus,
  ShoppingBag,
  Sprout,
  Sun,
} from 'lucide-react';

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1469122312224-c5846569feb1?q=80&w=1400',
  terroir:
    'https://images.unsplash.com/photo-1469122312224-c5846569feb1?q=80&w=900&h=1200&fit=crop&crop=entropy',
  field:
    'https://images.unsplash.com/photo-1469122312224-c5846569feb1?q=80&w=900&h=700&fit=crop&crop=top',
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
    Icon: Sprout,
  },
  {
    step: '02',
    title: 'Récolte manuelle',
    detail:
      'Coupe sélective à la serpette, fleur par fleur, entre septembre et octobre.',
    Icon: Sun,
  },
  {
    step: '03',
    title: 'Extraction à froid',
    detail:
      'CO₂ supercritique sous 18 °C pour préserver terpènes et cannabinoïdes.',
    Icon: FlaskConical,
  },
  {
    step: '04',
    title: 'Mise en flacon',
    detail:
      'Conditionnement en verre ambré, numéroté par lot et analysé en laboratoire.',
    Icon: Package,
  },
];

const PRODUCTS = [
  {
    name: 'Huile Botanique 10%',
    origin: 'Parcelle des Claparèdes',
    tag: 'RÉCOLTE 2026',
    price: '54€',
    volume: '30 ml',
    bg: '#E8EDE4',
    Icon: Droplets,
  },
  {
    name: 'Baume Racines',
    origin: 'Plateau de Sault',
    tag: 'TERROIR',
    price: '38€',
    volume: '50 ml',
    bg: '#F4EEDB',
    Icon: Sprout,
  },
  {
    name: 'Infusion Sérénité',
    origin: 'Vallon de Roussillon',
    tag: 'ÉDITION LIMITÉE',
    price: '24€',
    volume: '80 g',
    bg: '#EDE6E9',
    Icon: Sun,
  },
];

const MARQUEE_TEXT =
  '100% NATUREL • RÉCOLTE ARTISANALE DANS LE LUBERON • CIRCUIT COURT • ';

const EASE = [0.22, 1, 0.36, 1] as const;

function DisplayLine({ text, delay }: { text: string; delay: number }) {
  const reduce = useReducedMotion();

  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
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

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 flex items-center gap-4 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase tracking-[0.28em] text-[#1C231F]/50">
      <span className="text-[#C48B5E]">{index}</span>
      <span className="h-px w-12 bg-[#1C231F]/20" />
      <span>{title}</span>
    </div>
  );
}

function HarvestSeal() {
  const reduce = useReducedMotion();

  return (
    <div className="relative h-28 w-28 rounded-full bg-[#5A7160] lg:h-32 lg:w-32">
      <motion.svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
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
        className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-[#F2EFE9]"
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
  const arch = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -60]);
  const inset = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-20, 50]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={{ y: arch }}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: EASE }}
        className="overflow-hidden rounded-t-[999px] border border-[#1C231F]/10"
      >
        <img
          src={IMAGES.hero}
          alt="Collines ocre du Luberon au lever du soleil"
          className="h-[380px] w-full object-cover sm:h-[480px] lg:h-[660px]"
        />
      </motion.div>

      <motion.div
        style={{ y: inset }}
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.55, ease: EASE }}
        className="absolute -bottom-10 -left-4 hidden w-44 overflow-hidden border-[6px] border-[#F2EFE9] sm:block lg:-left-12 lg:w-56"
      >
        <img
          src={IMAGES.field}
          alt="Rangs de culture en terrasses près d'Apt"
          className="h-36 w-full object-cover lg:h-44"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
        className="absolute right-0 top-6 lg:-right-8 lg:top-8"
      >
        <HarvestSeal />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
        className="absolute -bottom-6 right-0 flex items-center gap-3 border border-[#1C231F]/10 bg-[#F2EFE9] px-5 py-4 lg:-bottom-8 lg:right-6"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C48B5E]">
          <MapPin className="h-4 w-4 text-[#F2EFE9]" strokeWidth={2.4} />
        </span>
        <div className="font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] leading-tight">
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">
            Récolté près d&apos;Apt
          </p>
          <p className="mt-1 text-xs text-[#1C231F]/55">Vaucluse, France</p>
        </div>
      </motion.div>
    </div>
  );
}

function Marquee() {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-hidden border-y border-[#1C231F] bg-[#1C231F] py-4">
      <motion.div
        className="flex w-max whitespace-nowrap"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 1].map((block) => (
          <span
            key={block}
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
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);

  return (
    <section
      ref={ref}
      className="grid grid-cols-1 items-center gap-14 px-6 py-24 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:py-32"
    >
      <div className="lg:col-span-5">
        <motion.div style={{ y }} className="overflow-hidden">
          <img
            src={IMAGES.terroir}
            alt="Sols ocre et végétation sèche du plateau du Luberon"
            className="h-[420px] w-full object-cover lg:h-[560px]"
          />
        </motion.div>
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        <SectionLabel index="01" title="Le terroir" />

        <Reveal>
          <h2 className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-[11vw] font-extrabold uppercase leading-[0.85] tracking-tighter sm:text-6xl lg:text-[4.5rem]">
            Une terre
            <br />
            <span className="text-[#5A7160]">qui donne</span> le ton
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-md font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-base font-light leading-relaxed text-[#1C231F]/70">
            L&apos;ocre du Luberon retient la chaleur et la restitue la nuit.
            Nos plants poussent lentement, concentrent leurs terpènes, et
            donnent une matière première dense, résineuse, impossible à
            obtenir en culture forcée.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-[#1C231F]/10 pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-3xl font-bold tracking-tighter lg:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-2 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase leading-snug tracking-wider text-[#1C231F]/50">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="px-6 pb-24 sm:px-10 lg:pb-32">
      <SectionLabel index="02" title="Du champ au flacon" />

      <div className="border-t border-[#1C231F]/15">
        {PROCESS.map(({ step, title, detail, Icon }, index) => (
          <Reveal key={step} delay={index * 0.06}>
            <div className="group grid grid-cols-1 items-start gap-4 border-b border-[#1C231F]/15 py-8 transition-colors duration-500 hover:bg-[#1C231F]/[0.03] sm:grid-cols-12 sm:items-center sm:gap-8">
              <span className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-bold tracking-widest text-[#C48B5E] sm:col-span-1">
                {step}
              </span>
              <h3 className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-2xl font-semibold uppercase tracking-tight sm:col-span-4 lg:text-3xl">
                {title}
              </h3>
              <p className="font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-light leading-relaxed text-[#1C231F]/65 sm:col-span-6">
                {detail}
              </p>
              <span className="sm:col-span-1 sm:justify-self-end">
                <Icon
                  strokeWidth={1.3}
                  className="h-7 w-7 text-[#1C231F]/30 transition-all duration-500 group-hover:text-[#5A7160]"
                />
              </span>
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
  const { name, origin, tag, price, volume, bg, Icon } = product;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="group flex h-full flex-col border border-[#1C231F]/10 bg-white/70 p-4 transition-colors duration-500 hover:border-[#1C231F]/30">
        <div
          className="relative mb-6 flex h-72 items-center justify-center overflow-hidden"
          style={{ backgroundColor: bg }}
        >
          <span className="absolute left-3 top-3 rounded-full bg-[#1C231F] px-3 py-1 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F2EFE9]">
            {tag}
          </span>
          <span className="absolute right-3 top-3 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-[10px] uppercase tracking-[0.16em] text-[#1C231F]/40">
            {volume}
          </span>
          <Icon
            strokeWidth={0.9}
            className="h-20 w-20 text-[#1C231F]/25 transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>

        <h3 className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-xl font-semibold uppercase leading-tight tracking-tight">
          {name}
        </h3>
        <p className="mt-2 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase tracking-[0.16em] text-[#1C231F]/45">
          {origin}
        </p>

        <div className="mt-auto flex items-end justify-between pt-8">
          <span className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-2xl font-bold tracking-tight">
            {price}
          </span>
          <button
            type="button"
            className="flex items-center gap-2 border border-[#1C231F] px-4 py-2.5 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-300 hover:bg-[#1C231F] hover:text-[#F2EFE9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A7160]"
          >
            Ajouter <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
          </button>
        </div>
      </article>
    </Reveal>
  );
}

function Manifesto() {
  return (
    <section className="bg-[#1C231F] px-6 py-24 text-[#F2EFE9] sm:px-10 lg:py-32">
      <Reveal>
        <p className="font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase tracking-[0.28em] text-[#F2EFE9]/45">
          Manifeste
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <blockquote className="mt-10 max-w-4xl font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-[8vw] font-bold uppercase leading-[0.92] tracking-tighter sm:text-5xl lg:text-6xl">
          Nous ne vendons pas du CBD. Nous mettons en flacon{' '}
          <span className="text-[#C48B5E]">un versant du Luberon</span>, une
          saison, et le travail de six paires de mains.
        </blockquote>
      </Reveal>
      <Reveal delay={0.2}>
        <footer className="mt-12 flex items-center gap-4 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm text-[#F2EFE9]/60">
          <span className="h-px w-10 bg-[#F2EFE9]/30" />
          Camille Roux, fondatrice et productrice
        </footer>
      </Reveal>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:py-32">
      <div className="grid grid-cols-1 gap-12 border border-[#1C231F]/15 p-8 lg:grid-cols-2 lg:p-14">
        <Reveal>
          <h2 className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-[10vw] font-extrabold uppercase leading-[0.85] tracking-tighter sm:text-5xl lg:text-[3.5rem]">
            Carnet
            <br />
            de récolte
          </h2>
          <p className="mt-6 max-w-sm font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-light leading-relaxed text-[#1C231F]/65">
            Une lettre par saison : l&apos;avancée des parcelles, les analyses
            de lot, et l&apos;ouverture des ventes en avant-première.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex items-end">
          <form
            className="w-full"
            onSubmit={(event) => event.preventDefault()}
          >
            <label
              htmlFor="newsletter-email"
              className="font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase tracking-[0.2em] text-[#1C231F]/50"
            >
              Votre adresse e-mail
            </label>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="camille@domaine.fr"
                className="w-full border-b border-[#1C231F]/30 bg-transparent pb-3 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-base placeholder:text-[#1C231F]/30 focus:border-[#5A7160] focus:outline-none"
              />
              <button
                type="submit"
                className="flex shrink-0 items-center justify-center gap-2 bg-[#1C231F] px-7 py-4 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-semibold uppercase tracking-[0.16em] text-[#F2EFE9] transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A7160]"
              >
                S&apos;inscrire <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
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

      <header className="sticky top-0 z-50 border-b border-[#1C231F]/10 bg-[#F2EFE9]/85 backdrop-blur-md">
        <nav className="flex items-center justify-between px-6 py-5 sm:px-10">
          <span className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-base font-bold uppercase tracking-tighter">
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
            <ShoppingBag className="h-4 w-4" strokeWidth={1.6} />
            Panier (0)
          </button>
        </nav>
      </header>

      <section className="grid grid-cols-1 items-center gap-20 px-6 pb-28 pt-12 sm:px-10 lg:grid-cols-2 lg:gap-14 lg:pb-32 lg:pt-16">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-8 flex items-center gap-3 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase tracking-[0.28em] text-[#1C231F]/50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#C48B5E]" />
            Domaine artisanal, Apt — Vaucluse
          </motion.p>

          <h1 className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-[14vw] font-extrabold uppercase leading-[0.85] tracking-tighter sm:text-[11vw] lg:text-[5.5rem]">
            <DisplayLine text="L'Or Vert" delay={0.1} />
            <DisplayLine text="Du Luberon" delay={0.22} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="mt-10 max-w-sm font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-base font-light leading-relaxed text-[#1C231F]/70"
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
              className="group flex items-center gap-3 bg-[#1C231F] px-8 py-4 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-semibold uppercase tracking-[0.16em] text-[#F2EFE9] transition-opacity duration-300 hover:opacity-85"
            >
              Découvrir la gamme
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#terroir"
              className="border border-[#1C231F] px-8 py-4 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-semibold uppercase tracking-[0.16em] transition-colors duration-300 hover:bg-[#1C231F]/5"
            >
              Notre terroir
            </a>
          </motion.div>
        </div>

        <HeroVisual />
      </section>

      <Marquee />

      <div id="terroir">
        <TerroirSection />
      </div>

      <div id="methode">
        <ProcessSection />
      </div>

      <section id="essentiels" className="px-6 pb-28 sm:px-10 lg:pb-32">
        <SectionLabel index="03" title="La gamme" />

        <Reveal>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-[12vw] font-extrabold uppercase leading-[0.85] tracking-tighter sm:text-6xl lg:text-[4.5rem]">
              Nos Essentiels
            </h2>
            <p className="max-w-xs font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm font-light text-[#1C231F]/60">
              Trois formules, une seule récolte. Chaque lot est analysé et
              numéroté avant expédition.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </section>

      <Manifesto />

      <Newsletter />

      <footer className="border-t border-[#1C231F]/10 px-6 pb-12 pt-16 sm:px-10">
        <div className="grid grid-cols-2 gap-10 pb-16 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-sm lg:grid-cols-4">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#1C231F]/45">
              Boutique
            </p>
            <ul className="space-y-3 text-[#1C231F]/75">
              <li>Huiles</li>
              <li>Baumes</li>
              <li>Infusions</li>
              <li>Coffrets</li>
            </ul>
          </div>
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#1C231F]/45">
              Le domaine
            </p>
            <ul className="space-y-3 text-[#1C231F]/75">
              <li>Notre terroir</li>
              <li>Méthode d&apos;extraction</li>
              <li>Analyses de lot</li>
              <li>Visites à Apt</li>
            </ul>
          </div>
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#1C231F]/45">
              Aide
            </p>
            <ul className="space-y-3 text-[#1C231F]/75">
              <li>Livraison</li>
              <li>Retours</li>
              <li>Contact</li>
              <li>CGV</li>
            </ul>
          </div>
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#1C231F]/45">
              Domaine
            </p>
            <p className="leading-relaxed text-[#1C231F]/75">
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
          className="select-none border-t border-[#1C231F]/10 pt-10 font-['Syne',_ui-sans-serif,_system-ui,_sans-serif] text-[13vw] font-extrabold uppercase leading-none tracking-tighter text-[#1C231F]/10"
        >
          Herbe &amp; Harmonie
        </p>

        <div className="mt-10 flex flex-col gap-3 font-['Inter',_ui-sans-serif,_system-ui,_sans-serif] text-xs uppercase tracking-wider text-[#1C231F]/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Herbe &amp; Harmonie — Récolté et
            façonné dans le Luberon
          </span>
          <span>Produits conformes, THC &lt; 0,3 %. Vente interdite aux mineurs.</span>
        </div>
      </footer>
    </div>
  );
}
