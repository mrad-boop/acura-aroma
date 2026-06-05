'use client'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (l: string) => router.push(pathname.replace(`/${locale}`, `/${l}`))

  const navLinks = [
    { href: `/${locale}`, label: locale === 'fr' ? 'Accueil' : 'Home' },
    { href: `/${locale}/products`, label: locale === 'fr' ? 'Produits' : 'Products' },
    { href: `/${locale}/about`, label: locale === 'fr' ? 'À propos' : 'About' },
    { href: `/${locale}/blog`, label: 'Blog' },
    { href: `/${locale}/contact`, label: 'Contact' },
  ]

  const products = [
    'Eau de Rose', 'Fleur d\'Oranger', 'Eau de Menthe',
    'H.E. Lavande', 'H.E. Romarin', 'H.E. Eucalyptus',
  ]

  return (
    <footer className="bg-[#2c2416] text-cream">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-sage-deep flex items-center justify-center text-xl">🌿</div>
              <div>
                <div className="font-serif text-xl font-semibold text-cream leading-none">Acura Aroma</div>
                <div className="text-[10px] tracking-widest uppercase text-sage mt-0.5">
                  {locale === 'fr' ? 'Distillerie Artisanale' : 'Artisan Distillery'}
                </div>
              </div>
            </div>
            <p className="text-sm text-cream/50 leading-relaxed mb-4">{t('desc')}</p>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-sage/80 bg-sage/10 border border-sage/20 px-3 py-1.5 rounded-full">
              ✦ {t('cert')}
            </span>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-widest uppercase text-cream/40 mb-5">{t('nav_title')}</h4>
            <ul className="space-y-2.5">
              {navLinks.map(l => (
                <li key={l.href}><Link href={l.href} className="text-sm text-cream/60 hover:text-sage transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-widest uppercase text-cream/40 mb-5">{t('products_title')}</h4>
            <ul className="space-y-2.5">
              {products.map(p => (
                <li key={p}><Link href={`/${locale}/products`} className="text-sm text-cream/60 hover:text-sage transition-colors">{p}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-widest uppercase text-cream/40 mb-5">{t('contact_title')}</h4>
            <ul className="space-y-2.5">
              <li><a href="mailto:contact@acuraaroma.tn" className="text-sm text-cream/60 hover:text-sage transition-colors">contact@acuraaroma.tn</a></li>
              <li><a href="#" className="text-sm text-cream/60 hover:text-sage transition-colors">WhatsApp Business</a></li>
              <li><a href="#" className="text-sm text-cream/60 hover:text-sage transition-colors">Instagram</a></li>
              <li><a href="#" className="text-sm text-cream/60 hover:text-sage transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-cream/35">© 2026 Acura Aroma · {t('rights')} · Tunisia</p>
          <div className="flex gap-2">
            {['fr','en'].map(l => (
              <button key={l} onClick={() => switchLocale(l)}
                className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all ${
                  locale === l ? 'border-sage text-sage' : 'border-white/10 text-cream/40 hover:border-sage hover:text-sage'
                }`}>{l === 'fr' ? 'Français' : 'English'}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
