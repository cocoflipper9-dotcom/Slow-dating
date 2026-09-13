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
