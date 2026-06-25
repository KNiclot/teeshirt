import Link from 'next/link'
import type { Categorie } from '@/lib/products'
import { CATEGORIES_META } from '@/lib/products'

interface Props {
  categorie: Categorie
  count: number
  index: number
}

const BG_PATTERNS: Record<string, string> = {
  batiment: 'from-zinc-900 to-zinc-950',
  route: 'from-zinc-900 to-zinc-950',
  mecanique: 'from-zinc-900 to-zinc-950',
}

const ACCENT_COLORS: Record<string, string> = {
  batiment: '#FFD700',
  route: '#FF6B00',
  mecanique: '#FFD700',
}

export default function CategoryCard({ categorie, count, index }: Props) {
  const meta = CATEGORIES_META[categorie]
  const accent = ACCENT_COLORS[categorie]

  return (
    <Link href={`/catalogue?cat=${categorie}`} className="group block">
      <div
        className={`relative overflow-hidden border border-[#2A2A2A] bg-gradient-to-br ${BG_PATTERNS[categorie]} h-72 flex flex-col justify-end p-6 transition-all duration-500 group-hover:border-opacity-0`}
        style={{
          ['--accent' as string]: accent,
        }}
      >
        {/* Hover border glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `inset 0 0 0 1px ${accent}, 0 0 40px ${accent}22`,
          }}
        />

        {/* Background emoji/icon — large, faded */}
        <div className="absolute top-4 right-4 text-8xl opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 select-none">
          {meta.emoji}
        </div>

        {/* Diagonal stripe accent top */}
        <div
          className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-1.5"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        />

        {/* Content */}
        <div className="relative z-10">
          <span className="text-4xl mb-3 block">{meta.emoji}</span>
          <h3
            className="font-display text-4xl text-white tracking-wide leading-none mb-2 group-hover:transition-colors duration-200"
            style={{ ['color' as string]: 'white' }}
          >
            <span className="group-hover:text-[var(--accent)] transition-colors duration-200">
              {meta.label}
            </span>
          </h3>
          <p className="text-zinc-500 text-xs mb-3">{meta.description}</p>
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: accent }}
            >
              {count} modèles
            </span>
            <span className="text-zinc-700">·</span>
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors duration-200">
              Voir →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
