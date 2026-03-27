"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/data/products";

type Size = "30ml" | "50ml" | "100ml";

export default function ProductPage() {
  const params = useParams();
  const product = products.find((p) => p.slug === params.slug);
  const [selectedSize, setSelectedSize] = useState<Size>("50ml");

  if (!product) {
    return (
      <div className="pt-28 pb-24 px-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl mb-4">Produit introuvable</h1>
          <Link href="/catalogue" className="font-body text-sm text-gold underline">
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  const sizes: { label: Size; price: number }[] = [
    { label: "30ml", price: product.prices["30ml"] },
    { label: "50ml", price: product.prices["50ml"] },
    { label: "100ml", price: product.prices["100ml"] },
  ];

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <div className="font-body text-xs text-black/40 flex gap-2">
            <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/catalogue" className="hover:text-gold transition-colors">Catalogue</Link>
            <span>/</span>
            <span className="text-black/60">{product.name}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-black/5 to-black/10 flex items-center justify-center sticky top-28">
              <div className="text-center">
                <span className="font-heading text-8xl text-black/10">MS</span>
                <p className="font-body text-xs text-black/20 mt-4 uppercase tracking-[0.3em]">
                  {product.category}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4">
              {product.category}
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-light mb-3">
              {product.name}
            </h1>
            <p className="font-body text-sm text-black/50 mb-8">
              Inspiré de <span className="text-black/70">{product.inspiration}</span> — {product.brand}
            </p>

            <p className="font-body text-base text-black/60 leading-relaxed mb-12">
              {product.description}
            </p>

            {/* Notes */}
            <div className="mb-12">
              <h3 className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-6">
                Notes Olfactives
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-black/40 mb-3">
                    Tête
                  </p>
                  {product.notes.top.map((note) => (
                    <p key={note} className="font-body text-sm text-black/70 mb-1">
                      {note}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-black/40 mb-3">
                    Coeur
                  </p>
                  {product.notes.heart.map((note) => (
                    <p key={note} className="font-body text-sm text-black/70 mb-1">
                      {note}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-black/40 mb-3">
                    Fond
                  </p>
                  {product.notes.base.map((note) => (
                    <p key={note} className="font-body text-sm text-black/70 mb-1">
                      {note}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-8">
              <h3 className="font-body text-xs uppercase tracking-[0.2em] text-black/40 mb-4">
                Taille
              </h3>
              <div className="flex gap-3">
                {sizes.map(({ label, price }) => (
                  <button
                    key={label}
                    onClick={() => setSelectedSize(label)}
                    className={`font-body text-sm px-6 py-4 transition-all duration-300 ${
                      selectedSize === label
                        ? "bg-black text-off-white"
                        : "border border-black/20 text-black/60 hover:border-black"
                    }`}
                  >
                    {label} — {price}€
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <span className="font-heading text-4xl">
                {product.prices[selectedSize]}€
              </span>
            </div>

            {/* Add to cart */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-black text-off-white font-body text-sm uppercase tracking-[0.2em] py-5 hover:bg-gold hover:text-black transition-colors duration-500"
            >
              Ajouter au panier
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
