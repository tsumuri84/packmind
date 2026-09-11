'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { ArrowRight, Leaf, Plus } from 'lucide-react';

const PRODUCTS = [
  {
    name: 'Huile Botanique 10%',
    tag: 'BEST-SELLER',
    price: '54€',
    bg: '#E8EDE4',
  },
  {
    name: 'Baume Racines',
    tag: 'RELAXATION',
    price: '38€',
    bg: '#F4EEDB',
  },
  {
    name: 'Infusion Sérénité',
    tag: 'NOUVEAUTÉ',
    price: '24€',
    bg: '#EDE6E9',
  },
];

const MARQUEE_TEXT =
  '100% NATUREL • RÉCOLTE ARTISANALE • CIRCUIT COURT • EXTRACTION À FROID • ';

function OrganicGlassShape() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={0.8} />
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh scale={1.6}>
          <torusKnotGeometry args={[1, 0.34, 256, 32]} />
          <meshPhysicalMaterial
            color="#E8EFE3"
            transmission={1}
            thickness={2}
            roughness={0.1}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            ior={1.4}
          />
        </mesh>
      </Float>
      <Environment preset="studio" />
    </Canvas>
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
        <Leaf
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
  const heroRef = useRef<HTMLDivElement>(null);

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
          <span>Notre Histoire</span>
          <span>Journal</span>
        </div>
      </nav>

      <section
        ref={heroRef}
        className="grid grid-cols-1 items-center gap-12 px-8 pb-16 pt-8 lg:grid-cols-2 lg:gap-4"
      >
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-['Syne'] text-[13vw] font-extrabold uppercase leading-[0.85] tracking-tighter lg:text-8xl"
          >
            Play With
            <br />
            Your
            <br />
            Botanicals
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mt-8 max-w-sm font-['Inter'] text-base font-light text-[#1C231F]/70"
          >
            Des formules artisanales au CBD, pensées pour ramener un instant
            de calme dans le quotidien. Récolte française, extraction à
            froid, sans compromis.
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
              Notre méthode
            </button>
          </motion.div>
        </div>

        <div className="h-[380px] w-full lg:h-[560px]">
          <OrganicGlassShape />
        </div>
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
        © {new Date().getFullYear()} Herbe &amp; Harmonie — Fabriqué avec soin en France.
      </footer>
    </div>
  );
}
