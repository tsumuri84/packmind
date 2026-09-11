'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Plus, Sun } from 'lucide-react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1469122312224-c5846569feb1?q=80&w=1200';

const PRODUCTS = [
  {
    name: 'Huile Botanique 10%',
    tag: 'RÉCOLTE 2026',
    price: '54€',
    bg: '#E8EDE4',
  },
  {
    name: 'Baume Racines',
    tag: 'TERROIR',
    price: '38€',
    bg: '#F4EEDB',
  },
  {
    name: 'Infusion Sérénité',
    tag: 'ÉDITION LIMITÉE',
    price: '24€',
    bg: '#EDE6E9',
  },
];

const MARQUEE_TEXT =
  '100% NATUREL • RÉCOLTE ARTISANALE DANS LE LUBERON • CIRCUIT COURT • ';

function LuberonVisual() {
  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="overflow-hidden rounded-t-full"
      >
        <img
          src={HERO_IMAGE}
          alt="Collines ocre du Luberon au lever du soleil"
          className="h-[420px] w-full object-cover lg:h-[620px]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        className="absolute -bottom-8 -left-6 flex items-center gap-3 border border-[#1C231F]/10 bg-[#F2EFE9] px-5 py-4 shadow-[0_20px_40px_-20px_rgba(28,35,31,0.35)] lg:-left-10"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C48B5E]">
          <MapPin className="h-4 w-4 text-[#F2EFE9]" strokeWidth={2.5} />
        </span>
        <div className="font-['Inter']">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#1C231F]">
            Récolté près d&apos;Apt
          </p>
          <p className="text-xs text-[#1C231F]/60">Vallée du Luberon, France</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
        className="absolute -top-6 -right-4 hidden h-24 w-24 items-center justify-center rounded-full bg-[#5A7160] text-center lg:flex"
      >
        <Sun className="h-8 w-8 text-[#F2EFE9]" strokeWidth={1.5} />
      </motion.div>
    </div>
  );
}

function Marquee() {
  return (
    <div className="relative overflow-hidden bg-[#1C231F] py-4">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <span
            key={i}
            className="px-4 font-['Inter'] text-sm font-medium uppercase tracking-widest text-[#F2EFE9]"
          >
            {MARQUEE_TEXT.repeat(6)}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ProductCard({
  name,
  tag,
  price,
  bg,
}: {
  name: string;
  tag: string;
  price: string;
  bg: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group flex flex-col border border-[#1C231F]/10 bg-white p-4"
    >
      <div
        className="relative mb-6 flex h-64 items-center justify-center overflow-hidden"
        style={{ backgroundColor: bg }}
      >
        <span className="absolute left-3 top-3 rounded-full bg-[#1C231F] px-3 py-1 font-['Inter'] text-[10px] font-semibold uppercase tracking-wider text-[#F2EFE9]">
          {tag}
        </span>
        <Sun
          strokeWidth={1}
          className="h-16 w-16 text-[#1C231F]/20 transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <h3 className="font-['Syne'] text-xl font-semibold uppercase tracking-tight text-[#1C231F]">
        {name}
      </h3>

      <div className="mt-6 flex items-end justify-between">
        <span className="font-['Inter'] text-lg text-[#1C231F]/80">{price}</span>
        <button
          type="button"
          className="flex items-center gap-2 border border-[#1C231F] px-4 py-2 font-['Inter'] text-xs font-semibold uppercase tracking-wider text-[#1C231F] transition-colors hover:bg-[#1C231F] hover:text-[#F2EFE9]"
        >
          Ajouter <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </motion.div>
  );
}

export default function HerbeHarmonieLanding() {
  return (
    <div className="min-h-screen bg-[#F2EFE9] text-[#1C231F]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>

      <nav className="flex items-center justify-between px-8 py-6">
        <span className="font-['Syne'] text-lg font-bold uppercase tracking-tighter">
          Herbe &amp; Harmonie
        </span>
        <div className="hidden gap-8 font-['Inter'] text-sm uppercase tracking-wide md:flex">
          <span>Boutique</span>
          <span>Notre Terroir</span>
          <span>Journal</span>
        </div>
      </nav>

      <section className="grid grid-cols-1 items-center gap-16 px-8 pb-24 pt-8 lg:grid-cols-2 lg:gap-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-['Syne'] text-[11vw] font-extrabold uppercase leading-[0.85] tracking-tighter lg:text-7xl"
          >
            L&apos;Or Vert
            <br />
            Du Luberon
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mt-8 max-w-sm font-['Inter'] text-base font-light text-[#1C231F]/70"
          >
            Cultivé et récolté à la main sur les hauteurs d&apos;Apt, notre
            CBD porte la lumière et l&apos;ocre du Luberon dans chaque
            formule. Extraction à froid, circuit court, sans compromis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              type="button"
              className="flex items-center gap-2 bg-[#1C231F] px-7 py-4 font-['Inter'] text-sm font-semibold uppercase tracking-wider text-[#F2EFE9] transition-opacity hover:opacity-85"
            >
              Découvrir la gamme <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="border border-[#1C231F] px-7 py-4 font-['Inter'] text-sm font-semibold uppercase tracking-wider text-[#1C231F] transition-colors hover:bg-[#1C231F]/5"
            >
              Notre terroir
            </button>
          </motion.div>
        </div>

        <LuberonVisual />
      </section>

      <Marquee />

      <section className="px-8 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 font-['Syne'] text-4xl font-bold uppercase tracking-tighter lg:text-6xl"
        >
          Nos Essentiels
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </section>

      <footer className="border-t border-[#1C231F]/10 px-8 py-10 font-['Inter'] text-xs uppercase tracking-wide text-[#1C231F]/60">
        © {new Date().getFullYear()} Herbe &amp; Harmonie — Récolté et
        façonné dans le Luberon, France.
      </footer>
    </div>
  );
}
