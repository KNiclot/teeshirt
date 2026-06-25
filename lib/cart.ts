import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Couleur, Taille } from './products'

export interface CartItem {
  slug: string
  titre: string
  gamme: 'classique' | 'premium'
  prix: number
  couleur: Couleur
  taille: Taille
  quantite: number
  printfulId: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (slug: string, couleur: Couleur, taille: Taille) => void
  updateQuantite: (slug: string, couleur: Couleur, taille: Taille, quantite: number) => void
  clearCart: () => void
  total: () => number
  itemCount: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const items = get().items
        const existing = items.find(
          (i) => i.slug === newItem.slug && i.couleur === newItem.couleur && i.taille === newItem.taille
        )
        if (existing) {
          set({
            items: items.map((i) =>
              i.slug === newItem.slug && i.couleur === newItem.couleur && i.taille === newItem.taille
                ? { ...i, quantite: i.quantite + newItem.quantite }
                : i
            ),
          })
        } else {
          set({ items: [...items, newItem] })
        }
      },
      removeItem: (slug, couleur, taille) => {
        set({ items: get().items.filter((i) => !(i.slug === slug && i.couleur === couleur && i.taille === taille)) })
      },
      updateQuantite: (slug, couleur, taille, quantite) => {
        if (quantite <= 0) {
          get().removeItem(slug, couleur, taille)
          return
        }
        set({
          items: get().items.map((i) =>
            i.slug === slug && i.couleur === couleur && i.taille === taille ? { ...i, quantite } : i
          ),
        })
      },
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.prix * i.quantite, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantite, 0),
    }),
    { name: 'cart-storage' }
  )
)
