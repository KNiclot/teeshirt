'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getProductBySlug, products, CATEGORIES_META } from '@/lib/products'
import type { Couleur, Taille } from '@/lib/products'
import { useCart } from '@/lib/cart'
import ProductCard from '@/components/ProductCard'

const COULEUR_HEX: Record<Couleur, string> = {
  noir: '#111111',
  blanc: '#F5F5F5',
  gris: '#6B7280',
}

const TAILLES: Taille[] = ['S', 'M', 'L', 'XL', 'XXL']

export default function ProduitPage() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const product = getProductBySlug(slug)
  const addItem = useCart((s) => s.addItem)

  const [couleur, setCouleur] = useState<Couleur>(
    (product?.couleurs[0] as Couleur) ?? 'noir'
  )
  const [taille, setTaille] = useState<Taille | null>(null)
  const [quantite, setQuantite] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="pt-32 text-center py-24">
        <p className="font-display text-5xl text-zinc-700">Produit introuvable</p>
        <Link href="/catalogue" className="btn-primary mt-8 inline-block">Retour au catalogue</Link>
      </div>
    )
  }

  const similaires = products
    .filter((p) => p.categorie === product.categorie && p.slug !== product.slug)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!taille) return
    addItem({
      slug: product.slug,
      titre: product.titre,
      gamme: product.gamme,
      prix: product.prix,
      couleur,
      taille,
      quantite,
      printfulId: product.printfulId,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 border-b border-[#2A2A2A] bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-xs text-zinc-600 uppercase tracking-widest font-bold">
            <Link href="/" className="hover:text-[#FFD700] transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/catalogue" className="hover:text-[#FFD700] transition-colors">Catalogue</Link>
            <span>/</span>
            <Link href={`/catalogue?cat=${product.categorie}`} className="hover:text-[#FFD700] transition-colors">
              {CATEGORIES_META[product.categorie].label}
            </Link>
            <span>/</span>
            <span className="text-zinc-400">{product.titre}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Visual */}
          <div className="sticky top-24">
            <div className="relative bg-[#0D0D0D] border border-[#2A2A2A] aspect-square flex items-center justify-center overflow-hidden group">
              {/* Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: 'radial-gradient(circle at center, rgba(255,215,0,0.05) 0%, transparent 70%)' }}
              />

              {/* T-shirt SVG */}
              <div className="relative flex flex-col items-center justify-center p-16 text-center w-full h-full">
                <svg viewBox="0 0 120 100" className="w-64 h-56 transition-colors duration-300" fill={COULEUR_HEX[couleur]}>
                  <path d="M30 5 L0 25 L15 35 L15 95 L105 95 L105 35 L120 25 L90 5 L75 15 C70 20 50 20 45 15 Z" />
                  <path d="M30 5 L0 25 L15 35 L15 95 L105 95 L105 35 L120 25 L90 5 L75 15 C70 20 50 20 45 15 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center px-12">
                  <p
                    className="font-black text-sm uppercase tracking-wider leading-tight text-center drop-shadow-lg mt-8"
                    style={{ color: couleur === 'blanc' ? '#1a1a1a' : '#ffffff', maxWidth: '200px' }}
                  >
                    {product.phrase}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.gamme === 'premium'
                  ? <span className="badge-premium">⭐ Premium</span>
                  : <span className="badge-classique">Classique</span>}
                {product.bestseller && (
                  <span className="inline-block bg-[#FF6B00] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1">
                    Best-seller
                  </span>
                )}
              </div>

              {/* Premium side accent */}
              {product.gamme === 'premium' && (
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#FFD700] to-[#FF6B00]" />
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="mb-2">
              <span className="section-subtitle">{CATEGORIES_META[product.categorie].label} · {product.metier}</span>
            </div>
            <h1 className="font-display text-5xl text-white tracking-wide leading-tight mb-4">
              {product.titre}
            </h1>
            <blockquote className="border-l-2 border-[#FFD700] pl-4 text-zinc-400 italic text-lg mb-6">
              &quot;{product.phrase}&quot;
            </blockquote>

            {/* Prix */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-display text-6xl text-white">
                {product.prix.toFixed(2).replace('.', ',')}€
              </span>
              {product.gamme === 'premium' && (
                <span className="text-zinc-500 text-sm line-through">39,90€</span>
              )}
            </div>

            {/* Couleur */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">
                Couleur — <span className="text-white capitalize">{couleur}</span>
              </p>
              <div className="flex gap-3">
                {product.couleurs.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCouleur(c as Couleur)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                      couleur === c ? 'border-[#FFD700] scale-110' : 'border-[#3A3A3A]'
                    }`}
                    style={{ backgroundColor: COULEUR_HEX[c as Couleur] }}
                    title={c}
                  />
                ))}
              </div>
            </div>

            {/* Taille */}
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">
                Taille {!taille && <span className="text-[#FF6B00]">— choisir *</span>}
              </p>
              <div className="flex gap-2 flex-wrap">
                {TAILLES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTaille(t)}
                    className={`w-14 h-14 border-2 font-bold text-sm transition-all duration-200 ${
                      taille === t
                        ? 'bg-[#FFD700] border-[#FFD700] text-black'
                        : 'border-[#2A2A2A] text-zinc-400 hover:border-[#FFD700] hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantité */}
            <div className="flex items-center gap-4 mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Quantité</p>
              <div className="flex items-center border border-[#2A2A2A]">
                <button
                  onClick={() => setQuantite(Math.max(1, quantite - 1))}
                  className="w-10 h-10 flex items-center justify-center text-white hover:bg-[#2A2A2A] transition-colors font-bold"
                >
                  −
                </button>
                <span className="w-12 text-center font-bold text-white">{quantite}</span>
                <button
                  onClick={() => setQuantite(quantite + 1)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:bg-[#2A2A2A] transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleAddToCart}
              disabled={!taille}
              className={`w-full py-5 font-black uppercase tracking-widest text-base transition-all duration-200 ${
                added
                  ? 'bg-green-500 text-white'
                  : taille
                  ? 'btn-primary w-full justify-center'
                  : 'bg-[#1a1a1a] text-zinc-600 cursor-not-allowed border border-[#2A2A2A]'
              }`}
            >
              {added ? '✓ Ajouté au panier !' : !taille ? 'Choisir une taille' : `Ajouter au panier — ${(product.prix * quantite).toFixed(2).replace('.', ',')}€`}
            </button>

            {taille && (
              <button
                onClick={() => { handleAddToCart(); router.push('/panier') }}
                className="w-full btn-secondary mt-3 py-4 text-center"
              >
                Commander maintenant
              </button>
            )}

            {/* Garanties */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#2A2A2A]">
              {[
                { icon: '🚚', label: 'Livraison 48h' },
                { icon: '🔄', label: 'Retours 30j' },
                { icon: '🔒', label: 'Paiement sécurisé' },
              ].map(({ icon, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl mb-1">{icon}</div>
                  <p className="text-zinc-600 text-xs uppercase tracking-wide font-bold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        {similaires.length > 0 && (
          <div className="mt-24">
            <div className="mb-8">
              <span className="section-subtitle">Du même métier</span>
              <h2 className="section-title mt-2">Tu pourrais aussi <span style={{ color: '#FFD700' }}>aimer</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similaires.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
