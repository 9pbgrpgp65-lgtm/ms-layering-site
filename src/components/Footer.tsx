import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-off-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-3xl font-semibold mb-4">MS LAYERING</h3>
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">
              Luxury inspired fragrances, made for you. Des parfums premium accessibles,
              conçus avec passion.
            </p>
          </div>

          <div>
            <h4 className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-6">
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-white/60 hover:text-gold transition-colors">
                Accueil
              </Link>
              <Link href="/catalogue" className="text-sm text-white/60 hover:text-gold transition-colors">
                Catalogue
              </Link>
              <Link href="/concept" className="text-sm text-white/60 hover:text-gold transition-colors">
                Notre Concept
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-6">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <p>contact@mslayering.com</p>
              <p>Instagram: @mslayering</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/40 tracking-wider">
            &copy; {new Date().getFullYear()} MS Layering. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
