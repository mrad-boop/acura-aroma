'use client'
import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Search } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import QuoteModal from '@/components/QuoteModal'
import type { Product, Category } from '@/lib/supabase'

export default function ProductsClient({ locale, products, categories }: {
  locale: string; products: Product[]; categories: Category[]
}) {
  const t = useTranslations('products')
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quoteProduct, setQuoteProduct] = useState('')
  const [filter, setFilter] = useState<'all'|'eau'|'huile'>('all')
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState<number|null>(null)

  const openQuote = (product = '') => { setQuoteProduct(product); setQuoteOpen(true) }

  const filtered = useMemo(() => {
    return products.filter(p => {
      const name = locale === 'fr' ? p.name_fr : p.name_en
      const matchType = filter === 'all' || p.type === filter
      const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase())
      const matchCat = !catFilter || p.category_id === catFilter
      return matchType && matchSearch && matchCat
    })
  }, [products, filter, search, catFilter, locale])

  return (
    <>
      <Navbar onQuoteOpen={() => openQuote()} />

      {/* Page Hero */}
      <div className="pt-28 pb-14 bg-sage-deep">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-white/50 bg-sage/15 border border-sage/25 px-4 py-1.5 rounded-full mb-5">
            ✦ {t('subtitle')}
          </div>
          <h1 className="font-serif text-5xl font-light text-white mb-4">{t('title')}</h1>
          <p className="text-sm text-white/55 max-w-lg mx-auto leading-loose">{t('desc')}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sage/60" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder={locale === 'fr' ? 'Rechercher un produit...' : 'Search a product...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-sage/20 bg-white text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/10 transition-all"
            />
          </div>

          {/* Type filter */}
          <div className="flex gap-2 flex-wrap">
            {([['all', t('filter_all')],['eau', t('filter_eau')],['huile', t('filter_huile')]] as const).map(([val, label]) => (
              <button key={val} onClick={() => setFilter(val)}
                className={`text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full border transition-all ${
                  filter === val ? 'bg-sage-deep text-white border-sage-deep' : 'border-sage/30 text-[var(--text-soft)] hover:border-sage-deep hover:text-sage-deep'
                }`}>{label}</button>
            ))}
          </div>

          {/* Category filter */}
          {categories.length > 0 && (
            <select value={catFilter ?? ''} onChange={e => setCatFilter(e.target.value ? Number(e.target.value) : null)}
              className="text-xs font-semibold border border-sage/20 rounded-full px-4 py-2 bg-white focus:outline-none focus:border-sage text-[var(--text-soft)]">
              <option value="">{locale === 'fr' ? 'Toutes catégories' : 'All categories'}</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{locale === 'fr' ? c.name_fr : c.name_en}</option>
              ))}
            </select>
          )}
        </div>

        {/* Count */}
        <p className="text-xs text-[var(--text-soft)] mb-6 tracking-wide">
          {filtered.length} {locale === 'fr' ? 'produit(s) trouvé(s)' : 'product(s) found'}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[var(--text-soft)]">
            <div className="text-5xl mb-4">🌿</div>
            <p className="font-serif text-xl">{t('no_products')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => <ProductCard key={p.id} product={p} onQuote={openQuote} />)}
          </div>
        )}

        {/* Quote CTA */}
        <div className="mt-16 text-center bg-sage-deep rounded-2xl p-12">
          <h2 className="font-serif text-3xl font-light text-white mb-3">
            {locale === 'fr' ? 'Vous ne trouvez pas ce que vous cherchez ?' : "Can't find what you're looking for?"}
          </h2>
          <p className="text-white/60 text-sm mb-7">
            {locale === 'fr' ? 'Contactez-nous pour un devis sur mesure.' : 'Contact us for a custom quote.'}
          </p>
          <button onClick={() => openQuote()}
            className="bg-gold text-sage-deep font-bold text-sm tracking-wider uppercase px-10 py-3.5 rounded-full hover:bg-yellow-500 transition-all shadow-lg">
            {locale === 'fr' ? 'Demander un devis personnalisé' : 'Request a custom quote'}
          </button>
        </div>
      </div>

      <Footer />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} prefilledProduct={quoteProduct} />
    </>
  )
}
