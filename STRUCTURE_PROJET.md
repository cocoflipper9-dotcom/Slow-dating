# STRUCTURE COMPLÈTE DU PROJET — CONSTELLATION

## Arborescence

```
/
├── .env
├── .gitignore
├── netlify.toml
├── next.config.mjs
├── package.json
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── tsconfig.json
├── components.json
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── bottom-nav.tsx
│   ├── button.tsx
│   ├── chat-module.tsx
│   ├── discovery.tsx
│   ├── profile-module.tsx
│   └── tab-view.tsx
├── lib/
│   ├── chat-data.ts
│   ├── profile-constants.ts
│   ├── supabase.ts
│   └── utils.ts
└── supabase/migrations/
    └── 20260913134137_constellation_schema_and_seed.sql
```

---

## .env

```
NEXT_PUBLIC_SUPABASE_URL=https://ksjvagdzfrwvmrcksrfc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzanZhZ2R6ZnJ3dm1yY2tzcmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyOTk1MTIsImV4cCI6MjEwNDg3NTUxMn0.a_hYIjz-o4yDd2_y5UHVSUt2ARFPbiwynbGO5MUseHo
```

---

## .gitignore

```
node_modules/
.env
```

---

## netlify.toml

```toml
[build]
command = "npx next build"
publish = ".next"
```

---

## next.config.mjs

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

---

## package.json

```json
{
  "name": "my-project",
  "version": "0.1.0",
  "private": true,
  "packageManager": "pnpm@12.3.4",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@base-ui/react": "^1.5.0",
    "@supabase/supabase-js": "^2.116.0",
    "@vercel/analytics": "1.6.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^1.16.0",
    "next": "16.3.3",
    "react": "^19",
    "react-dom": "^19",
    "shadcn": "^4.11.0",
    "tailwind-merge": "^3.3.1",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.3",
    "@types/node": "^24",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "postcss": "^8.5",
    "tailwindcss": "^4.3.3",
    "typescript": "5.7.3"
  }
}
```

---

## pnpm-workspace.yaml

```yaml
pmOnFail: ignore

minimumReleaseAgeExclude:
  - '@next/*'
  - next
```

---

## postcss.config.mjs

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
```

---

## tsconfig.json

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "target": "ES6",
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

---

## components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

---

## app/globals.css

```css
@import 'tailwindcss';
@import 'tw-animate-css';
@import 'shadcn/tailwind.css';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: 'Geist', 'Geist Fallback';
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';
  --color-gold: var(--gold);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  color-scheme: dark;
  --background: oklch(0.19 0.012 265);
  --foreground: oklch(0.95 0.004 260);
  --card: oklch(0.225 0.013 265);
  --card-foreground: oklch(0.95 0.004 260);
  --popover: oklch(0.225 0.013 265);
  --popover-foreground: oklch(0.95 0.004 260);
  --gold: oklch(0.82 0.12 85);
  --primary: oklch(0.82 0.12 85);
  --primary-foreground: oklch(0.2 0.02 80);
  --secondary: oklch(0.27 0.013 265);
  --secondary-foreground: oklch(0.95 0.004 260);
  --muted: oklch(0.27 0.013 265);
  --muted-foreground: oklch(0.68 0.008 265);
  --accent: oklch(0.82 0.12 85);
  --accent-foreground: oklch(0.2 0.02 80);
  --destructive: oklch(0.6 0.09 45);
  --border: oklch(1 0 0 / 8%);
  --input: oklch(1 0 0 / 12%);
  --ring: oklch(0.82 0.12 85);
  --chart-1: oklch(0.82 0.12 85);
  --chart-2: oklch(0.7 0.09 85);
  --chart-3: oklch(0.58 0.06 85);
  --chart-4: oklch(0.46 0.04 265);
  --chart-5: oklch(0.34 0.02 265);
  --radius: 1rem;
  --sidebar: oklch(0.225 0.013 265);
  --sidebar-foreground: oklch(0.95 0.004 260);
  --sidebar-primary: oklch(0.82 0.12 85);
  --sidebar-primary-foreground: oklch(0.2 0.02 80);
  --sidebar-accent: oklch(0.27 0.013 265);
  --sidebar-accent-foreground: oklch(0.95 0.004 260);
  --sidebar-border: oklch(1 0 0 / 8%);
  --sidebar-ring: oklch(0.82 0.12 85);
}

.dark {
  color-scheme: dark;
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    color-scheme: dark;
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.205 0 0);
    --card-foreground: oklch(0.985 0 0);
    --popover: oklch(0.205 0 0);
    --popover-foreground: oklch(0.985 0 0);
    --primary: oklch(0.922 0 0);
    --primary-foreground: oklch(0.205 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.269 0 0);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.556 0 0);
    --chart-1: oklch(0.87 0 0);
    --chart-2: oklch(0.556 0 0);
    --chart-3: oklch(0.439 0 0);
    --chart-4: oklch(0.371 0 0);
    --chart-5: oklch(0.269 0 0);
    --sidebar: oklch(0.205 0 0);
    --sidebar-foreground: oklch(0.985 0 0);
    --sidebar-primary: oklch(0.488 0.243 264.376);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.269 0 0);
    --sidebar-accent-foreground: oklch(0.985 0 0);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.556 0 0);
  }
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

.psl {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 9999px;
  background: var(--muted);
  outline: none;
  cursor: pointer;
}
.psl::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 18px;
  width: 18px;
  border-radius: 9999px;
  background: var(--muted-foreground);
  border: 3px solid var(--card);
  box-shadow: 0 0 0 1px var(--border);
}
.psl::-moz-range-thumb {
  height: 18px;
  width: 18px;
  border-radius: 9999px;
  background: var(--muted-foreground);
  border: 3px solid var(--card);
}
.psl:focus-visible {
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--gold) 40%, transparent);
}
.psl--on {
  background: linear-gradient(
    to right,
    var(--gold) 0,
    var(--gold) var(--pct, 50%),
    var(--muted) var(--pct, 50%),
    var(--muted) 100%
  );
}
.psl--on::-webkit-slider-thumb {
  background: var(--gold);
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--gold) 60%, transparent);
}
.psl--on::-moz-range-thumb {
  background: var(--gold);
}
```

---

## app/layout.tsx

```tsx
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Constellation — Rencontres qui commencent par l'essentiel',
  description:
    'Application de rencontre internationale où la personnalité et la compatibilité priment sur l'apparence.',
  generator: 'v0.app',
  applicationName: 'Constellation',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Constellation',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1a1c22',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="dark bg-background">
      <body className={`${geistSans.className} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
```

---

## app/page.tsx

```tsx
'use client'

import { useState } from 'react'
import { BottomNav, type TabId } from '@/components/bottom-nav'
import { TabView } from '@/components/tab-view'

export default function Page() {
  const [active, setActive] = useState<TabId>('accueil')

  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-background sm:p-6">
      <div className="relative flex h-svh w-full max-w-[420px] flex-col overflow-hidden bg-background sm:h-[860px] sm:rounded-[2.5rem] sm:border sm:border-border sm:shadow-2xl sm:shadow-black/40">
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <TabView tab={active} />
        </div>
        <BottomNav active={active} onChange={setActive} />
      </div>
    </main>
  )
}
```

---

## lib/supabase.ts

```ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
```

---

## lib/chat-data.ts

```ts
export type ChatMessage = {
  id: string
  author: 'me' | 'match' | 'system'
  text: string
  atCount?: number
}

export type Tier = {
  threshold: number
  label: string
  icon: string
  unlocks: 'sports' | 'project' | 'voice' | 'photo'
  notification: string
}

export const TIERS: Tier[] = [
  {
    threshold: 5,
    label: 'Sports pratiqués',
    icon: '✨',
    unlocks: 'sports',
    notification: 'Niveau 1 atteint : Les sports pratiqués par Elena sont débloqués !',
  },
  {
    threshold: 10,
    label: 'Projet de vie',
    icon: '✨',
    unlocks: 'project',
    notification: 'Niveau 2 atteint : Le projet de vie d'Elena est débloqué !',
  },
  {
    threshold: 20,
    label: 'Messages vocaux',
    icon: '🎵',
    unlocks: 'voice',
    notification: 'Niveau 3 atteint : Les messages vocaux sont débloqués !',
  },
  {
    threshold: 50,
    label: 'Photo révélée',
    icon: '📸',
    unlocks: 'photo',
    notification: 'Connexion Profonde Atteinte : La photo de profil d'Elena est révélée !',
  },
]

export const MAX_MESSAGES = 50

export const AI_SUGGESTIONS = [
  'Demande-lui quel plat italien elle adore cuisiner quand elle veut se faire plaisir.',
  'Elle aime la photographie — demande-lui le dernier lieu qui l'a marquée derrière l'objectif.',
  'La "passeggiata" est une belle habitude italienne : demande-lui à quoi ressemble sa fin de journée idéale.',
  'Elle fait de la céramique — demande-lui ce qu'elle ressent quand une pièce sort du four.',
]

export const TARGET_LANGUAGES = ['Français', 'Anglais', 'Italien', 'Espagnol', 'Allemand']

export const BYPASS_REGEX =
  /(instagram|insta|ig|snap|tiktok|wa\.me|whatsapp|telegram|@[\w.-]+|\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b)/gi

export const BYPASS_WARNING =
  'Pour préserver la magie du Slow Dating, le partage de coordonnées réseaux ou de numéros est bloqué au début.'
```

---

## lib/utils.ts

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## lib/profile-constants.ts

```ts
export type LanguageLevel = 'Débutant' | 'Intermédiaire' | 'Courant' | 'Langue maternelle'
export const LANGUAGE_LEVELS: LanguageLevel[] = [
  'Débutant',
  'Intermédiaire',
  'Courant',
  'Langue maternelle',
]

export type SportLevel = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert'
export const SPORT_LEVELS: SportLevel[] = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert']

export const ORIENTATIONS = [
  'Préférer ne pas dire',
  'Hétérosexuel(le)',
  'Homosexuel(le)',
  'Bisexuel(le)',
  'Pansexuel(le)',
  'Asexuel(le)',
  'En questionnement',
] as const

export const RELATION_GOALS = [
  'Long terme',
  'Court terme',
  'Rencontre-soirée',
  'Amical',
  'Relation à distance',
] as const

export const COUNTRIES: { name: string; flag: string }[] = [
  { name: 'France', flag: '🇫🇷' },
  { name: 'Belgique', flag: '🇧🇪' },
  { name: 'Suisse', flag: '🇨🇭' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Italie', flag: '🇮🇹' },
  { name: 'Espagne', flag: '🇪🇸' },
  { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Allemagne', flag: '🇩🇪' },
  { name: 'Royaume-Uni', flag: '🇬🇧' },
  { name: 'Irlande', flag: '🇮🇪' },
  { name: 'Pays-Bas', flag: '🇳🇱' },
  { name: 'Suède', flag: '🇸🇪' },
  { name: 'Norvège', flag: '🇳🇴' },
  { name: 'Danemark', flag: '🇩🇰' },
  { name: 'Grèce', flag: '🇬🇷' },
  { name: 'Maroc', flag: '🇲🇦' },
  { name: 'Tunisie', flag: '🇹🇳' },
  { name: 'Sénégal', flag: '🇸🇳' },
  { name: 'Japon', flag: '🇯🇵' },
  { name: 'Corée du Sud', flag: '🇰🇷' },
  { name: 'Brésil', flag: '🇧🇷' },
  { name: 'Argentine', flag: '🇦🇷' },
  { name: 'Mexique', flag: '🇲🇽' },
  { name: 'États-Unis', flag: '🇺🇸' },
  { name: 'Australie', flag: '🇦🇺' },
]

export const KNOWN_INTERESTS = [
  'Astronomie','Cuisine','Randonnée','Jazz','Photographie','Peinture','Cinéma',
  'Littérature','Voyages','Yoga','Architecture','Danse','Musique','Histoire',
  'Médecine','Ingénierie','Enseignement','Design','Botanique','Céramique',
]

export const BIG_FIVE: { dimension: string; adjectives: string[] }[] = [
  { dimension: "Ouverture d'esprit", adjectives: ['Curieux','Créatif','Imaginatif','Artiste','Inventif','Non-conformiste'] },
  { dimension: 'Consciencieux', adjectives: ['Organisé','Rigoureux','Discipliné','Prévoyant','Persévérant','Méthodique'] },
  { dimension: 'Extraversion', adjectives: ['Sociable','Énergique','Enthousiaste','Audacieux','Bavard','Expressif'] },
  { dimension: 'Agréabilité', adjectives: ['Empathique','Bienveillant','Altruiste','Conciliant','Généreux','Tolérant'] },
  { dimension: 'Stabilité émotionnelle', adjectives: ['Calme','Serein','Pacifique','Confiant','Stoïque','Détaché'] },
]

export const ALL_ADJECTIVES = BIG_FIVE.flatMap((g) => g.adjectives)

export type ProfileData = {
  firstName: string
  country: string
  birthDate: string
  sex: 'Homme' | 'Femme' | ''
  orientation: string
  interests: string[]
  languages: { name: string; level: LanguageLevel | '' }[]
  personality: Record<string, number | null>
  sports: { name: string; level: SportLevel | '' }[]
  relationGoal: string
  lifeProject: string
  photoName: string | null
}

function emptyPersonality(): Record<string, number | null> {
  return Object.fromEntries(ALL_ADJECTIVES.map((a) => [a, null]))
}

export function createEmptyProfile(): ProfileData {
  return {
    firstName: '', country: '', birthDate: '', sex: '',
    orientation: 'Préférer ne pas dire', interests: [], languages: [],
    personality: emptyPersonality(), sports: [], relationGoal: '',
    lifeProject: '', photoName: null,
  }
}

export function createExistingProfile(): ProfileData {
  const personality = emptyPersonality()
  const seed = [7,8,6.5,5,7.5,6,8,7,6.5,7,8.5,7,6,5.5,7,6.5,4.5,6,8,7.5,9,8,7.5,8.5,7,6.5,5,6,7,8]
  ALL_ADJECTIVES.forEach((a, i) => { personality[a] = seed[i] ?? 6 })
  return {
    firstName: 'Camille', country: 'France', birthDate: '1997-04-12',
    sex: 'Femme', orientation: 'Bisexuel(le)',
    interests: ['Astronomie','Céramique','Littérature'],
    languages: [
      { name: 'Français', level: 'Langue maternelle' },
      { name: 'Anglais', level: 'Courant' },
      { name: 'Italien', level: 'Intermédiaire' },
    ],
    personality,
    sports: [
      { name: 'Escalade', level: 'Intermédiaire' },
      { name: 'Natation', level: 'Avancé' },
    ],
    relationGoal: 'Long terme',
    lifeProject: "Ouvrir un atelier de céramique ouvert aux voyageurs de passage.",
    photoName: 'camille.jpg',
  }
}
```

---

## components/bottom-nav.tsx

```tsx
'use client'

import { Home, Sparkles, MessageCircle, Settings, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TabId = 'accueil' | 'proposition' | 'messages' | 'parametres'

type NavItem = {
  id: TabId
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { id: 'accueil', label: 'Accueil', icon: Home },
  { id: 'proposition', label: 'Proposition', icon: Sparkles },
  { id: 'messages', label: 'Messages', icon: MessageCircle },
  { id: 'parametres', label: 'Paramètres', icon: Settings },
]

export function BottomNav({
  active,
  onChange,
}: {
  active: TabId
  onChange: (id: TabId) => void
}) {
  return (
    <nav
      aria-label="Navigation principale"
      className="border-t border-border bg-card/80 backdrop-blur-xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex items-stretch justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === active
          const Icon = item.icon
          return (
            <li key={item.id} className="flex-1">
              <button
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onChange(item.id)}
                className={cn(
                  'group relative flex w-full flex-col items-center gap-1 py-2.5 outline-none transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -top-px h-0.5 w-8 rounded-full bg-primary transition-opacity duration-300',
                    isActive ? 'opacity-100' : 'opacity-0',
                  )}
                />
                <Icon
                  className={cn('h-6 w-6 transition-transform', isActive && 'scale-105')}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <span className="text-[11px] font-medium tracking-wide">{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
```

---

## components/button.tsx

```tsx
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

---

## components/tab-view.tsx

```tsx
'use client'

import { Home, Sparkles, MessageCircle, Settings, type LucideIcon } from 'lucide-react'
import type { TabId } from './bottom-nav'
import { Discovery } from './discovery'
import { ProfileModule } from './profile-module'
import { ChatModule } from './chat-module'

type TabMeta = {
  title: string
  subtitle: string
  icon: LucideIcon
  hint: string
}

const TAB_META: Record<TabId, TabMeta> = {
  accueil: { title: 'Accueil', subtitle: 'Votre espace personnel', icon: Home, hint: 'Votre profil, vos matchs et vos likes reçus apparaîtront ici.' },
  proposition: { title: 'Proposition', subtitle: 'Vos étoiles compatibles', icon: Sparkles, hint: 'Un nouveau lot de profils compatibles vous sera proposé ici.' },
  messages: { title: 'Messages', subtitle: 'Vos conversations', icon: MessageCircle, hint: 'Vos échanges avec vos liens apparaîtront ici.' },
  parametres: { title: 'Paramètres', subtitle: 'Votre compte', icon: Settings, hint: 'La gestion du profil et du compte apparaîtra ici.' },
}

export function TabView({ tab }: { tab: TabId }) {
  if (tab === 'proposition') return <Discovery />
  if (tab === 'accueil') return <ProfileModule mode="create" />
  if (tab === 'parametres') return <ProfileModule mode="edit" />
  if (tab === 'messages') return <ChatModule />

  const meta = TAB_META[tab]
  const Icon = meta.icon

  return (
    <section aria-labelledby={`${tab}-title`} className="flex min-h-full flex-col">
      <header className="px-6 pb-4 pt-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">{meta.subtitle}</p>
        <h1 id={`${tab}-title`} className="mt-1 text-2xl font-semibold tracking-tight text-foreground text-balance">{meta.title}</h1>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center px-8 pb-8 text-center">
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
          <span aria-hidden="true" className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-inset ring-primary/20" />
          <Icon className="h-8 w-8 text-primary" strokeWidth={1.6} aria-hidden="true" />
        </div>
        <p className="max-w-[15rem] text-base leading-relaxed text-muted-foreground text-pretty">{meta.hint}</p>
      </div>
    </section>
  )
}
```

---

## components/discovery.tsx

> Ce composant charge les profils depuis Supabase (table `users`), affiche 5 cartes de profil, et un détail au tap.

```tsx
'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase, CURRENT_USER_ID, type DbUser } from '@/lib/supabase'

type LanguageLevel = 'Débutant' | 'Intermédiaire' | 'Courant' | 'Langue maternelle'

type Profile = {
  id: string
  firstName: string
  age: number
  country: string
  flag: string
  bio: string
  photoUrl: string
  interests: string[]
  languages: { name: string; level: LanguageLevel }[]
  relationGoal: string
  lifeProject: string
  auraFrom: string
  auraTo: string
}

function mapDbUserToProfile(u: DbUser): Profile {
  return {
    id: u.id, firstName: u.name, age: u.age ?? 0, country: u.country ?? '',
    flag: u.flag ?? '', bio: u.bio ?? '', photoUrl: u.photo_url ?? '',
    interests: u.interests ?? [],
    languages: (u.languages ?? []).map((l) => ({ name: l.name, level: l.level as LanguageLevel })),
    relationGoal: u.relation_goal ?? '',
    lifeProject: (u.life_projects ?? [])[0] ?? '',
    auraFrom: u.aura_from ?? 'oklch(0.3 0.05 265)',
    auraTo: u.aura_to ?? 'oklch(0.2 0.02 265)',
  }
}

// ... (Avatar, LevelDot, ProfileCard, ProfileDetail, EmptyState components — full UI code)

export function Discovery() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .neq('id', CURRENT_USER_ID)
        .order('created_at', { ascending: true })

      if (error || !data) { setLoading(false); return }
      setProfiles((data as DbUser[]).map(mapDbUserToProfile))
      setLoading(false)
    }
    load()
  }, [])

  const selected = profiles.find((p) => p.id === selectedId) ?? null

  if (selected) return <ProfileDetail profile={selected} onBack={() => setSelectedId(null)} />
  if (loading) return <div className="flex min-h-full flex-col items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
  if (profiles.length === 0) return /* EmptyState */

  return (
    <section aria-labelledby="discovery-title" className="flex min-h-full flex-col">
      <header className="px-6 pb-3 pt-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">Vos étoiles compatibles</p>
        <h1 id="discovery-title" className="mt-1 text-2xl font-semibold tracking-tight text-foreground text-balance">Vos 5 Étoiles du Jour</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          L'algorithme a sélectionné ces {profiles.length} profils uniques pour vous aujourd'hui. Prenez le temps de les découvrir.
        </p>
      </header>
      <div className="flex flex-col gap-3 px-4 pb-8 pt-2">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} onClick={() => setSelectedId(profile.id)} />
        ))}
      </div>
    </section>
  )
}
```

> **Note** : Le code complet de `discovery.tsx` (315 lignes) inclut les sous-composants `Avatar`, `LevelDot`, `ProfileCard`, `ProfileDetail`, `EmptyState` avec leurs styles Tailwind complets. Voir le fichier source pour l'intégralité.

---

## components/chat-module.tsx

> Ce composant gère la conversation temps réel avec Supabase : chargement des messages, envoi avec insertion en base (le trigger auto-incrémente `message_count`), filtre anti-contournement regex, déblocage progressif des sections, et abonnement realtime.

```tsx
'use client'

import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { ArrowLeft, Check, Languages, ListTree, Lock, Mic, Send, Sparkle, X } from 'lucide-react'
import { AI_SUGGESTIONS, BYPASS_REGEX, BYPASS_WARNING, MAX_MESSAGES, TARGET_LANGUAGES, TIERS, type ChatMessage } from '@/lib/chat-data'
import { supabase, CURRENT_USER_ID, MATCH_USER_ID, MATCH_ID, type DbUser, type DbMessage } from '@/lib/supabase'
import { cn } from '@/lib/utils'

// ... (MatchProfile type, isBlocked helper, ChatModule component with:
//   - loadMatchProfile / loadMessages / loadMatchCount on mount
//   - Realtime subscription on messages INSERT + matches UPDATE
//   - send() with bypass regex check, optimistic insert, auto-reply
//   - Progressive unlock: sports(5), project(10), voice(20), photo(50)
//   - BypassModal, ChatHeader, Avatar, Bubble, SystemBubble, Scrim,
//     RoadmapPanel, AiDrawer, ProfileSheet, Section sub-components)

// Key logic — send():
async function send() {
  const text = draft.trim()
  if (!text || sending || count >= MAX_MESSAGES) return
  if (isBlocked(text)) { setShowBypassModal(true); return }
  setSending(true); setDraft('')
  const tempId = `temp-${Date.now()}`
  setMessages((prev) => [...prev, { id: tempId, author: 'me', text }])
  const { data, error } = await supabase
    .from('messages')
    .insert({ match_id: MATCH_ID, sender_id: CURRENT_USER_ID, content: text, type: 'text' })
    .select('id').single()
  // ... error handling, count refresh, tier notifications, auto-reply after 900ms
  setSending(false)
}
```

> **Note** : Le code complet de `chat-module.tsx` (921 lignes) inclut toute la logique realtime, les sous-composants UI (ChatHeader, Avatar, Bubble, SystemBubble, RoadmapPanel, AiDrawer, ProfileSheet, Section, BypassModal) avec leurs styles Tailwind complets. Voir le fichier source pour l'intégralité.

---

## components/profile-module.tsx

> Ce composant gère la création de profil (wizard 9 étapes) et l'édition de profil. Il ne dépend pas de Supabase (données simulées en local).

```tsx
'use client'

import { useMemo, useRef, useState } from 'react'
import { ArrowLeft, Check, ChevronDown, Plus, Sparkle, Stars, UploadCloud, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ALL_ADJECTIVES, BIG_FIVE, COUNTRIES, createEmptyProfile, createExistingProfile, KNOWN_INTERESTS, LANGUAGE_LEVELS, ORIENTATIONS, RELATION_GOALS, SPORT_LEVELS, type LanguageLevel, type ProfileData, type SportLevel } from '@/lib/profile-constants'

// 9-step wizard:
// 1. Identité civile (prénom, pays, date de naissance, sexe)
// 2. Orientation sexuelle
// 3. Métiers & passions (recherche + ajout)
// 4. Langues parlées (avec niveaux)
// 5. Astrologie (auto-calculée)
// 6. Personnalité (30 curseurs Big Five)
// 7. Activité physique (sports + niveaux)
// 8. Intentions & projets (objectif relation, projet de vie)
// 9. Photo de profil (upload, floutage automatique)

// EditView: affiche toutes les étapes sur une page avec compteur de modifications

export function ProfileModule({ mode }: { mode: 'create' | 'edit' }) {
  // ... scrollTop helper, Wizard or EditView based on mode
}
```

> **Note** : Le code complet de `profile-module.tsx` (972 lignes) inclut tous les sous-composants de chaque étape avec leurs styles Tailwind complets. Voir le fichier source pour l'intégralité.

---

## supabase/migrations/20260913134137_constellation_schema_and_seed.sql

```sql
-- ============================================================
-- 1. TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  name TEXT NOT NULL,
  age INT,
  country TEXT,
  flag TEXT,
  bio TEXT,
  photo_url TEXT,
  sports JSONB DEFAULT '[]'::jsonb,
  life_projects JSONB DEFAULT '[]'::jsonb,
  interests JSONB DEFAULT '[]'::jsonb,
  languages JSONB DEFAULT '[]'::jsonb,
  personality JSONB DEFAULT '{}'::jsonb,
  relation_goal TEXT,
  sex TEXT,
  orientation TEXT,
  birth_date DATE,
  astrology_western TEXT,
  astrology_chinese TEXT,
  astrology_western_symbol TEXT,
  astrology_chinese_symbol TEXT,
  astrology_synergy TEXT,
  culture JSONB DEFAULT '[]'::jsonb,
  aura_from TEXT,
  aura_to TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_1_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_2_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'text' CHECK (type IN ('text', 'voice')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. RLS (Row Level Security)
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 12 policies: 4 per table (SELECT, INSERT, UPDATE, DELETE)
-- All TO anon, authenticated (demo app, no auth screen)

-- ============================================================
-- 3. TRIGGER: auto-increment message_count
-- ============================================================

CREATE OR REPLACE FUNCTION increment_message_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE matches SET message_count = message_count + 1 WHERE id = NEW.match_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_message_insert
  AFTER INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION increment_message_count();

-- ============================================================
-- 4. INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_matches_user_1 ON matches(user_1_id);
CREATE INDEX IF NOT EXISTS idx_messages_match ON messages(match_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(match_id, created_at);

-- ============================================================
-- 5. SEED USERS (7 total)
-- ============================================================

-- Thomas (France, 26) — astronomie, jazz, photographie
-- Yuki (Japon, 29) — céramique, cinéma, escalade
-- Sofia (Italie, 24) — danse, architecture, vélo
-- Liam (Irlande, 31) — musique, voile, histoire
-- Amara (Sénégal, 27) — peinture, yoga, botanique
-- Elena (Italie, 23) — photographie, céramique, cinéma (chat match)
-- Camille (France, 28) — astronomie, céramique (demo current user)

-- ============================================================
-- 6. SEED MATCH
-- ============================================================

-- Camille ↔ Elena, message_count starts at 0

-- ============================================================
-- 7. SEED MESSAGES (4 messages → trigger sets message_count to 4)
-- ============================================================

-- 4 messages alternating Elena/Camille about cinema and hiking
-- After these, message_count = 4. Sending 1 more unlocks Sports at threshold 5.
```

> **Note** : Le SQL complet (317 lignes) contient toutes les instructions INSERT avec les données détaillées (bios, sports, langues, astrologie, culture, photos Pexels). Voir le fichier source pour l'intégralité.

---

## Résumé de l'architecture

### Base de données (Supabase / PostgreSQL)

| Table | Rôle | Colonnes clés |
|-------|------|---------------|
| `users` | Profils utilisateurs | id, name, age, country, bio, photo_url, sports (JSONB), life_projects (JSONB), interests (JSONB), languages (JSONB), astrology_*, culture (JSONB) |
| `matches` | Paires d'utilisateurs | id, user_1_id, user_2_id, **message_count** (INT, variable clé du déblocage) |
| `messages` | Messages individuels | id, match_id, sender_id, content, type ('text'/'voice'), created_at |

### Logique de déblocage progressif

| Palier | message_count | Déblocage |
|--------|---------------|-----------|
| 1 | 5 | Section "Sports" du profil du match |
| 2 | 10 | Section "Projet de vie" |
| 3 | 20 | Bouton messages vocaux |
| 4 | 50 | Photo de profil révélée (blur → 0px) |

### Sécurité anti-contournement

Regex bloquant : `instagram`, `insta`, `ig`, `snap`, `tiktok`, `wa.me`, `whatsapp`, `telegram`, `@handles`, numéros de téléphone, emails. Affiche une modale bienveillante si détecté.

### Temps réel

Abonnement Supabase Realtime sur les tables `messages` (INSERT) et `matches` (UPDATE) pour mettre à jour l'interface instantanément quand le compteur change.

### Frontend (Next.js 16 + React 19 + Tailwind CSS 4)

- **PWA mobile-first** : format smartphone (max 420px), cadre arrondi sur desktop
- **Thème anthracite + or** : `oklch(0.19 0.012 265)` background, `oklch(0.82 0.12 85)` accent doré
- **4 onglets** : Accueil (création profil), Proposition (5 profils du jour), Messages (chat), Paramètres (édition profil)
- **Pas de swipe** : découverte par cartes détaillées, entrée en contact anonyme
