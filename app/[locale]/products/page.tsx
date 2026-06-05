import { supabase } from '@/lib/supabase'
import ProductsClient from './ProductsClient'
import { getLocale } from 'next-intl/server'

export default async function ProductsPage() {
  const locale = await getLocale()

  const { data: products } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('active', true)
    .order('type')
    .order('name_fr')

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name_fr')

  return <ProductsClient locale={locale} products={products || []} categories={categories || []} />
}
