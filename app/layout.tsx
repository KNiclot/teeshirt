import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LeTeeshirtDuPro.fr — T-Shirts Métiers BTP, Route & Mécano',
  description:
    'T-shirts humoristiques premium pour les pros du bâtiment, de la route et de la mécanique. Pour ceux qui construisent le monde avec leurs mains.',
  keywords:
    'tshirt btp, tshirt plombier, tshirt maçon, tshirt électricien, tshirt routier, tshirt mécanicien',
}

export const viewport = {
  themeColor: '#0A0A0A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${bebas.variable} ${inter.variable}`}>
      <body className="bg-[#0A0A0A] text-white antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
