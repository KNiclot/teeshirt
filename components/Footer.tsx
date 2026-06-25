import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2A2A2A] mt-24">
      {/* Stripe accent */}
      <div className="h-1 stripe-accent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#FFD700] flex items-center justify-center">
                <span className="text-black font-black text-xs">PT</span>
              </div>
              <span className="font-display text-2xl tracking-wider">ProTee</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Pour ceux qui construisent le monde avec leurs mains.
            </p>
            <p className="text-[#FFD700] text-xs font-bold uppercase tracking-widest mt-4">
              Impression & livraison 48h
            </p>
          </div>

          {/* Catégories */}
          <div>
            <h4 className="font-display text-lg text-[#FFD700] tracking-wider mb-4">Catégories</h4>
            <ul className="space-y-2">
              {[
                { href: '/catalogue?cat=batiment', label: 'Bâtiment' },
                { href: '/catalogue?cat=route', label: 'Route & Transport' },
                { href: '/catalogue?cat=mecanique', label: 'Mécanique' },
                { href: '/catalogue', label: 'Tout voir' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-zinc-400 hover:text-white text-sm transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gammes */}
          <div>
            <h4 className="font-display text-lg text-[#FFD700] tracking-wider mb-4">Gammes</h4>
            <ul className="space-y-2">
              {[
                { href: '/catalogue?gamme=classique', label: 'Classique — 19,99€' },
                { href: '/catalogue?gamme=premium', label: '⭐ Premium — 29,90€' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-zinc-400 hover:text-white text-sm transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-display text-lg text-[#FFD700] tracking-wider mb-4 mt-6">Infos</h4>
            <ul className="space-y-2">
              {[
                { href: '#', label: 'FAQ' },
                { href: '#', label: 'Livraison' },
                { href: '#', label: 'Retours' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-zinc-400 hover:text-white text-sm transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux sociaux + paiements */}
          <div>
            <h4 className="font-display text-lg text-[#FFD700] tracking-wider mb-4">Suivez-nous</h4>
            <div className="flex gap-3 mb-8">
              {[
                { label: 'Instagram', icon: 'IG', href: '#' },
                { label: 'Facebook', icon: 'FB', href: '#' },
                { label: 'TikTok', icon: 'TK', href: '#' },
              ].map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 border border-[#2A2A2A] flex items-center justify-center text-zinc-500 hover:border-[#FFD700] hover:text-[#FFD700] transition-all duration-200 text-xs font-black"
                >
                  {icon}
                </a>
              ))}
            </div>
            <p className="text-zinc-600 text-xs uppercase tracking-widest mb-3">Paiement sécurisé</p>
            <div className="flex gap-2 flex-wrap">
              {['Visa', 'MC', 'Amex', 'CB'].map((p) => (
                <span
                  key={p}
                  className="border border-[#2A2A2A] text-zinc-600 text-[10px] font-bold px-2 py-1"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2A2A2A] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} ProTee. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {['Mentions légales', 'CGV', 'Confidentialité'].map((l) => (
              <a key={l} href="#" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
