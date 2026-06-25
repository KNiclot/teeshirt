import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2026-06-24.dahlia' as const,
})

async function createPrintfulOrder(
  sessionData: Stripe.Checkout.Session,
  items: Array<{ slug: string; printfulId: string; couleur: string; taille: string; quantite: number }>
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shipping = (sessionData as any).shipping_details
  if (!shipping?.address) return

  const TAILLE_TO_PRINTFUL: Record<string, string> = {
    S: 'S', M: 'M', L: 'L', XL: 'XL', XXL: '2XL',
  }
  const COULEUR_TO_PRINTFUL: Record<string, string> = {
    noir: 'Black', blanc: 'White', gris: 'Sport Grey',
  }

  const payload = {
    recipient: {
      name: shipping.name ?? 'Client',
      address1: shipping.address.line1,
      address2: shipping.address.line2 ?? '',
      city: shipping.address.city,
      state_code: shipping.address.state ?? '',
      country_code: shipping.address.country,
      zip: shipping.address.postal_code,
    },
    items: items.map((item) => ({
      sync_variant_id: item.printfulId,
      quantity: item.quantite,
      name: `${item.slug} — ${COULEUR_TO_PRINTFUL[item.couleur] ?? item.couleur} / ${TAILLE_TO_PRINTFUL[item.taille] ?? item.taille}`,
    })),
  }

  const res = await fetch('https://api.printful.com/orders', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Printful order error:', err)
  } else {
    const data = await res.json()
    console.log('Printful order created:', data.result?.id)
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET ?? '')
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const rawItems = session.metadata?.items
      if (rawItems) {
        const items = JSON.parse(rawItems)
        await createPrintfulOrder(session, items)
      }
    } catch (err) {
      console.error('Error processing order:', err)
    }
  }

  return NextResponse.json({ received: true })
}
