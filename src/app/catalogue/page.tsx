"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4">
              Collection complète
            </p>
            <h1 className="font-heading text-5xl md:text-7xl font-light mb-4">
              Catalogue
            </h1>
            <p className="font-body text-base text-black/50 max-w-md mx-auto">
              Explorez nos fragrances inspirées des plus grandes maisons de parfumerie.
            </p>
          </div>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <button
              onClick={() => setActiveCategory("all")}
              className={`font-body text-xs uppercase tracking-[0.15em] px-6 py-3 transition-all duration-300 ${
                activeCategory === "all"
                  ? "bg-black text-off-white"
                  : "bg-transparent border border-black/20 text-black/60 hover:border-black"
              }`}
            >
              Tous
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`font-body text-xs uppercase tracking-[0.15em] px-6 py-3 transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-black text-off-white"
                    : "bg-transparent border border-black/20 text-black/60 hover:border-black"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
        >
          {filtered.map((product, i) => (
            <AnimatedSection key={product.id} delay={i * 0.05}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center font-body text-black/40 py-20">
            Aucun produit dans cette catégorie pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense
      fallback={
        <div className="pt-28 pb-24 px-6 min-h-screen flex items-center justify-center">
          <p className="font-body text-sm text-black/40">Chargement...</p>
        </div>
      }
    >
      <CatalogueContent />
    </Suspense>
  );
}
