'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '@/lib/cart'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const itemCount = useCart((s) => s.itemCount())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#2A2A2A]'
          : 'bg-transparent'
      }`}
    >
      {/* Ticker tape */}
      <div className="bg-[#FFD700] overflow-hidden h-7 flex items-center">
        <div className="flex animate-ticker whitespace-nowrap">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="text-black font-bold text-[11px] uppercase tracking-widest px-8">
              🔨 Livraison gratuite dès 50€ &nbsp;·&nbsp; 🏗️ Impression en France &nbsp;·&nbsp; ⚡ Expédition 48h &nbsp;·&nbsp; 🔧 Qualité pro garantie &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#FFD700] flex items-center justify-center group-hover:bg-[#FF6B00] transition-colors duration-200">
            <span className="text-black font-black text-xs">TP</span>
          </div>
          <span className="font-display text-2xl text-white tracking-wider group-hover:text-[#FFD700] transition-colors duration-200">
            LeTeeshirtDuPro
          </span>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: '/catalogue', label: 'Catalogue' },
            { href: '/catalogue?cat=batiment', label: 'Bâtiment' },
            { href: '/catalogue?cat=route', label: 'Route' },
            { href: '/catalogue?cat=mecanique', label: 'Mécanique' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-zinc-400 hover:text-[#FFD700] font-bold uppercase text-xs tracking-widest transition-colors duration-200 relative group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FFD700] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Panier */}
          <Link
            href="/panier"
            className="relative flex items-center gap-2 text-white hover:text-[#FFD700] transition-colors duration-200 group"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#FF6B00] text-white text-[10px] font-black flex items-center justify-center rounded-full animate-bounce-badge">
                {itemCount}
              </span>
            )}
            <span className="hidden md:block text-xs font-bold uppercase tracking-widest">
              Panier
            </span>
          </Link>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-[#0A0A0A] border-t border-[#2A2A2A] overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 py-4 flex flex-col gap-4">
          {[
            { href: '/catalogue', label: 'Tout le catalogue' },
            { href: '/catalogue?cat=batiment', label: '🏗️ Bâtiment' },
            { href: '/catalogue?cat=route', label: '🚛 Route & Transport' },
            { href: '/catalogue?cat=mecanique', label: '🔧 Mécanique' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-zinc-300 hover:text-[#FFD700] font-bold uppercase text-sm tracking-widest py-2 border-b border-[#1a1a1a] transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
