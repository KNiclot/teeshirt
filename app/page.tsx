import Link from 'next/link'
import { products, getBestsellers } from '@/lib/products'
import type { Categorie } from '@/lib/products'
import CategoryCard from '@/components/CategoryCard'
import ProductCard from '@/components/ProductCard'
import ScrollReveal from '@/components/ScrollReveal'

export default function Home() {
  const bestsellers = getBestsellers().slice(0, 8)
  const categories: Categorie[] = ['batiment', 'route', 'mecanique']

  return (
    <>
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(#FFD700 1px, transparent 1px), linear-gradient(90deg, #FFD700 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Radial spotlight */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }}
        />
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-1 stripe-accent opacity-80" />
        <div className="absolute top-0 left-0 w-1 h-32 stripe-accent opacity-80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 text-center">
          <div className="animate-fade-in">
            <span className="section-subtitle">Pour ceux qui construisent le monde avec leurs mains</span>
          </div>

          <h1
            className="font-display animate-fade-up delay-100 mt-4 text-white"
            style={{ fontSize: 'clamp(70px, 14vw, 160px)', lineHeight: '0.9', letterSpacing: '-0.02em' }}
          >
            T-SHIRTS
            <br />
            <span style={{ color: '#FFD700' }} className="text-glow">MÉTIERS</span>
            <br />
            BTP
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto mt-8 animate-fade-up delay-200 leading-relaxed">
            Des t-shirts qui racontent ton métier. Maçon, plombier, électricien, routier,
            mécanicien — porte ta fierté.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-up delay-300">
            <Link href="/catalogue" className="btn-primary text-base px-10 py-5">
              Voir le catalogue
            </Link>
            <Link href="/catalogue?gamme=premium" className="btn-secondary text-base px-10 py-5">
              ⭐ Gamme Premium
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-16 animate-fade-up delay-400">
            {[
              { value: '27+', label: 'Modèles' },
              { value: '3', label: 'Catégories' },
              { value: '48h', label: 'Livraison' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-4xl text-[#FFD700]">{value}</div>
                <div className="text-zinc-600 text-xs uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-500">
          <span className="text-zinc-600 text-xs uppercase tracking-widest">Découvrir</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#FFD700] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── TICKER ────────────────────────────────────── */}
      <section className="bg-[#FFD700] py-4 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="text-black font-black text-sm uppercase tracking-widest px-10">
              🔨 Classique 19,99€ &nbsp;·&nbsp; ⭐ Premium 29,90€ &nbsp;·&nbsp; Impression FR &nbsp;·&nbsp; Livraison 48h &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* ── CATÉGORIES ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <ScrollReveal>
          <div className="mb-12">
            <span className="section-subtitle">Par métier</span>
            <h2 className="section-title mt-2">
              Ton <span style={{ color: '#FFD700' }}>corps de métier</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat} delay={i * 100}>
              <CategoryCard
                categorie={cat}
                count={products.filter((p) => p.categorie === cat).length}
                index={i}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── BESTSELLERS ───────────────────────────────── */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="section-subtitle">Les plus vendus</span>
                <h2 className="section-title mt-2">
                  Best<span style={{ color: '#FF6B00' }}>sellers</span>
                </h2>
              </div>
              <Link href="/catalogue" className="btn-outline hidden md:inline-flex">Voir tout →</Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bestsellers.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 80}>
                <ProductCard product={p} index={i} />
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10 md:hidden">
            <Link href="/catalogue" className="btn-secondary">Voir tout le catalogue</Link>
          </div>
        </div>
      </section>

      {/* ── GAMMES ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="section-subtitle">Deux niveaux</span>
            <h2 className="section-title mt-2">Choisis ta <span style={{ color: '#FFD700' }}>gamme</span></h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal>
            <div className="bg-[#141414] border border-[#2A2A2A] p-8 h-full">
              <span className="badge-classique mb-4 inline-block">Classique</span>
              <div className="font-display text-6xl text-white mt-4 mb-2">19,99€</div>
              <p className="text-zinc-500 text-sm mb-8">Design simple, phrase courte, impact immédiat</p>
              <ul className="space-y-3 mb-8">
                {['"Fier d\'être Maçon"', '"Papa Électricien"', 'T-shirt qualité standard', 'Tailles S à XXL', 'Noir, blanc, gris'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-zinc-400 text-sm">
                    <span className="text-zinc-600">→</span>{item}
                  </li>
                ))}
              </ul>
              <Link href="/catalogue?gamme=classique" className="btn-outline w-full text-center block">Voir la gamme Classique</Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="relative bg-[#141414] border border-[#FFD700] p-8 h-full animate-pulse-glow">
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#FFD700] to-[#FF6B00]" />
              <div className="flex items-center gap-3 mb-4">
                <span className="badge-premium">⭐ Premium</span>
                <span className="text-[#FF6B00] text-xs font-bold uppercase tracking-widest">Le plus populaire</span>
              </div>
              <div className="font-display text-6xl text-[#FFD700] mt-4 mb-2">29,90€</div>
              <p className="text-zinc-400 text-sm mb-8">Design élaboré avec illustration du métier</p>
              <ul className="space-y-3 mb-8">
                {['"Assez fou pour être plombier..."', '"La route est mon royaume"', 'T-shirt qualité supérieure', 'Tailles S à XXL', 'Illustration exclusive du métier'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-zinc-300 text-sm">
                    <span className="text-[#FFD700]">→</span>{item}
                  </li>
                ))}
              </ul>
              <Link href="/catalogue?gamme=premium" className="btn-primary w-full text-center block">Voir la gamme Premium</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden bg-[#0D0D0D]">
        <div className="stripe-accent absolute inset-0 opacity-[0.03]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-display text-white mb-4" style={{ fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 1 }}>
              PORTE TA <span style={{ color: '#FFD700' }}>FIERTÉ</span>
            </h2>
            <p className="text-zinc-500 text-lg mb-10">Livraison en France sous 48h. Satisfaction garantie.</p>
            <Link href="/catalogue" className="btn-primary text-lg px-12 py-5">Commencer ici</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
