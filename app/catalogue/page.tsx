'use client'

import { useState, useMemo } from 'react'
import { products } from '@/lib/products'
import type { Categorie, Gamme } from '@/lib/products'
import { CATEGORIES_META } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function CatalogueContent() {
  const searchParams = useSearchParams()
  const initCat = searchParams.get('cat') as Categorie | null
  const initGamme = searchParams.get('gamme') as Gamme | null

  const [activeCat, setActiveCat] = useState<Categorie | 'all'>(initCat ?? 'all')
  const [activeGamme, setActiveGamme] = useState<Gamme | 'all'>(initGamme ?? 'all')
  const [sort, setSort] = useState<'default' | 'prix-asc' | 'prix-desc'>('default')

  const filtered = useMemo(() => {
    let list = products
    if (activeCat !== 'all') list = list.filter((p) => p.categorie === activeCat)
    if (activeGamme !== 'all') list = list.filter((p) => p.gamme === activeGamme)
    if (sort === 'prix-asc') list = [...list].sort((a, b) => a.prix - b.prix)
    if (sort === 'prix-desc') list = [...list].sort((a, b) => b.prix - a.prix)
    return list
  }, [activeCat, activeGamme, sort])

  return (
    <>
      {/* Header */}
      <div className="pt-24 pb-12 bg-[#0D0D0D] border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-subtitle">Tous les modèles</span>
          <h1 className="section-title mt-2">
            Catalogue <span style={{ color: '#FFD700' }}>complet</span>
          </h1>
          <p className="text-zinc-500 mt-3 text-sm">
            {filtered.length} modèle{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10 pb-6 border-b border-[#2A2A2A]">
          {/* Catégorie */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCat('all')}
              className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border transition-all duration-200 ${
                activeCat === 'all'
                  ? 'bg-[#FFD700] text-black border-[#FFD700]'
                  : 'border-[#2A2A2A] text-zinc-400 hover:border-[#FFD700] hover:text-[#FFD700]'
              }`}
            >
              Tous
            </button>
            {(['batiment', 'route', 'mecanique'] as Categorie[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border transition-all duration-200 ${
                  activeCat === cat
                    ? 'bg-[#FFD700] text-black border-[#FFD700]'
                    : 'border-[#2A2A2A] text-zinc-400 hover:border-[#FFD700] hover:text-[#FFD700]'
                }`}
              >
                {CATEGORIES_META[cat].emoji} {CATEGORIES_META[cat].label}
              </button>
            ))}
          </div>

          <div className="w-px h-8 bg-[#2A2A2A] self-center hidden md:block" />

          {/* Gamme */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'classique', 'premium'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setActiveGamme(g)}
                className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border transition-all duration-200 ${
                  activeGamme === g
                    ? g === 'premium'
                      ? 'bg-[#FFD700] text-black border-[#FFD700]'
                      : 'bg-white text-black border-white'
                    : 'border-[#2A2A2A] text-zinc-400 hover:border-zinc-500 hover:text-white'
                }`}
              >
                {g === 'all' ? 'Toutes gammes' : g === 'premium' ? '⭐ Premium' : 'Classique'}
              </button>
            ))}
          </div>

          <div className="ml-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-[#141414] border border-[#2A2A2A] text-zinc-400 text-xs font-bold uppercase tracking-widest px-4 py-2 focus:border-[#FFD700] focus:outline-none"
            >
              <option value="default">Tri par défaut</option>
              <option value="prix-asc">Prix croissant</option>
              <option value="prix-desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-4xl text-zinc-700">Aucun produit</p>
            <button
              onClick={() => { setActiveCat('all'); setActiveGamme('all') }}
              className="btn-outline mt-6"
            >
              Effacer les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default function CataloguePage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-zinc-600">Chargement...</div>}>
      <CatalogueContent />
    </Suspense>
  )
}
