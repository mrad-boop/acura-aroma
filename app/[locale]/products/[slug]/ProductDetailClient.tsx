'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import QuoteModal from '@/components/QuoteModal'
import type { Product } from '@/lib/supabase'

export default function ProductDetailClient({ locale, product, related }: {
  locale: string; product: Product; related: Product[]
}) {
  const t = useTranslations('products')
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quoteProduct, setQuoteProduct] = useState('')

  const openQuote = (p = '') => { setQuoteProduct(p); setQuoteOpen(true) }

  const name = locale === 'fr' ? product.name_fr : product.name_en
  const desc = locale === 'fr' ? product.description_fr : product.description_en
  const benefits = locale === 'fr' ? product.benefits_fr : product.benefits_en
  const usage = locale === 'fr' ? product.usage_fr : product.usage_en
  const tags = locale === 'fr' ? product.tags_fr : product.tags_en

  return (
    <>
      <Navbar onQuoteOpen={() => openQuote()} />

      <div className="pt-28 pb-6 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <Link href={`/${locale}/products`}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sage-dark hover:text-sage-deep transition-colors mb-8">
            <ArrowLeft size={14} /> {t('back')}
          </Link>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Visual */}
            <div className="relative">
              <div className="w-full aspect-square rounded-3xl flex items-center justify-center text-9xl shadow-xl"
                style={{ background: `linear-gradient(145deg,${product.color_from},${product.color_to})` }}>
                <span className="drop-shadow-2xl">{product.emoji}</span>
              </div>
              <span className={`absolute top-5 left-5 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full ${
                product.type === 'eau' ? 'bg-sage/20 text-sage-deep border border-sage/40' : 'bg-gold/20 text-bark border border-gold/40'
              }`}>
                {product.type === 'eau'
                  ? (locale === 'fr' ? 'Eau florale' : 'Floral water')
                  : (locale === 'fr' ? 'Huile essentielle' : 'Essential oil')}
              </span>
            </div>

            {/* Info */}
            <div className="pt-4">
              {product.category && (
                <div className="text-[11px] font-semibold tracking-widest uppercase text-sage mb-3">
                  {locale === 'fr' ? product.category.name_fr : product.category.name_en}
                </div>
              )}
              <h1 className="font-serif text-4xl font-semibold text-sage-deep mb-4">{name}</h1>
              <p className="text-[var(--text-soft)] leading-loose mb-6">{desc}</p>

              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold tracking-wider uppercase bg-mist text-sage-dark px-3 py-1.5 rounded-full border border-sage/20">{tag}</span>
                  ))}
                </div>
              )}

              {/* Benefits */}
              {benefits && (
                <div className="mb-6 p-5 bg-mist rounded-2xl border border-sage/15">
                  <h3 className="font-serif text-lg font-semibold text-sage-deep mb-3 flex items-center gap-2">
                    <CheckCircle size={18} className="text-sage" /> {t('benefits')}
                  </h3>
                  <p className="text-sm text-[var(--text-soft)] leading-relaxed">{benefits}</p>
                </div>
              )}

              {/* Usage */}
              {usage && (
                <div className="mb-8 p-5 bg-sand/40 rounded-2xl border border-warm/20">
                  <h3 className="font-serif text-lg font-semibold text-sage-deep mb-3">💡 {t('usage')}</h3>
                  <p className="text-sm text-[var(--text-soft)] leading-relaxed">{usage}</p>
                </div>
              )}

              {/* CTA */}
              <div className="flex items-center justify-between bg-white border border-sage/15 rounded-2xl p-5 shadow-sm">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-sage">{t('price_label')}</p>
                  <p className="text-xs text-[var(--text-soft)] mt-0.5">{locale === 'fr' ? 'Tarif selon quantité et conditionnement' : 'Price based on quantity and packaging'}</p>
                </div>
                <button onClick={() => openQuote(name)}
                  className="bg-sage-deep text-white font-bold text-sm tracking-wider uppercase px-6 py-3 rounded-full hover:bg-sage transition-all shadow-md">
                  {t('quote_btn')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-ivory">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-3xl font-light text-sage-deep mb-8">{t('related')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} onQuote={openQuote} />)}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} prefilledProduct={quoteProduct} />
    </>
  )
}
