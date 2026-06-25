import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ProTee — T-Shirts Métiers BTP, Route & Mécano',
  description: 'T-shirts humoristiques pour les pros du bâtiment, de la route et de la mécanique. Pour ceux qui construisent le monde avec leurs mains.',
  keywords: 'tshirt btp, tshirt plombier, tshirt maçon, tshirt électricien, tshirt routier, tshirt mécanicien',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-zinc-950 text-white antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
