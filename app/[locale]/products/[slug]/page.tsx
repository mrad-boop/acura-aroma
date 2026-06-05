import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'
import { getLocale } from 'next-intl/server'

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const locale = await getLocale()

  const { data: product } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (!product) notFound()

  const { data: related } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('type', product.type)
    .neq('id', product.id)
    .limit(3)

  return <ProductDetailClient locale={locale} product={product} related={related || []} />
}

export async function generateStaticParams() {
  const { data } = await supabase.from('products').select('slug').eq('active', true)
  return (data || []).map(p => ({ slug: p.slug }))
}
