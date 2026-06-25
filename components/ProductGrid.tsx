import ProductCard from './ProductCard'
import type { Product } from '@/lib/products'

interface Props {
  products: Product[]
  title?: string
}

export default function ProductGrid({ products, title }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-display text-4xl text-zinc-700">Aucun produit trouvé</p>
        <p className="text-zinc-600 mt-2 text-sm">Essaie un autre filtre</p>
      </div>
    )
  }

  return (
    <div>
      {title && (
        <h2 className="font-display text-4xl text-white mb-8 tracking-wide">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </div>
  )
}
