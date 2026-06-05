'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Menu, X } from 'lucide-react'

export default function Navbar({ onQuoteOpen }: { onQuoteOpen: () => void }) {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const switchLocale = (l: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${l}`)
    router.push(newPath)
  }

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/products`, label: t('products') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/blog`, label: t('blog') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-sm py-3' : 'py-5'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sage-deep flex items-center justify-center text-xl shadow-lg">🌿</div>
            <div>
              <div className="font-serif text-2xl font-semibold text-sage-deep leading-none">Acura Aroma</div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-sage font-medium mt-0.5">
                {locale === 'fr' ? 'Distillerie Artisanale' : 'Artisan Distillery'}
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-200 relative group ${
                    pathname === link.href ? 'text-sage-deep' : 'text-[var(--text-soft)] hover:text-sage-deep'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-sage transition-all duration-300 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => switchLocale('fr')}
              className={`text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full border transition-all ${
                locale === 'fr' ? 'bg-sage-deep text-white border-sage-deep' : 'border-sage text-sage-deep hover:bg-sage-deep hover:text-white hover:border-sage-deep'
              }`}>FR</button>
            <button onClick={() => switchLocale('en')}
              className={`text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full border transition-all ${
                locale === 'en' ? 'bg-sage-deep text-white border-sage-deep' : 'border-sage text-sage-deep hover:bg-sage-deep hover:text-white hover:border-sage-deep'
              }`}>EN</button>
            <button
              onClick={onQuoteOpen}
              className="bg-sage-deep text-white text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-full hover:bg-sage transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              {t('quote')}
            </button>
          </div>

          {/* Hamburger */}
          <button className="md:hidden p-1 text-sage-deep" onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-sage-deep flex flex-col items-center justify-center gap-8">
          <button className="absolute top-5 right-6 text-white" onClick={() => setMenuOpen(false)}><X size={28}/></button>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-3xl font-light text-white/90 hover:text-gold transition-colors">
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4">
            {['fr','en'].map(l => (
              <button key={l} onClick={() => { switchLocale(l); setMenuOpen(false) }}
                className={`text-xs font-bold tracking-wider px-4 py-2 rounded-full border transition-all uppercase ${
                  locale === l ? 'bg-white text-sage-deep border-white' : 'border-white/30 text-white/70 hover:border-white hover:text-white'
                }`}>{l}</button>
            ))}
          </div>
          <button onClick={() => { onQuoteOpen(); setMenuOpen(false) }}
            className="bg-gold text-sage-deep font-bold text-sm tracking-wider uppercase px-8 py-3 rounded-full mt-2">
            {t('quote')}
          </button>
        </div>
      )}
    </>
  )
}
