import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fixed IDs from seed data
export const CURRENT_USER_ID = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' // Camille
export const MATCH_USER_ID = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12' // Elena
export const MATCH_ID = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380b01'

export type DbUser = {
  id: string
  email: string | null
  name: string
  age: number | null
  country: string | null
  flag: string | null
  bio: string | null
  photo_url: string | null
  sports: { name: string; level: string }[]
  life_projects: string[]
  interests: string[]
  languages: { name: string; level: string }[]
  relation_goal: string | null
  sex: string | null
  orientation: string | null
  birth_date: string | null
  astrology_western: string | null
  astrology_western_symbol: string | null
  astrology_chinese: string | null
  astrology_chinese_symbol: string | null
  astrology_synergy: string | null
  culture: string[]
  aura_from: string | null
  aura_to: string | null
}

export type DbMessage = {
  id: string
  match_id: string
  sender_id: string
  content: string
  type: string
  created_at: string
}

export type DbMatch = {
  id: string
  user_1_id: string
  user_2_id: string
  message_count: number
  created_at: string
}
