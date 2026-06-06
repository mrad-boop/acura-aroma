import { getLocale } from 'next-intl/server'
import { supabase, TABLES } from '@/lib/supabase'
import HomeClient from './HomeClient'

export default async function HomePage() {
  const locale = await getLocale()

  const { data: featuredProducts } = await supabase
    .from(TABLES.products)
    .select(`*, category:${TABLES.categories}(*)`)
    .eq('active', true)
    .eq('featured', true)
    .order('id')
    .limit(6)

  const { data: blogPosts } = await supabase
    .from(TABLES.blog)
    .select('*')
    .eq('active', true)
    .order('published_at', { ascending: false })
    .limit(3)

  return (
    <HomeClient
      locale={locale}
      featuredProducts={featuredProducts || []}
      blogPosts={blogPosts || []}
    />
  )
}
