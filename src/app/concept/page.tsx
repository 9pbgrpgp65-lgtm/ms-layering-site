"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const processSteps = [
  {
    number: "01",
    title: "Sélection des essences",
    description:
      "Nous sourçons les meilleures huiles essentielles et absolues auprès de fournisseurs reconnus. Chaque matière première est sélectionnée pour sa qualité et sa fidélité aux fragrances originales.",
  },
  {
    number: "02",
    title: "Formulation artisanale",
    description:
      "Nos formulations sont élaborées avec précision : un mélange d'huiles de parfum concentrées et d'alcool de grade cosmétique pour une tenue et un sillage optimaux.",
  },
  {
    number: "03",
    title: "Macération",
    description:
      "Chaque fragrance repose pendant plusieurs jours pour permettre aux notes de se marier harmonieusement. Cette étape est cruciale pour obtenir un parfum rond et équilibré.",
  },
  {
    number: "04",
    title: "Embouteillage soigné",
    description:
      "Le parfum est versé dans un flacon élégant, fermé hermétiquement et emballé avec soin. Chaque détail compte pour offrir une expérience premium.",
  },
];

export default function ConceptPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-6"
          >
            Notre Histoire
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl font-light leading-tight mb-8"
          >
            Le luxe accessible.
            <br />
            Sans compromis.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-base text-black/50 max-w-xl mx-auto leading-relaxed"
          >
            MS Layering est née d&apos;une conviction simple : tout le monde mérite d&apos;accéder
            à des fragrances d&apos;exception. Nous recréons les parfums les plus iconiques
            avec des ingrédients de qualité, à une fraction du prix original.
          </motion.p>
        </div>
      </section>

      {/* Brand values */}
      <section className="px-6 py-24 bg-black text-off-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <AnimatedSection>
              <div>
                <span className="font-heading text-5xl text-gold/30 block mb-4">Q</span>
                <h3 className="font-heading text-2xl mb-4">Qualité</h3>
                <p className="font-body text-sm text-white/50 leading-relaxed">
                  Des huiles de parfum concentrées, un alcool cosmétique de premier choix.
                  Nos fragrances offrent une tenue remarquable et un sillage qui vous accompagne toute la journée.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div>
                <span className="font-heading text-5xl text-gold/30 block mb-4">A</span>
                <h3 className="font-heading text-2xl mb-4">Accessibilité</h3>
                <p className="font-body text-sm text-white/50 leading-relaxed">
                  À partir de 5€ le 30ml, nous rendons les fragrances de luxe accessibles
                  à tous. Pas de marketing superflu, pas d&apos;intermédiaires inutiles.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div>
                <span className="font-heading text-5xl text-gold/30 block mb-4">P</span>
                <h3 className="font-heading text-2xl mb-4">Passion</h3>
                <p className="font-body text-sm text-white/50 leading-relaxed">
                  Chaque fragrance est formulée avec amour et attention. Nous sommes des
                  passionnés de parfumerie et cela se ressent dans chaque flacon.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-32">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4">
                De l&apos;essence au flacon
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-light">
                Notre Processus
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-20">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.1}>
                <div className="flex gap-8 md:gap-16 items-start">
                  <span className="font-heading text-6xl md:text-8xl text-gold/20 shrink-0 leading-none">
                    {step.number}
                  </span>
                  <div className="pt-2 md:pt-4">
                    <h3 className="font-heading text-2xl md:text-3xl mb-4">{step.title}</h3>
                    <p className="font-body text-base text-black/50 leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="px-6 py-24 bg-gradient-to-b from-off-white to-black/5">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-6">
              Premium & Accessible
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light leading-tight mb-8">
              Le parfum de luxe
              <br />
              repensé pour vous.
            </h2>
            <p className="font-body text-base text-black/50 leading-relaxed mb-12">
              Nous croyons que le luxe ne devrait pas être réservé à une élite.
              En supprimant les coûts de marketing massifs et les marges excessives
              des grandes maisons, nous offrons des fragrances d&apos;une qualité
              exceptionnelle à des prix justes.
            </p>
            <Link
              href="/catalogue"
              className="inline-block font-body text-sm uppercase tracking-[0.2em] bg-black text-off-white px-10 py-4 hover:bg-gold hover:text-black transition-all duration-500"
            >
              Découvrir nos fragrances
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
