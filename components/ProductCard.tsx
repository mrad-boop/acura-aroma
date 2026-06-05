'use client'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import type { Product } from '@/lib/supabase'

interface Props {
  product: Product
  onQuote: (name: string) => void
}

export default function ProductCard({ product, onQuote }: Props) {
  const locale = useLocale()
  const t = useTranslations('products')

  const name = locale === 'fr' ? product.name_fr : product.name_en
  const desc = locale === 'fr' ? product.description_fr : product.description_en
  const tags = locale === 'fr' ? product.tags_fr : product.tags_en

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-sage/10 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Visual */}
      <Link href={`/${locale}/products/${product.slug}`}>
        <div
          className="h-52 flex items-center justify-center relative overflow-hidden cursor-pointer"
          style={{ background: `linear-gradient(135deg, ${product.color_from}, ${product.color_to})` }}
        >
          <span className={`absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-sm ${
            product.type === 'eau'
              ? 'bg-sage/20 text-sage-deep border border-sage/40'
              : 'bg-gold/20 text-bark border border-gold/40'
          }`}>
            {product.type === 'eau'
              ? (locale === 'fr' ? 'Eau florale' : 'Floral water')
              : (locale === 'fr' ? 'Huile essentielle' : 'Essential oil')}
          </span>
          <span className="text-6xl relative z-10 drop-shadow-lg">{product.emoji}</span>
        </div>
      </Link>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <Link href={`/${locale}/products/${product.slug}`}>
          <h3 className="font-serif text-xl font-semibold text-sage-deep mb-2 hover:text-sage transition-colors">{name}</h3>
        </Link>
        <p className="text-sm text-[var(--text-soft)] leading-relaxed mb-3 line-clamp-2">{desc}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0,3).map(tag => (
              <span key={tag} className="text-[10px] font-semibold tracking-wider uppercase bg-mist text-sage-dark px-2.5 py-1 rounded-full border border-sage/20">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-sage/10 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-sage font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />
            {t('price_label')}
          </span>
          <button
            onClick={() => onQuote(name)}
            className="bg-sage-deep text-white text-[11px] font-bold tracking-wider uppercase px-4 py-2 rounded-full hover:bg-sage transition-all"
          >
            {t('quote_btn')}
          </button>
        </div>
      </div>
    </div>
  )
}
