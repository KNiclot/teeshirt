import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import type { CartItem } from '@/lib/cart'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2026-06-24.dahlia' as const,
})

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      locale: 'fr',
      line_items: items.map((item) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.titre,
            description: `Couleur: ${item.couleur} · Taille: ${item.taille} · Gamme: ${item.gamme}`,
            metadata: {
              slug: item.slug,
              printfulId: item.printfulId,
              couleur: item.couleur,
              taille: item.taille,
              gamme: item.gamme,
            },
          },
          unit_amount: Math.round(item.prix * 100),
        },
        quantity: item.quantite,
      })),
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 490, currency: 'eur' },
            display_name: 'Livraison standard',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'eur' },
            display_name: 'Livraison gratuite (commandes +50€)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
      success_url: `${baseUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/panier`,
      metadata: {
        items: JSON.stringify(items.map((i) => ({
          slug: i.slug,
          printfulId: i.printfulId,
          couleur: i.couleur,
          taille: i.taille,
          quantite: i.quantite,
        }))),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement.' },
      { status: 500 }
    )
  }
}
