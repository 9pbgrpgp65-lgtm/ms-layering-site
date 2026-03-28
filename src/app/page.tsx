"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { products, categories } from "@/data/products";
import type { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";

type NotionProduct = Product & { photoUrls: string[] };

const steps = [
  {
    number: "01",
    title: "Choisissez",
    description: "Explorez notre catalogue et sélectionnez la fragrance qui vous correspond.",
  },
  {
    number: "02",
    title: "Personnalisez",
    description: "Choisissez votre taille : roll 3ml, 30ml, 50ml ou 100ml selon vos envies.",
  },
  {
    number: "03",
    title: "Recevez",
    description: "Votre parfum est préparé avec soin et livré directement chez vous.",
  },
];

export default function Home() {
  const bestsellers = products.filter((p) => p.bestseller);
  const [photoMap, setPhotoMap] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: NotionProduct[]) => {
        const map: Record<string, string> = {};
        for (const p of data) {
          if (p.photoUrls?.length > 0) {
            map[p.slug] = p.photoUrls[0];
          }
        }
        setPhotoMap(map);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-off-white via-off-white to-black/5" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-body text-xs uppercase tracking-[0.4em] text-gold mb-8"
          >
            Premium Fragrances
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-6"
          >
            MS Layering
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-lg md:text-xl text-black/60 mb-12 max-w-xl mx-auto leading-relaxed"
          >
            Luxury inspired fragrances, made for you.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-body text-sm text-gold mb-12 tracking-wider"
          >
            + de 200 références disponibles
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link
              href="/catalogue"
              className="inline-block font-body text-sm uppercase tracking-[0.2em] border border-black px-10 py-4 hover:bg-black hover:text-off-white transition-all duration-500"
            >
              Explore Fragrances
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-black/30" />
        </motion.div>
      </section>

      {/* Concept Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-6">
              Notre Vision
            </p>
            <h2 className="font-heading text-4xl md:text-6xl font-light leading-tight mb-8">
              Discover your scent.
              <br />
              Choose your fragrance.
              <br />
              We craft it for you.
            </h2>
            <p className="font-body text-base text-black/50 max-w-lg mx-auto leading-relaxed">
              Chaque flacon MS Layering est une invitation au voyage olfactif. Nous sélectionnons les meilleures
              essences pour recréer les fragrances les plus emblématiques à un prix accessible.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4">
                Les plus demandés
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-light">
                Best Sellers
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {bestsellers.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 0.1}>
                <ProductCard product={product} photoUrl={photoMap[product.slug]} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="text-center mt-16">
              <Link
                href="/catalogue"
                className="inline-block font-body text-sm uppercase tracking-[0.2em] text-gold border-b border-gold pb-1 hover:text-black hover:border-black transition-colors duration-300"
              >
                Voir tout le catalogue
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 px-6 bg-black text-off-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4">
                Simple et élégant
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-light">
                Comment ça marche
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {steps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.15}>
                <div className="text-center">
                  <span className="font-heading text-6xl text-gold/30 block mb-6">
                    {step.number}
                  </span>
                  <h3 className="font-heading text-2xl mb-4">{step.title}</h3>
                  <p className="font-body text-sm text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4">
                Par famille olfactive
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-light">
                Nos Catégories
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.id} delay={i * 0.1}>
                <Link
                  href={`/catalogue?category=${cat.id}`}
                  className="group block"
                >
                  <div className="aspect-square bg-gradient-to-br from-black/5 to-black/10 flex items-center justify-center relative overflow-hidden hover:from-black hover:to-black transition-all duration-700">
                    <div className="text-center relative z-10">
                      <h3 className="font-heading text-2xl group-hover:text-gold transition-colors duration-500">
                        {cat.name}
                      </h3>
                      <p className="font-body text-xs text-black/40 group-hover:text-white/50 mt-2 transition-colors duration-500">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
