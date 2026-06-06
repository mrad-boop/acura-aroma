export const dynamic = 'force-dynamic'
export const dynamicParams = true

import { getLocale } from 'next-intl/server'
import { supabase, TABLES } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const locale = await getLocale()

  const { data: product } = await supabase
    .from(TABLES.products)
    .select(`*, category:${TABLES.categories}(*)`)
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (!product) notFound()

  const { data: related } = await supabase
    .from(TABLES.products)
    .select('*')
    .eq('active', true)
    .eq('type', product.type)
    .neq('id', product.id)
    .limit(3)

  return <ProductDetailClient locale={locale} product={product} related={related || []} />
}
