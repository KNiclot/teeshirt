'use client'

import { useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/lib/cart'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const clearCart = useCart((s) => s.clearCart)

  useEffect(() => {
    if (sessionId) clearCart()
  }, [sessionId, clearCart])

  return (
    <div className="pt-32 min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Success icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 border-2 border-[#FFD700] flex items-center justify-center animate-pulse-glow">
          <svg className="w-12 h-12 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="absolute -inset-4 border border-[#FFD700]/20 animate-ping" />
      </div>

      <span className="section-subtitle mb-4">Commande confirmée</span>
      <h1 className="font-display text-white mb-4" style={{ fontSize: 'clamp(48px, 8vw, 90px)', lineHeight: 1 }}>
        MERCI <span style={{ color: '#FFD700' }}>!</span>
      </h1>
      <p className="text-zinc-400 text-lg max-w-md mb-4 leading-relaxed">
        Ta commande est confirmée et envoyée en production. Printful va imprimer et expédier ton t-shirt directement chez toi.
      </p>
      {sessionId && (
        <p className="text-zinc-600 text-xs mb-8 font-mono">
          Session: {sessionId.slice(0, 20)}...
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full mb-12">
        {[
          { icon: '🖨️', title: 'Impression', desc: '24–48h après commande' },
          { icon: '📦', title: 'Expédition', desc: 'Depuis notre partenaire FR' },
          { icon: '🏠', title: 'Livraison', desc: '2–5 jours ouvrés' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-[#141414] border border-[#2A2A2A] p-5 text-center">
            <div className="text-3xl mb-2">{icon}</div>
            <p className="font-bold text-white text-sm uppercase tracking-widest">{title}</p>
            <p className="text-zinc-600 text-xs mt-1">{desc}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/catalogue" className="btn-primary px-10 py-4">
          Continuer mes achats
        </Link>
        <Link href="/" className="btn-secondary px-10 py-4">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-zinc-600">Chargement...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}
