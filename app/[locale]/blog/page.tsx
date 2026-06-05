import { supabase } from '@/lib/supabase'
import BlogClient from './BlogClient'
import { getLocale } from 'next-intl/server'

export default async function BlogPage() {
  const locale = await getLocale()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })
  return <BlogClient locale={locale} posts={posts || []} />
}
