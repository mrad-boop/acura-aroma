'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import QuoteModal from '@/components/QuoteModal'
import type { BlogPost } from '@/lib/supabase'

export default function BlogClient({ locale, posts }: { locale: string; posts: BlogPost[] }) {
  const t = useTranslations('blog')
  const [quoteOpen, setQuoteOpen] = useState(false)

  return (
    <>
      <Navbar onQuoteOpen={() => setQuoteOpen(true)} />

      <div className="pt-28 pb-14 bg-sage-deep text-center">
        <div className="max-w-xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-white/50 bg-sage/15 border border-sage/25 px-4 py-1.5 rounded-full mb-5">✦ {t('tag')}</div>
          <h1 className="font-serif text-5xl font-light text-white">{t('title')}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📝</div>
            <p className="font-serif text-2xl text-sage-deep">{locale === 'fr' ? 'Aucun article pour le moment.' : 'No articles yet.'}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map(post => {
              const title = locale === 'fr' ? post.title_fr : post.title_en
              const excerpt = locale === 'fr' ? post.excerpt_fr : post.excerpt_en
              return (
                <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-sage/8 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300">
                  <div className="h-52 flex items-center justify-center text-6xl relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg,#eef3ee,#7a9e7e)' }}>
                    <span className="relative z-10">{post.emoji}</span>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-sage bg-sage/10 px-2.5 py-1 rounded-full">{post.category}</span>
                      <span className="text-xs text-[var(--text-soft)]">
                        {new Date(post.published_at).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <h2 className="font-serif text-xl font-semibold text-sage-deep leading-snug mb-3">{title}</h2>
                    <p className="text-sm text-[var(--text-soft)] leading-relaxed line-clamp-3">{excerpt}</p>
                    <Link href={`/${locale}/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 mt-5 text-xs font-semibold tracking-wider uppercase text-sage-dark hover:text-sage-deep transition-colors">
                      {t('read_more')}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <Footer />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  )
}
