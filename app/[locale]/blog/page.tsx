export const dynamic = 'force-dynamic'

import { getLocale } from 'next-intl/server'
import { supabase, TABLES } from '@/lib/supabase'
import BlogClient from './BlogClient'

export default async function BlogPage() {
  const locale = await getLocale()
  const { data: posts } = await supabase
    .from(TABLES.blog)
    .select('*')
    .eq('active', true)
    .order('published_at', { ascending: false })
  return <BlogClient locale={locale} posts={posts || []} />
}
