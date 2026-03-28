"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/data/products";

export default function ProductCard({ product, photoUrl }: { product: Product; photoUrl?: string }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/produit/${product.slug}`} className="group block">
        <div className="aspect-[3/4] bg-gradient-to-br from-black/5 to-black/10 rounded-sm mb-4 overflow-hidden relative">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="font-heading text-4xl text-black/10 group-hover:text-gold/30 transition-colors duration-500">
                  MS
                </span>
              </div>
            </div>
          )}
          {product.bestseller && (
            <div className="absolute top-3 left-3">
              <span className="bg-gold text-black text-[10px] uppercase tracking-[0.15em] px-3 py-1 font-body font-medium">
                Best-seller
              </span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <h3 className="font-heading text-xl mb-1 group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>
        <p className="font-body text-xs text-black/50 uppercase tracking-wider mb-2">
          {product.brand}
        </p>
        <div className="flex gap-3 font-body text-sm">
          <span className="text-black/40">30ml <span className="text-black">{product.prices["30ml"]} EGP</span></span>
          <span className="text-black/40">50ml <span className="text-black">{product.prices["50ml"]} EGP</span></span>
          <span className="text-black/40">100ml <span className="text-black">{product.prices["100ml"]} EGP</span></span>
        </div>
      </Link>
    </motion.div>
  );
}
