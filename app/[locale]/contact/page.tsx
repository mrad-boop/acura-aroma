'use client'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Mail, Phone, MapPin, Lock, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import QuoteModal from '@/components/QuoteModal'
import { supabase } from '@/lib/supabase'

export default function ContactPage() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'', type_client:'', message:'' })
  const u = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    if (!form.email || !form.message) return
    setLoading(true)
    await supabase.from('aa_quotes').insert([{ ...form, product_name: 'Contact général', status: 'new', locale }])
    setLoading(false); setSubmitted(true)
  }

  return (
    <>
      <Navbar onQuoteOpen={() => setQuoteOpen(true)} />

      <div className="pt-28 pb-12 bg-sage-deep">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-white/50 bg-sage/15 border border-sage/25 px-4 py-1.5 rounded-full mb-5">✦ {t('tag')}</div>
          <h1 className="font-serif text-5xl font-light text-white mb-4">{t('title')}</h1>
          <p className="text-sm text-white/55 max-w-md mx-auto">{t('desc')}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="bg-sage-deep rounded-2xl p-10 text-white">
            <h2 className="font-serif text-2xl font-light mb-2">{locale === 'fr' ? 'Restons connectés' : 'Stay connected'}</h2>
            <p className="text-white/60 text-sm mb-8">{locale === 'fr' ? 'Réponse sous 24h en français et anglais.' : 'Reply within 24h in French and English.'}</p>
            {[
              [Mail, t('email_label'), 'contact@acuraaroma.tn'],
              [Phone, t('phone_label'), '+216 XX XXX XXX'],
              [MapPin, t('location_label'), t('location_value')],
            ].map(([Icon, label, value], i) => (
              <div key={i} className="flex gap-4 mb-6 pb-6 border-b border-sage/15 last:border-0">
                <div className="w-10 h-10 rounded-xl bg-sage/15 border border-sage/25 flex items-center justify-center shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-[10px] tracking-widest uppercase text-white/45 mb-1">{label as string}</div>
                  <div className="text-sm text-white/85">{value as string}</div>
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 mt-4">
              {['💬 WhatsApp','📘 Facebook','📷 Instagram'].map(s => (
                <a key={s} href="#" className="text-xs font-semibold tracking-wide bg-sage/15 border border-sage/25 text-white/75 px-4 py-2 rounded-full hover:bg-sage/30 hover:text-white transition-all">{s}</a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-10 shadow-md border border-sage/10">
            <h2 className="font-serif text-2xl font-light text-sage-deep mb-6">{t('form_title')}</h2>
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle size={40} className="text-sage mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-sage-deep mb-2">{t('success_title')}</h3>
                <p className="text-sm text-[var(--text-soft)]">{t('success_msg')}</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[['first_name', t('first_name'), 'Marie'],['last_name', t('last_name'), 'Dupont']].map(([k,label,ph]) => (
                    <div key={k}>
                      <label className="block text-[10px] font-semibold tracking-widest uppercase text-[var(--text-soft)] mb-2">{label}</label>
                      <input value={form[k as keyof typeof form]} onChange={e => u(k, e.target.value)} placeholder={ph}
                        className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-mist text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/10 transition-all" />
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-[10px] font-semibold tracking-widest uppercase text-[var(--text-soft)] mb-2">{t('email')}</label>
                  <input type="email" value={form.email} onChange={e => u('email', e.target.value)} placeholder="marie@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-mist text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/10 transition-all" />
                </div>
                <div className="mb-4">
                  <label className="block text-[10px] font-semibold tracking-widest uppercase text-[var(--text-soft)] mb-2">{t('message')}</label>
                  <textarea value={form.message} onChange={e => u('message', e.target.value)} rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-mist text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/10 transition-all resize-y" />
                </div>
                <button onClick={submit} disabled={loading}
                  className="w-full bg-sage-deep text-white font-bold text-sm tracking-wider uppercase py-4 rounded-xl hover:bg-sage transition-all shadow-md">
                  {loading ? '...' : t('submit')}
                </button>
                <p className="flex items-center justify-center gap-1.5 text-[10px] text-[var(--text-soft)] mt-3">
                  <Lock size={10} /> {t('note')}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  )
}
