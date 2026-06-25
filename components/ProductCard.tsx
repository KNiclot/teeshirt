'use client'

import Link from 'next/link'
import type { Product } from '@/lib/products'

const COULEUR_HEX: Record<string, string> = {
  noir: '#111111',
  blanc: '#F5F5F5',
  gris: '#6B7280',
}

interface Props {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: Props) {
  return (
    <Link href={`/produit/${product.slug}`} className="block group">
      <div
        className="card-product relative overflow-hidden"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.gamme === 'premium' ? (
            <span className="badge-premium animate-bounce-badge">⭐ Premium</span>
          ) : (
            <span className="badge-classique">Classique</span>
          )}
          {product.bestseller && (
            <span className="inline-block bg-[#FF6B00] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1">
              Best-seller
            </span>
          )}
        </div>

        {/* T-shirt visual */}
        <div className="relative h-56 bg-[#0f0f0f] flex items-center justify-center overflow-hidden">
          {/* Glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FFD700]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* T-shirt illustration */}
          <div className="relative flex flex-col items-center justify-center p-6 text-center">
            {/* SVG t-shirt silhouette */}
            <svg
              viewBox="0 0 120 100"
              className="w-28 h-24 text-zinc-800 group-hover:text-zinc-700 transition-colors duration-300"
              fill="currentColor"
            >
              <path d="M30 5 L0 25 L15 35 L15 95 L105 95 L105 35 L120 25 L90 5 L75 15 C70 20 50 20 45 15 Z" />
            </svg>
            {/* Phrase on shirt */}
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <p className="text-white font-black text-[10px] uppercase tracking-wider leading-tight text-center drop-shadow-lg line-clamp-3 mt-4">
                {product.phrase}
              </p>
            </div>
          </div>

          {/* Hover glow line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#FFD700] scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-display text-xl text-white tracking-wide leading-tight group-hover:text-[#FFD700] transition-colors duration-200 mb-1">
            {product.titre}
          </h3>
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">
            {product.metier}
          </p>

          {/* Couleurs */}
          <div className="flex gap-1.5 mb-4">
            {product.couleurs.map((c) => (
              <div
                key={c}
                className="w-4 h-4 rounded-full border border-[#3A3A3A] transition-transform hover:scale-125"
                style={{ backgroundColor: COULEUR_HEX[c] ?? '#888' }}
                title={c}
              />
            ))}
          </div>

          {/* Prix + CTA */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-display text-3xl text-white">
                {product.prix.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-zinc-500 text-sm ml-1">€</span>
            </div>
            <div className="btn-outline text-[10px] px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
              Voir
            </div>
          </div>
        </div>

        {/* Premium side accent */}
        {product.gamme === 'premium' && (
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#FFD700] to-[#FF6B00]" />
        )}
      </div>
    </Link>
  )
}
