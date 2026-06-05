'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import QuoteModal from '@/components/QuoteModal'
import type { Product, BlogPost } from '@/lib/supabase'

export default function HomeClient({
  locale, featuredProducts, blogPosts
}: { locale: string; featuredProducts: Product[]; blogPosts: BlogPost[] }) {
  const t = useTranslations()
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quoteProduct, setQuoteProduct] = useState('')

  const openQuote = (product = '') => { setQuoteProduct(product); setQuoteOpen(true) }

  const marqueeItems = locale === 'fr'
    ? ['Distillation artisanale','Plantes de Tunisie','100% Naturel','Huiles essentielles pures','Eaux florales biologiques','Export international','Aromathérapie & bien-être']
    : ['Artisan distillation','Tunisian plants','100% Natural','Pure essential oils','Organic floral waters','International export','Aromatherapy & wellness']

  const processSteps = [
    { num: '01', icon: '🌱', title: t('process.s1_title'), desc: t('process.s1_desc') },
    { num: '02', icon: '🔥', title: t('process.s2_title'), desc: t('process.s2_desc') },
    { num: '03', icon: '🔬', title: t('process.s3_title'), desc: t('process.s3_desc') },
    { num: '04', icon: '📦', title: t('process.s4_title'), desc: t('process.s4_desc') },
  ]

  return (
    <>
      <Navbar onQuoteOpen={() => openQuote()} />

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center relative overflow-hidden" style={{ background: 'linear-gradient(145deg,#1e3322 0%,#2d4a30 40%,#3a5e3d 70%,#2d4a30 100%)' }}>
        {/* Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(#7a9e7e,transparent)' }} />
        <div className="absolute bottom-20 -left-20 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(#b8963e,transparent)' }} />

        <div className="max-w-6xl mx-auto px-6 pt-28 pb-20 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/70 bg-sage/15 border border-sage/30 px-4 py-1.5 rounded-full mb-7 animate-fade-up">
              ✦ {t('hero.badge')}
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-white leading-[1.1] animate-fade-up delay-100">
              {t('hero.title').split('\n').map((line, i) => (
                <span key={i}>{i === 0 ? line : <><br /><em className="italic text-gold/90">{line.replace('l\'essence','').replace('the essence','')}<em className="not-italic">{locale === 'fr' ? 'l\'essence' : 'the essence'}</em></em></>}</span>
              ))}
            </h1>
            <p className="font-serif italic text-white/60 text-lg mt-5 mb-3 animate-fade-up delay-200">"{t('hero.slogan')}"</p>
            <p className="text-white/60 text-sm leading-loose max-w-md animate-fade-up delay-300 mb-8">{t('hero.desc')}</p>

            <div className="flex flex-wrap gap-4 animate-fade-up delay-400">
              <Link href={`/${locale}/products`}
                className="bg-gold text-sage-deep font-bold text-sm tracking-wider uppercase px-8 py-3.5 rounded-full hover:bg-yellow-500 transition-all shadow-lg hover:-translate-y-0.5">
                {t('hero.cta_primary')}
              </Link>
              <button onClick={() => openQuote()}
                className="border border-white/30 text-white/85 font-medium text-sm tracking-wider uppercase px-8 py-3.5 rounded-full hover:border-white/60 hover:bg-white/8 transition-all">
                {t('hero.cta_secondary')}
              </button>
            </div>

            <div className="flex gap-10 mt-12 animate-fade-up delay-500">
              {[['10+', t('hero.stat_products')], ['100%', t('hero.stat_natural')], ['🌍', t('hero.stat_export')]].map(([num, label]) => (
                <div key={label} className="border-l-2 border-sage/40 pl-4">
                  <div className="font-serif text-2xl font-semibold text-gold leading-none">{num}</div>
                  <div className="text-[10px] tracking-widest uppercase text-white/50 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-96 h-96">
              <div className="absolute inset-0 rounded-full border border-sage/20 animate-spin-slow" />
              <div className="absolute inset-8 rounded-full border border-dashed border-sage/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full flex items-center justify-center text-8xl animate-float"
                  style={{ background: 'radial-gradient(circle at 40% 35%, rgba(122,158,126,.2), rgba(45,74,48,.4))', boxShadow: '0 0 80px rgba(122,158,126,.12)' }}>
                  🌿
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] tracking-widest uppercase">{locale === 'fr' ? 'Découvrir' : 'Explore'}</span>
          <div className="w-px h-10 bg-gradient-to-b from-sage/60 to-transparent" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-sage-deep py-5 overflow-hidden">
        <div className="flex gap-14 whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] uppercase text-white/60 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT STRIP ── */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 text-[11px] font-semibold tracking-widest uppercase text-sage mb-4">
              <span className="w-7 h-px bg-sage inline-block" />{t('about.tag')}
            </div>
            <h2 className="font-serif text-4xl font-light text-sage-deep leading-snug mb-4">
              {t('about.title').split(' la ')[0]} la <em className="italic text-gold">{t('about.title').split(' la ')[1]}</em>
            </h2>
            <p className="text-sm text-[var(--text-soft)] leading-loose mb-8">{t('about.desc')}</p>

            {[1,2,3].map(n => (
              <div key={n} className="flex gap-4 mb-6 pb-6 border-b border-sage/10 last:border-0 last:mb-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-sage-deep text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">0{n}</div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-sage-deep mb-1">{t(`about.step${n}_title`)}</h4>
                  <p className="text-xs text-[var(--text-soft)] leading-relaxed">{t(`about.step${n}_desc`)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-2xl overflow-hidden h-52 flex items-center justify-center text-6xl relative"
              style={{ background: 'linear-gradient(145deg,#7a9e7e,#2d4a30)' }}>
              <span className="text-7xl">🌸</span>
              <div className="absolute bottom-4 left-4 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2 text-white">
                <div className="font-serif text-2xl font-semibold text-gold">2024</div>
                <div className="text-[10px] tracking-widest uppercase text-white/70">{locale === 'fr' ? 'Fondée en Tunisie' : 'Founded in Tunisia'}</div>
              </div>
            </div>
            {[['🌱', t('about.val_natural')],['✋', t('about.val_artisan')],['♻️', t('about.val_eco')]].map(([icon, label]) => (
              <div key={label} className="bg-mist border border-sage/20 rounded-2xl p-5 text-center last:col-span-2 md:last:col-span-1">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-xs font-semibold tracking-widest uppercase text-sage-dark">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-ivory">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-3 text-[11px] font-semibold tracking-widest uppercase text-sage mb-3">
                  <span className="w-7 h-px bg-sage" />{t('products.subtitle')}
                </div>
                <h2 className="font-serif text-4xl font-light text-sage-deep">{t('products.featured')}</h2>
              </div>
              <Link href={`/${locale}/products`}
                className="text-xs font-semibold tracking-widest uppercase text-sage-dark hover:text-sage-deep transition-colors">
                {locale === 'fr' ? 'Voir tout le catalogue →' : 'View full catalogue →'}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map(p => (
                <ProductCard key={p.id} product={p} onQuote={openQuote} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PROCESS ── */}
      <section className="py-20 bg-sage-deep">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-3 text-[11px] font-semibold tracking-widest uppercase text-sage/80 mb-4">
              <span className="w-7 h-px bg-sage/60" />{t('process.tag')}<span className="w-7 h-px bg-sage/60" />
            </div>
            <h2 className="font-serif text-4xl font-light text-white mb-3">{t('process.title')}</h2>
            <p className="text-sm text-white/55 leading-loose">{t('process.desc')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 border border-sage/15 rounded-2xl overflow-hidden">
            {processSteps.map((s, i) => (
              <div key={i} className="p-8 text-center border-r border-sage/15 last:border-r-0 hover:bg-sage/8 transition-colors">
                <div className="font-serif text-4xl font-light text-sage/20 mb-3">{s.num}</div>
                <div className="text-2xl mb-3">{s.icon}</div>
                <h3 className="font-serif text-base text-white mb-2">{s.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      {blogPosts.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-3 text-[11px] font-semibold tracking-widest uppercase text-sage mb-3">
                  <span className="w-7 h-px bg-sage" />{t('blog.tag')}
                </div>
                <h2 className="font-serif text-4xl font-light text-sage-deep">{t('blog.title')}</h2>
              </div>
              <Link href={`/${locale}/blog`} className="text-xs font-semibold tracking-widest uppercase text-sage-dark hover:text-sage-deep transition-colors">
                {t('blog.all')} →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.map(post => {
                const title = locale === 'fr' ? post.title_fr : post.title_en
                const excerpt = locale === 'fr' ? post.excerpt_fr : post.excerpt_en
                return (
                  <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-sage/8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <div className="h-44 flex items-center justify-center text-5xl relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg,#f0f7f0,#7a9e7e)` }}>
                      <span className="relative z-10">{post.emoji}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-sage bg-sage/10 px-2.5 py-1 rounded-full">{post.category}</span>
                        <span className="text-xs text-[var(--text-soft)]">{new Date(post.published_at).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { month: 'long', year: 'numeric' })}</span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-sage-deep leading-snug mb-2">{title}</h3>
                      <p className="text-xs text-[var(--text-soft)] leading-relaxed line-clamp-2">{excerpt}</p>
                      <Link href={`/${locale}/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold tracking-wider uppercase text-sage-dark hover:text-sage-deep transition-colors">
                        {t('blog.read_more')}
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BANNER ── */}
      <section className="py-20 bg-ivory">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="text-5xl mb-6">🌿</div>
          <h2 className="font-serif text-4xl font-light text-sage-deep mb-4">
            {locale === 'fr' ? 'Prêt à collaborer ?' : 'Ready to collaborate?'}
          </h2>
          <p className="text-sm text-[var(--text-soft)] leading-loose mb-8">
            {locale === 'fr'
              ? 'Distributeurs, marques cosmétiques, revendeurs — demandez un devis personnalisé gratuit et sans engagement.'
              : 'Distributors, cosmetic brands, resellers — request a free, no-commitment personalised quote.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => openQuote()}
              className="bg-sage-deep text-white font-bold text-sm tracking-wider uppercase px-10 py-4 rounded-full hover:bg-sage transition-all shadow-lg hover:-translate-y-0.5">
              {locale === 'fr' ? 'Demander un devis gratuit' : 'Request a free quote'}
            </button>
            <Link href={`/${locale}/contact`}
              className="border border-sage text-sage-deep font-medium text-sm tracking-wider uppercase px-10 py-4 rounded-full hover:bg-sage hover:text-white transition-all">
              {locale === 'fr' ? 'Nous contacter' : 'Contact us'}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} prefilledProduct={quoteProduct} />
    </>
  )
}
