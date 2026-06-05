'use client'
import { useState, useEffect } from 'react'
import { X, Lock, CheckCircle } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { supabase } from '@/lib/supabase'

interface Props {
  isOpen: boolean
  onClose: () => void
  prefilledProduct?: string
}

export default function QuoteModal({ isOpen, onClose, prefilledProduct }: Props) {
  const t = useTranslations('quote')
  const locale = useLocale()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    country: '', type_client: '', product_name: prefilledProduct || '',
    quantity: '', message: '',
  })

  useEffect(() => {
    if (prefilledProduct) setForm(f => ({ ...f, product_name: prefilledProduct }))
  }, [prefilledProduct])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    if (!form.first_name || !form.email) return alert(t('required'))
    setLoading(true)
    try {
      await supabase.from('quotes').insert([{
        first_name: form.first_name, last_name: form.last_name,
        email: form.email, phone: form.phone, country: form.country,
        type_client: form.type_client, product_name: form.product_name,
        quantity: form.quantity, message: form.message, status: 'new',
        locale,
      }])
    } catch {}
    setLoading(false)
    setSubmitted(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(44,36,22,0.6)', backdropFilter: 'blur(6px)' }}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-up">

        {/* Header */}
        <div className="relative px-8 pt-8 pb-6 rounded-t-2xl text-white"
          style={{ background: 'linear-gradient(135deg, #2d4a30, #7a9e7e)' }}>
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-all">
            <X size={16} />
          </button>
          <h2 className="font-serif text-2xl font-light">{t('title')}</h2>
          <p className="text-white/70 text-sm mt-1">{t('subtitle')}</p>
        </div>

        <div className="px-8 py-7">
          {submitted ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-mist flex items-center justify-center">
                  <CheckCircle size={32} className="text-sage" />
                </div>
              </div>
              <h3 className="font-serif text-2xl text-sage-deep mb-2">{t('success_title')}</h3>
              <p className="text-[var(--text-soft)] text-sm">{t('success_msg')}</p>
              <button onClick={onClose} className="mt-6 bg-sage-deep text-white text-sm font-semibold px-8 py-3 rounded-full hover:bg-sage transition-all">OK</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Field label={t('first_name')} value={form.first_name} onChange={v => update('first_name', v)} placeholder="Marie" />
                <Field label={t('last_name')} value={form.last_name} onChange={v => update('last_name', v)} placeholder="Dupont" />
              </div>
              <Field label={t('email')} type="email" value={form.email} onChange={v => update('email', v)} placeholder="marie@company.com" cls="mb-4" />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Field label={t('country')} value={form.country} onChange={v => update('country', v)} placeholder="France" />
                <Field label={t('phone')} value={form.phone} onChange={v => update('phone', v)} placeholder="+33..." />
              </div>

              <div className="mb-4">
                <label className="block text-[11px] font-semibold tracking-widest uppercase text-[var(--text-soft)] mb-2">{t('type_label')}</label>
                <select value={form.type_client} onChange={e => update('type_client', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-sage/20 bg-mist text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/10 transition-all">
                  <option value="">{t('type_placeholder')}</option>
                  {['individual','distributor','brand','reseller','other'].map(k => (
                    <option key={k} value={k}>{t(`type_${k === 'individual' ? 'individual' : k === 'distributor' ? 'distributor' : k === 'brand' ? 'brand' : k === 'reseller' ? 'reseller' : 'other'}`)}</option>
                  ))}
                </select>
              </div>

              <Field label={t('product')} value={form.product_name} onChange={v => update('product_name', v)} placeholder="Eau de Rose, H.E. Lavande..." cls="mb-4" />

              <div className="mb-4">
                <label className="block text-[11px] font-semibold tracking-widest uppercase text-[var(--text-soft)] mb-2">{t('quantity')}</label>
                <select value={form.quantity} onChange={e => update('quantity', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-sage/20 bg-mist text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/10 transition-all">
                  <option value="">{t('type_placeholder')}</option>
                  {[1,2,3,4].map(n => <option key={n} value={t(`qty_${n}`)}>{t(`qty_${n}`)}</option>)}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-[11px] font-semibold tracking-widest uppercase text-[var(--text-soft)] mb-2">{t('message')}</label>
                <textarea value={form.message} onChange={e => update('message', e.target.value)}
                  rows={3} placeholder="Conditionnement, certification, délai..."
                  className="w-full px-4 py-3 rounded-lg border border-sage/20 bg-mist text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/10 transition-all resize-y" />
              </div>

              <button onClick={submit} disabled={loading}
                className="w-full bg-sage-deep text-white font-bold text-sm tracking-wider uppercase py-4 rounded-xl hover:bg-sage transition-all shadow-md hover:shadow-lg disabled:opacity-60">
                {loading ? '...' : t('submit')}
              </button>
              <p className="flex items-center justify-center gap-2 text-[11px] text-[var(--text-soft)] mt-4">
                <Lock size={11} /> {t('note')}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', cls = 'mb-0' }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; cls?: string
}) {
  return (
    <div className={cls}>
      <label className="block text-[11px] font-semibold tracking-widest uppercase text-[var(--text-soft)] mb-2">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-sage/20 bg-mist text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/10 transition-all" />
    </div>
  )
}
