'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, total } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const frais = total() >= 50 ? 0 : 4.9
  const totalFinal = total() + frais

  const handleCheckout = async () => {
    if (items.length === 0) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error ?? 'Erreur lors de la création de la session de paiement.')
      }
    } catch {
      setError('Erreur réseau. Vérifie ta connexion.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display text-5xl text-white mb-4">Panier vide</h1>
        <Link href="/catalogue" className="btn-primary mt-4">Voir le catalogue</Link>
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <span className="section-subtitle">Finaliser</span>
          <h1 className="section-title mt-2">
            Votre <span style={{ color: '#FFD700' }}>commande</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Récapitulatif */}
          <div>
            <h2 className="font-display text-2xl text-white mb-6">Articles ({items.length})</h2>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div
                  key={`${item.slug}-${item.couleur}-${item.taille}`}
                  className="flex items-center justify-between bg-[#141414] border border-[#2A2A2A] p-4"
                >
                  <div>
                    <p className="font-bold text-white text-sm">{item.titre}</p>
                    <p className="text-zinc-600 text-xs mt-0.5">
                      {item.couleur} · {item.taille} · ×{item.quantite}
                    </p>
                  </div>
                  <span className="font-display text-xl text-white">
                    {(item.prix * item.quantite).toFixed(2).replace('.', ',')}€
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-[#141414] border border-[#2A2A2A] p-5 space-y-3">
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Sous-total</span>
                <span>{total().toFixed(2).replace('.', ',')}€</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Livraison</span>
                <span className={frais === 0 ? 'text-green-400' : ''}>{frais === 0 ? 'Gratuite' : `${frais.toFixed(2).replace('.', ',')}€`}</span>
              </div>
              <div className="border-t border-[#2A2A2A] pt-3 flex justify-between items-baseline">
                <span className="font-bold text-white uppercase tracking-widest text-sm">Total TTC</span>
                <span className="font-display text-4xl text-[#FFD700]">
                  {totalFinal.toFixed(2).replace('.', ',')}€
                </span>
              </div>
            </div>
          </div>

          {/* Paiement */}
          <div>
            <h2 className="font-display text-2xl text-white mb-6">Paiement sécurisé</h2>

            <div className="bg-[#141414] border border-[#2A2A2A] p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#FFD700] flex items-center justify-center">
                  <span className="text-black text-xs font-black">🔒</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Paiement via Stripe</p>
                  <p className="text-zinc-600 text-xs">Cryptage SSL 256-bit · PCI DSS</p>
                </div>
              </div>

              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                Tu seras redirigé vers la page de paiement sécurisée Stripe. Carte bancaire, Apple Pay et Google Pay acceptés.
              </p>

              <div className="flex gap-2 mb-6">
                {['Visa', 'MC', 'Amex', 'Apple Pay'].map((p) => (
                  <span key={p} className="border border-[#2A2A2A] text-zinc-500 text-[10px] font-bold px-2 py-1">
                    {p}
                  </span>
                ))}
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-800 text-red-400 text-sm p-3 mb-4">
                  {error}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className={`btn-primary w-full py-5 text-base justify-center ${loading ? 'opacity-70 cursor-wait' : ''}`}
              >
                {loading ? 'Redirection...' : `Payer ${totalFinal.toFixed(2).replace('.', ',')}€ →`}
              </button>
            </div>

            <div className="flex items-center gap-3 text-zinc-600 text-xs">
              <span>🚚</span>
              <span>Expédition par Printful sous 2–4 jours ouvrés. Livraison en France sous 48h.</span>
            </div>

            <Link href="/panier" className="block text-center text-zinc-600 hover:text-zinc-400 text-xs mt-4 uppercase tracking-widest font-bold transition-colors">
              ← Modifier le panier
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
