"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products as staticProducts } from "@/data/products";
import type { Product } from "@/data/products";

type NotionProduct = Product & { photoUrls: string[] };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [photoMap, setPhotoMap] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/catalogue", label: "Catalogue" },
    { href: "/concept", label: "Concept" },
  ];

  // Fetch product photos from Notion
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

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setQuery("");
      }
      // Ctrl+K or Cmd+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
        setQuery("");
      }
    };
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  // Search logic
  const getResults = useCallback(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const words = q.split(/\s+/);

    return staticProducts
      .filter((p) => {
        const searchable = `${p.name} ${p.brand} ${p.category}`.toLowerCase();
        return words.every((w) => searchable.includes(w));
      })
      .slice(0, 8);
  }, [query]);

  const results = getResults();

  const categoryLabels: Record<string, string> = {
    homme: "Homme",
    femme: "Femme",
    unisexe: "Unisexe",
    oud: "Oud",
    niche: "Niche",
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-off-white/90 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading text-2xl md:text-3xl font-semibold tracking-wider"
        >
          MS LAYERING
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm uppercase tracking-[0.2em] hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}

          {/* Search button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 font-body text-sm text-black/40 hover:text-black transition-colors duration-300"
            aria-label="Rechercher"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="hidden lg:inline text-xs border border-black/10 rounded px-1.5 py-0.5 text-black/30">
              Ctrl K
            </span>
          </button>
        </div>

        {/* Mobile: search + hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-black/50 hover:text-black transition-colors"
            aria-label="Rechercher"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1.5px] bg-black"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[1.5px] bg-black"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1.5px] bg-black"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-off-white border-b border-black/5"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-heading text-2xl hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />

            {/* Search panel */}
            <motion.div
              ref={searchContainerRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-0 left-0 right-0 z-50 bg-off-white shadow-2xl"
            >
              <div className="max-w-2xl mx-auto px-6 py-6">
                {/* Search input */}
                <div className="flex items-center gap-4">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-black/30 flex-shrink-0"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un parfum, une marque..."
                    className="flex-1 font-body text-lg bg-transparent outline-none placeholder:text-black/25 text-black"
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                    }}
                    className="font-body text-xs text-black/30 border border-black/10 rounded px-2 py-1 hover:text-black/60 hover:border-black/30 transition-colors"
                  >
                    ESC
                  </button>
                </div>

                {/* Divider */}
                {query.trim() && (
                  <div className="h-px bg-black/10 mt-4 mb-2" />
                )}

                {/* Results */}
                {query.trim() && (
                  <div className="max-h-[60vh] overflow-y-auto">
                    {results.length > 0 ? (
                      <div className="py-2">
                        {results.map((product, i) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15, delay: i * 0.03 }}
                          >
                            <Link
                              href={`/produit/${product.slug}`}
                              onClick={() => {
                                setSearchOpen(false);
                                setQuery("");
                              }}
                              className="flex items-center gap-4 px-2 py-3 rounded-lg hover:bg-black/[0.03] transition-colors group"
                            >
                              {/* Product photo */}
                              <div className="w-14 h-14 rounded-md overflow-hidden bg-gradient-to-br from-black/5 to-black/10 flex-shrink-0 relative">
                                {photoMap[product.slug] ? (
                                  <Image
                                    src={photoMap[product.slug]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="56px"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <span className="font-heading text-lg text-black/10">
                                      MS
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Product info */}
                              <div className="flex-1 min-w-0">
                                <p className="font-heading text-base group-hover:text-gold transition-colors truncate">
                                  {product.name}
                                </p>
                                <p className="font-body text-xs text-black/40 truncate">
                                  {product.brand}
                                </p>
                              </div>

                              {/* Category badge + price */}
                              <div className="flex-shrink-0 text-right">
                                <span className="inline-block font-body text-[10px] uppercase tracking-wider text-black/30 border border-black/10 rounded px-2 py-0.5 mb-1">
                                  {categoryLabels[product.category] ||
                                    product.category}
                                </span>
                                <p className="font-body text-sm text-black/60">
                                  {product.prices["50ml"]} EGP
                                </p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}

                        {/* View all results link */}
                        {results.length >= 8 && (
                          <Link
                            href={`/catalogue`}
                            onClick={() => {
                              setSearchOpen(false);
                              setQuery("");
                            }}
                            className="block text-center font-body text-sm text-gold hover:text-black transition-colors py-3 mt-2 border-t border-black/5"
                          >
                            Voir tout le catalogue
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="py-12 text-center">
                        <p className="font-body text-sm text-black/30">
                          Aucun resultat pour &ldquo;{query}&rdquo;
                        </p>
                        <Link
                          href="/catalogue"
                          onClick={() => {
                            setSearchOpen(false);
                            setQuery("");
                          }}
                          className="font-body text-sm text-gold hover:text-black transition-colors mt-2 inline-block"
                        >
                          Parcourir le catalogue
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Empty state hint */}
                {!query.trim() && (
                  <div className="py-8 text-center">
                    <p className="font-body text-sm text-black/20">
                      Tapez le nom d&apos;un parfum ou d&apos;une marque
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
