'use client'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import QuoteModal from '@/components/QuoteModal'

export default function AboutPage() {
  const t = useTranslations()
  const locale = useLocale()
  const [quoteOpen, setQuoteOpen] = useState(false)

  const processSteps = [
    { icon: '🌱', title: t('process.s1_title'), desc: t('process.s1_desc') },
    { icon: '🔥', title: t('process.s2_title'), desc: t('process.s2_desc') },
    { icon: '🔬', title: t('process.s3_title'), desc: t('process.s3_desc') },
    { icon: '📦', title: t('process.s4_title'), desc: t('process.s4_desc') },
  ]

  return (
    <>
      <Navbar onQuoteOpen={() => setQuoteOpen(true)} />

      {/* Hero */}
      <div className="pt-28 pb-16 bg-sage-deep text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-6xl mb-6">🌿</div>
          <h1 className="font-serif text-5xl font-light text-white mb-4">{t('about.tag')}</h1>
          <p className="text-white/55 text-sm leading-loose">{t('about.desc')}</p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl font-light text-sage-deep mb-6">{t('about.title')}</h2>
          <div className="prose-like space-y-4 text-[var(--text-soft)] leading-loose text-sm">
            <p>{locale === 'fr'
              ? 'Acura Aroma est née d\'une rencontre entre la passion de la botanique tunisienne et le savoir-faire ancestral de la distillation. Fondée en 2024, notre distillerie artisanale s\'est donnée pour mission de transformer les plantes médicinales et aromatiques de Tunisie en essences d\'une pureté exceptionnelle.'
              : 'Acura Aroma was born from a meeting between a passion for Tunisian botany and the ancestral know-how of distillation. Founded in 2024, our artisan distillery has set itself the mission of transforming Tunisia\'s medicinal and aromatic plants into essences of exceptional purity.'}</p>
            <p>{locale === 'fr'
              ? 'Notre engagement est simple : proposer des produits authentiques, sans compromis sur la qualité, destinés aux professionnels du bien-être, de la cosmétique et de l\'aromathérapie à l\'échelle mondiale.'
              : 'Our commitment is simple: to offer authentic products, without compromise on quality, intended for wellness, cosmetics and aromatherapy professionals worldwide.'}</p>
          </div>

          {/* Steps */}
          <div className="mt-14 space-y-6">
            {[1,2,3].map(n => (
              <div key={n} className="flex gap-5 p-6 bg-white rounded-2xl border border-sage/10 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-sage-deep text-white flex items-center justify-center font-serif text-lg font-semibold shrink-0">0{n}</div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-sage-deep mb-1">{t(`about.step${n}_title`)}</h3>
                  <p className="text-sm text-[var(--text-soft)] leading-relaxed">{t(`about.step${n}_desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-sage-deep">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-light text-white mb-12">{locale === 'fr' ? 'Nos valeurs' : 'Our values'}</h2>
          <div className="grid grid-cols-3 gap-6">
            {[['🌱', t('about.val_natural')],['✋', t('about.val_artisan')],['♻️', t('about.val_eco')]].map(([icon, label]) => (
              <div key={label} className="bg-sage/10 border border-sage/20 rounded-2xl p-8">
                <div className="text-4xl mb-4">{icon}</div>
                <div className="font-serif text-xl text-white">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-ivory">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl font-light text-sage-deep mb-12 text-center">{t('process.title')}</h2>
          <div className="grid grid-cols-2 gap-6">
            {processSteps.map((s, i) => (
              <div key={i} className="p-7 bg-white rounded-2xl border border-sage/10 shadow-sm">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-serif text-lg font-semibold text-sage-deep mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--text-soft)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  )
}
