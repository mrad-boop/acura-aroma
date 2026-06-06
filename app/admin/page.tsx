'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Quote } from '@/lib/supabase'

export default function AdminPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'quotes'|'products'>('quotes')

  useEffect(() => {
    loadQuotes()
  }, [])

  const loadQuotes = async () => {
    const { data } = await supabase
      .from('aa_quotes')
      .select('*')
      .order('created_at', { ascending: false })
    setQuotes(data || [])
    setLoading(false)
  }

  const updateStatus = async (id: number, status: string) => {
    await supabase.from('aa_quotes').update({ status }).eq('id', id)
    loadQuotes()
  }

  const exportCSV = () => {
    const headers = ['ID','Prénom','Nom','Email','Téléphone','Pays','Type','Produit','Quantité','Message','Statut','Date']
    const rows = quotes.map(q => [
      q.id, q.first_name, q.last_name, q.email, q.phone, q.country,
      q.type_client, q.product_name, q.quantity, q.message, q.status,
      new Date(q.created_at || '').toLocaleDateString('fr-FR')
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c ?? ''}"`).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'acura-aroma-devis.csv'; a.click()
  }

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    closed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  return (
    <div className="min-h-screen bg-ivory font-sans">
      {/* Header */}
      <div className="bg-sage-deep text-white px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌿</span>
          <div>
            <div className="font-serif text-xl font-semibold">Acura Aroma</div>
            <div className="text-[10px] tracking-widest uppercase text-white/50">Admin Dashboard</div>
          </div>
        </div>
        <a href="/fr" className="text-xs text-white/60 hover:text-white transition-colors">← Voir le site</a>
      </div>

      {/* Tabs */}
      <div className="bg-cream border-b border-sage/15 px-8">
        <div className="flex gap-0">
          {(['quotes','products'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`text-xs font-semibold tracking-wider uppercase px-6 py-4 border-b-2 transition-all ${
                tab === t ? 'border-sage-deep text-sage-deep' : 'border-transparent text-[var(--text-soft)] hover:text-sage-deep'
              }`}>
              {t === 'quotes' ? '📋 Demandes de devis' : '🌿 Produits'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {tab === 'quotes' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                ['Total', quotes.length, 'bg-white'],
                ['Nouveaux', quotes.filter(q => q.status === 'new').length, 'bg-blue-50'],
                ['Contactés', quotes.filter(q => q.status === 'contacted').length, 'bg-yellow-50'],
                ['Fermés', quotes.filter(q => q.status === 'closed').length, 'bg-green-50'],
              ].map(([label, count, bg]) => (
                <div key={label as string} className={`${bg} rounded-2xl p-5 border border-sage/10`}>
                  <div className="font-serif text-3xl font-semibold text-sage-deep">{count as number}</div>
                  <div className="text-xs text-[var(--text-soft)] mt-1 tracking-wide">{label as string}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-2xl text-sage-deep">Demandes de devis</h2>
              <button onClick={exportCSV}
                className="bg-sage-deep text-white text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-full hover:bg-sage transition-all">
                ↓ Exporter CSV
              </button>
            </div>

            {loading ? (
              <div className="text-center py-16 text-[var(--text-soft)]">Chargement...</div>
            ) : (
              <div className="bg-white rounded-2xl border border-sage/10 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-cream text-[10px] font-semibold tracking-widest uppercase text-[var(--text-soft)]">
                    <tr>
                      {['#','Nom','Email','Type','Produit','Quantité','Statut','Date','Action'].map(h => (
                        <th key={h} className="text-left px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((q, i) => (
                      <tr key={q.id} className={`border-t border-sage/8 hover:bg-mist/50 transition-colors ${i % 2 === 0 ? '' : 'bg-ivory/50'}`}>
                        <td className="px-4 py-3 text-[var(--text-soft)] text-xs">{q.id}</td>
                        <td className="px-4 py-3 font-medium text-sage-deep">{q.first_name} {q.last_name}</td>
                        <td className="px-4 py-3 text-[var(--text-soft)]">{q.email}</td>
                        <td className="px-4 py-3 text-[var(--text-soft)] text-xs">{q.type_client}</td>
                        <td className="px-4 py-3 text-sage-dark font-medium">{q.product_name}</td>
                        <td className="px-4 py-3 text-[var(--text-soft)] text-xs">{q.quantity}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${statusColors[q.status || 'new']}`}>
                            {q.status || 'new'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[var(--text-soft)] text-xs">
                          {q.created_at ? new Date(q.created_at).toLocaleDateString('fr-FR') : '-'}
                        </td>
                        <td className="px-4 py-3">
                          <select value={q.status || 'new'}
                            onChange={e => updateStatus(q.id!, e.target.value)}
                            className="text-xs border border-sage/20 rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-sage">
                            <option value="new">Nouveau</option>
                            <option value="contacted">Contacté</option>
                            <option value="closed">Fermé</option>
                            <option value="cancelled">Annulé</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                    {quotes.length === 0 && (
                      <tr><td colSpan={9} className="text-center py-12 text-[var(--text-soft)]">Aucune demande de devis pour le moment.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {tab === 'products' && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🌿</div>
            <h2 className="font-serif text-2xl text-sage-deep mb-2">Gestion des produits</h2>
            <p className="text-[var(--text-soft)] text-sm mb-6">Gérez vos produits directement depuis le tableau de bord Supabase.</p>
            <a href="https://supabase.com/dashboard" target="_blank"
              className="bg-sage-deep text-white font-bold text-sm tracking-wider uppercase px-8 py-3 rounded-full hover:bg-sage transition-all">
              Ouvrir Supabase →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
