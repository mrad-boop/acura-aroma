export const dynamic = 'force-dynamic'

import { getLocale } from 'next-intl/server'
import { supabase, TABLES } from '@/lib/supabase'
import ProductsClient from './ProductsClient'

export default async function ProductsPage() {
  const locale = await getLocale()

  const { data: products } = await supabase
    .from(TABLES.products)
    .select(`*, category:${TABLES.categories}(*)`)
    .eq('active', true)
    .order('type')
    .order('name_fr')

  const { data: categories } = await supabase
    .from(TABLES.categories)
    .select('*')
    .order('name_fr')

  return <ProductsClient locale={locale} products={products || []} categories={categories || []} />
}
