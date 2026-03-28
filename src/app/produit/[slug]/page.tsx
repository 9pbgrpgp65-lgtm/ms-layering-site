"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products as staticProducts } from "@/data/products";
import type { Product } from "@/data/products";

type Size = "3ml" | "30ml" | "50ml" | "100ml";

type IngredientImage = {
  name: string;
  slug: string;
  imageUrl: string | null;
  category: string;
};

type NotionProduct = Product & {
  photoUrls: string[];
};

// Category fallback colors for notes without images
const categoryColors: Record<string, string> = {
  flower: "#f0d4e0",
  fruit: "#fce4cc",
  spice: "#e8cfc0",
  wood: "#d4c4a8",
  resin: "#d9cdb8",
  sweet: "#f5e6c8",
  amber: "#e8d4b0",
  musk: "#e0dcd8",
  green: "#cee0cc",
  leather: "#c8beb4",
  other: "#dcdcdc",
};

export default function ProductPage() {
  const params = useParams();
  const staticProduct = staticProducts.find((p) => p.slug === params.slug);
  const [notionProduct, setNotionProduct] = useState<NotionProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size>("50ml");
  const [ingredientImages, setIngredientImages] = useState<
    Record<string, IngredientImage>
  >({});

  useEffect(() => {
    fetch("/api/ingredients")
      .then((res) => res.json())
      .then((data: IngredientImage[]) => {
        const map: Record<string, IngredientImage> = {};
        for (const item of data) {
          map[item.name] = item;
        }
        setIngredientImages(map);
      })
      .catch(() => {});

    fetch("/api/products")
      .then((res) => res.json())
      .then((data: NotionProduct[]) => {
        const found = data.find((p) => p.slug === params.slug);
        if (found) setNotionProduct(found);
      })
      .catch(() => {});
  }, [params.slug]);

  // Merge: combine static + Notion data, keeping notes/accords/seasons from static
  const product = staticProduct || notionProduct
    ? {
        ...(staticProduct || {}),
        ...(notionProduct || {}),
        // Preserve Fragrantica data from static if Notion doesn't have it
        notes: notionProduct?.notes || staticProduct?.notes,
        accords: notionProduct?.accords || staticProduct?.accords,
        seasons: notionProduct?.seasons || staticProduct?.seasons,
      } as Product
    : null;
  const photoUrls = notionProduct?.photoUrls || [];

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
    { label: "3ml", price: product.prices["3ml"] },
    { label: "30ml", price: product.prices["30ml"] },
    { label: "50ml", price: product.prices["50ml"] },
    { label: "100ml", price: product.prices["100ml"] },
  ];

  const renderNoteIcon = (note: string) => {
    const ingredient = ingredientImages[note];
    const category = ingredient?.category || "other";
    const bgColor = categoryColors[category] || categoryColors.other;

    if (ingredient?.imageUrl) {
      return (
        <Image
          src={ingredient.imageUrl}
          alt={note}
          width={64}
          height={64}
          className="rounded-full object-cover"
        />
      );
    }

    // Fallback: first letter with category color
    return (
      <div
        className="w-full h-full rounded-full flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <span className="font-heading text-lg text-black/40">
          {note.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  };

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
            <div className="aspect-[3/4] relative bg-gradient-to-br from-black/5 to-black/10 flex items-center justify-center sticky top-28 overflow-hidden">
              {photoUrls.length > 0 ? (
                <Image
                  src={photoUrls[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="text-center">
                  <span className="font-heading text-8xl text-black/10">MS</span>
                  <p className="font-body text-xs text-black/20 mt-4 uppercase tracking-[0.3em]">
                    {product.category}
                  </p>
                </div>
              )}
            </div>
            {/* Additional photos */}
            {photoUrls.length > 1 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {photoUrls.slice(1, 4).map((url, i) => (
                  <div key={i} className="aspect-square relative overflow-hidden bg-black/5">
                    <Image
                      src={url}
                      alt={`${product.name} - ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 33vw, 17vw"
                    />
                  </div>
                ))}
              </div>
            )}
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
            <p className="font-body text-sm text-black/50 mb-12">
              {product.brand}
            </p>

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
                    {label} — {price} EGP
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <span className="font-heading text-4xl">
                {product.prices[selectedSize]} EGP
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

        {/* Fragrantica-style sections */}
        {(product.notes || product.accords || product.seasons) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-24 max-w-4xl mx-auto space-y-20"
          >
            {/* Notes Olfactives */}
            {product.notes && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="font-heading text-3xl font-light">Notes Olfactives</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {[
                    { label: "Top Notes", notes: product.notes.top },
                    { label: "Middle Notes", notes: product.notes.middle },
                    { label: "Base Notes", notes: product.notes.base },
                  ].map(({ label, notes }) => (
                    <div key={label} className="text-center">
                      <div className="flex items-center gap-3 justify-center mb-6">
                        <div className="h-px bg-black/10 flex-1" />
                        <span className="font-body text-xs uppercase tracking-[0.2em] text-black/50">
                          {label}
                        </span>
                        <div className="h-px bg-black/10 flex-1" />
                      </div>
                      <div className="flex flex-wrap gap-4 justify-center">
                        {notes.map((note) => (
                          <motion.div
                            key={note}
                            whileHover={{ scale: 1.08, y: -4 }}
                            className="flex flex-col items-center gap-2 cursor-default"
                          >
                            <div className="w-16 h-16 rounded-full overflow-hidden border border-black/[0.06] hover:border-gold/40 transition-all duration-300">
                              {renderNoteIcon(note)}
                            </div>
                            <span className="font-body text-[11px] text-black/60 max-w-[70px] leading-tight">
                              {note}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Accords */}
            {product.accords && (
              <div>
                <div className="text-center mb-10">
                  <h2 className="font-heading text-3xl font-light">Main Accords</h2>
                </div>
                <div className="max-w-md mx-auto space-y-3">
                  {product.accords.map((accord) => (
                    <div key={accord.name} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div
                          className="h-9 flex items-center px-4 transition-all duration-700"
                          style={{
                            width: `${accord.percentage}%`,
                            backgroundColor: accord.color,
                          }}
                        >
                          <span className="font-body text-sm text-white mix-blend-difference">
                            {accord.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* When to Wear */}
            {product.seasons && (
              <div>
                <div className="text-center mb-10">
                  <h2 className="font-heading text-3xl font-light">When to Wear</h2>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-6 max-w-xl mx-auto">
                  {[
                    { key: "winter" as const, label: "Winter", icon: "❄️", color: "#87CEEB" },
                    { key: "spring" as const, label: "Spring", icon: "🌿", color: "#7BC67E" },
                    { key: "summer" as const, label: "Summer", icon: "☀️", color: "#FFB347" },
                    { key: "fall" as const, label: "Fall", icon: "🍂", color: "#E8945A" },
                    { key: "day" as const, label: "Day", icon: "🌤", color: "#F4C430" },
                    { key: "night" as const, label: "Night", icon: "🌙", color: "#4A6FA5" },
                  ].map(({ key, label, icon, color }) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl mb-2">{icon}</div>
                      <p className="font-body text-xs text-black/50 mb-2">{label}</p>
                      <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${product.seasons![key]}%` }}
                          transition={{ duration: 1, delay: 0.6 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
