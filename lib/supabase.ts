import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zixbpwwjweonianynvsq.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppeGJwd3dqd2VvbmlhbnludnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNTYyOTQsImV4cCI6MjA5NTgzMjI5NH0.5ndkLhjM5v8xtW-BfenVwPEdQlQs_a6DWXXffCRD0N8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Category = {
  id: number
  name_fr: string
  name_en: string
  slug: string
  icon: string
  description_fr: string
  description_en: string
}

export type Product = {
  id: number
  name_fr: string
  name_en: string
  slug: string
  description_fr: string
  description_en: string
  benefits_fr: string
  benefits_en: string
  usage_fr: string
  usage_en: string
  category_id: number
  category?: Category
  image_url: string | null
  emoji: string
  type: 'eau' | 'huile'
  tags_fr: string[]
  tags_en: string[]
  featured: boolean
  active: boolean
  color_from: string
  color_to: string
}

export type Quote = {
  id?: number
  first_name: string
  last_name: string
  email: string
  phone?: string
  country?: string
  type_client: string
  product_name?: string
  product_id?: number
  quantity?: string
  message?: string
  status?: string
  locale?: string
  created_at?: string
}

export type BlogPost = {
  id: number
  title_fr: string
  title_en: string
  slug: string
  excerpt_fr: string
  excerpt_en: string
  content_fr: string
  content_en: string
  image_url: string | null
  emoji: string
  category: string
  published_at: string
}

export const TABLES = {
  categories: 'aa_categories',
  products:   'aa_products',
  quotes:     'aa_quotes',
  blog:       'aa_blog_posts',
} as const
