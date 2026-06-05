import { getTranslations, getLocale } from 'next-intl/server'
import { supabase } from '@/lib/supabase'
import HomeClient from './HomeClient'

export default async function HomePage() {
  const locale = await getLocale()
  const t = await getTranslations()

  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('active', true)
    .eq('featured', true)
    .order('id')
    .limit(6)

  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('*')
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
