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
  accueil: {
    title: 'Accueil',
    subtitle: 'Votre espace personnel',
    icon: Home,
    hint: 'Votre profil, vos matchs et vos likes reçus apparaîtront ici.',
  },
  proposition: {
    title: 'Proposition',
    subtitle: 'Vos étoiles compatibles',
    icon: Sparkles,
    hint: 'Un nouveau lot de profils compatibles vous sera proposé ici.',
  },
  messages: {
    title: 'Messages',
    subtitle: 'Vos conversations',
    icon: MessageCircle,
    hint: 'Vos échanges avec vos liens apparaîtront ici.',
  },
  parametres: {
    title: 'Paramètres',
    subtitle: 'Votre compte',
    icon: Settings,
    hint: 'La gestion du profil et du compte apparaîtra ici.',
  },
}

export function TabView({ tab }: { tab: TabId }) {
  if (tab === 'proposition') {
    return <Discovery />
  }

  if (tab === 'accueil') {
    return <ProfileModule mode="create" />
  }

  if (tab === 'parametres') {
    return <ProfileModule mode="edit" />
  }

  if (tab === 'messages') {
    return <ChatModule />
  }

  const meta = TAB_META[tab]
  const Icon = meta.icon

  return (
    <section aria-labelledby={`${tab}-title`} className="flex min-h-full flex-col">
      <header className="px-6 pb-4 pt-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
          {meta.subtitle}
        </p>
        <h1
          id={`${tab}-title`}
          className="mt-1 text-2xl font-semibold tracking-tight text-foreground text-balance"
        >
          {meta.title}
        </h1>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-8 pb-8 text-center">
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-inset ring-primary/20"
          />
          <Icon className="h-8 w-8 text-primary" strokeWidth={1.6} aria-hidden="true" />
        </div>
        <p className="max-w-[15rem] text-base leading-relaxed text-muted-foreground text-pretty">
          {meta.hint}
        </p>
      </div>
    </section>
  )
}
