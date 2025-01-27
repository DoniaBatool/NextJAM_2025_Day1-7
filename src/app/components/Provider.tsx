'use client'

import React, { ReactNode } from 'react'
import { CartProvider as USCProvider } from 'use-shopping-cart'

interface ProviderProps {
  children: ReactNode
}

const Provider = ({ children }: ProviderProps) => {
  const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

  if (!stripePublicKey) {
    throw new Error('Stripe public key is missing in environment variables');
  }

  return (
    <USCProvider
      cartMode="checkout-session"  // Checkout mode
      stripe={stripePublicKey}  // Stripe public key
      currency="USD"
      shouldPersist={true}  // Keep the cart data across sessions
    >
      {children}
    </USCProvider>
  )
}

export default Provider
