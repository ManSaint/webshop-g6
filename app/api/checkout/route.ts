import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const { items } = await req.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "sek",
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
    //   success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/customer/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe error:", error)
    return NextResponse.json({ error: "Payment failed" }, { status: 500 })
  }
}