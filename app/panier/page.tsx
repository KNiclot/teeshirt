'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart'
import type { Couleur, Taille } from '@/lib/products'

const COULEUR_HEX: Record<string, string> = {
  noir: '#111111',
  blanc: '#F5F5F5',
  gris: '#6B7280',
}

export default function PanierPage() {
  const { items, removeItem, updateQuantite, total, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-7xl mb-6">🛒</div>
        <h1 className="font-display text-5xl text-white mb-4">Panier vide</h1>
        <p className="text-zinc-500 mb-8">Tu n'as encore rien ajouté. C'est le moment.</p>
        <Link href="/catalogue" className="btn-primary">Voir le catalogue</Link>
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <span className="section-subtitle">Récapitulatif</span>
          <h1 className="section-title mt-2">
            Mon <span style={{ color: '#FFD700' }}>panier</span>
          </h1>
          <p className="text-zinc-500 mt-2 text-sm">{itemCount()} article{itemCount() > 1 ? 's' : ''}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Articles */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.slug}-${item.couleur}-${item.taille}`}
                className="bg-[#141414] border border-[#2A2A2A] p-5 flex gap-5 group hover:border-[#3A3A3A] transition-colors"
              >
                {/* T-shirt mini visual */}
                <div className="w-20 h-20 bg-[#0D0D0D] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                  <svg viewBox="0 0 120 100" className="w-14 h-12" fill={COULEUR_HEX[item.couleur] ?? '#333'}>
                    <path d="M30 5 L0 25 L15 35 L15 95 L105 95 L105 35 L120 25 L90 5 L75 15 C70 20 50 20 45 15 Z" />
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/produit/${item.slug}`}
                        className="font-display text-xl text-white hover:text-[#FFD700] transition-colors leading-tight block"
                      >
                        {item.titre}
                      </Link>
                      <div className="flex items-center gap-3 mt-1">
                        {item.gamme === 'premium'
                          ? <span className="badge-premium text-[9px]">⭐ Premium</span>
                          : <span className="badge-classique text-[9px]">Classique</span>}
                        <span className="text-zinc-600 text-xs">
                          <span
                            className="inline-block w-3 h-3 rounded-full border border-[#3A3A3A] mr-1 align-middle"
                            style={{ backgroundColor: COULEUR_HEX[item.couleur] ?? '#888' }}
                          />
                          {item.couleur}
                        </span>
                        <span className="text-zinc-600 text-xs font-bold">{item.taille}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.slug, item.couleur as Couleur, item.taille as Taille)}
                      className="text-zinc-700 hover:text-red-500 transition-colors text-lg leading-none"
                      aria-label="Supprimer"
                    >
                      ×
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantité */}
                    <div className="flex items-center border border-[#2A2A2A]">
                      <button
                        onClick={() => updateQuantite(item.slug, item.couleur as Couleur, item.taille as Taille, item.quantite - 1)}
                        className="w-8 h-8 flex items-center justify-center text-white hover:bg-[#2A2A2A] transition-colors font-bold text-sm"
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-bold text-white text-sm">{item.quantite}</span>
                      <button
                        onClick={() => updateQuantite(item.slug, item.couleur as Couleur, item.taille as Taille, item.quantite + 1)}
                        className="w-8 h-8 flex items-center justify-center text-white hover:bg-[#2A2A2A] transition-colors font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                    {/* Prix */}
                    <div className="font-display text-2xl text-white">
                      {(item.prix * item.quantite).toFixed(2).replace('.', ',')}€
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Résumé commande */}
          <div className="lg:col-span-1">
            <div className="bg-[#141414] border border-[#2A2A2A] p-6 sticky top-24">
              <h2 className="font-display text-2xl text-white mb-6">Résumé</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-zinc-400 text-sm">
                  <span>Sous-total</span>
                  <span>{total().toFixed(2).replace('.', ',')}€</span>
                </div>
                <div className="flex justify-between text-zinc-400 text-sm">
                  <span>Livraison</span>
                  <span className={total() >= 50 ? 'text-green-400' : ''}>
                    {total() >= 50 ? 'Gratuite' : '4,90€'}
                  </span>
                </div>
                {total() < 50 && (
                  <p className="text-zinc-600 text-xs">
                    Plus que {(50 - total()).toFixed(2).replace('.', ',')}€ pour la livraison gratuite
                  </p>
                )}
              </div>

              <div className="border-t border-[#2A2A2A] pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-white uppercase tracking-widest text-sm">Total</span>
                  <span className="font-display text-4xl text-[#FFD700]">
                    {(total() + (total() >= 50 ? 0 : 4.9)).toFixed(2).replace('.', ',')}€
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full text-center block py-4">
                Passer la commande →
              </Link>
              <Link href="/catalogue" className="block text-center text-zinc-600 hover:text-zinc-400 text-xs mt-4 uppercase tracking-widest font-bold transition-colors">
                ← Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
