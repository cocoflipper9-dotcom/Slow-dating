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
    id: u.id,
    firstName: u.name,
    age: u.age ?? 0,
    country: u.country ?? '',
    flag: u.flag ?? '',
    bio: u.bio ?? '',
    photoUrl: u.photo_url ?? '',
    interests: u.interests ?? [],
    languages: (u.languages ?? []).map((l) => ({
      name: l.name,
      level: l.level as LanguageLevel,
    })),
    relationGoal: u.relation_goal ?? '',
    lifeProject: (u.life_projects ?? [])[0] ?? '',
    auraFrom: u.aura_from ?? 'oklch(0.3 0.05 265)',
    auraTo: u.aura_to ?? 'oklch(0.2 0.02 265)',
  }
}

function Avatar({ profile, size = 'md' }: { profile: Profile; size?: 'md' | 'lg' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative shrink-0 overflow-hidden rounded-2xl ring-1 ring-inset ring-white/10',
        size === 'md' ? 'h-14 w-14' : 'h-20 w-20',
      )}
      style={{
        backgroundImage: `radial-gradient(120% 120% at 30% 20%, ${profile.auraFrom}, ${profile.auraTo})`,
      }}
    >
      <span
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 9px)',
        }}
      />
      <span className="absolute -right-3 -top-3 h-10 w-10 rounded-full bg-primary/10 blur-md" />
    </span>
  )
}

function LevelDot({ level }: { level: LanguageLevel }) {
  const filled =
    level === 'Langue maternelle' ? 4 : level === 'Courant' ? 3 : level === 'Intermédiaire' ? 2 : 1
  return (
    <span className="ml-1.5 inline-flex items-center gap-0.5 align-middle" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn('h-1 w-1 rounded-full', i < filled ? 'bg-primary' : 'bg-muted-foreground/30')}
        />
      ))}
    </span>
  )
}

function ProfileCard({ profile, onClick }: { profile: Profile; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-2xl border border-border bg-card/60 p-4 text-left outline-none ring-primary/40 transition-colors hover:border-primary/30 focus-visible:ring-2"
    >
      <div className="flex items-start gap-4">
        <Avatar profile={profile} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="truncate text-base font-semibold text-foreground">
              {profile.firstName}, {profile.age} ans
            </h3>
            <span className="shrink-0 text-sm text-muted-foreground">
              <span aria-hidden="true">{profile.flag}</span>{' '}
              <span className="align-middle">{profile.country}</span>
            </span>
          </div>
          {profile.bio && (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground text-pretty">
              {profile.bio}
            </p>
          )}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
              >
                {interest}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {profile.languages.map((lang) => (
              <span key={lang.name} className="inline-flex items-center">
                {lang.name}
                <LevelDot level={lang.level} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  )
}

function ProfileDetail({ profile, onBack }: { profile: Profile; onBack: () => void }) {
  return (
    <section aria-labelledby="detail-title" className="flex min-h-full flex-col">
      <header className="px-6 pb-4 pt-6">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          Retour aux étoiles
        </button>

        <div className="flex items-center gap-4">
          <Avatar profile={profile} size="lg" />
          <div>
            <h1 id="detail-title" className="text-2xl font-semibold tracking-tight text-foreground">
              {profile.firstName}, {profile.age} ans
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              <span aria-hidden="true">{profile.flag}</span> {profile.country}
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-6 px-6 pb-8">
        {profile.bio && (
          <p className="text-[15px] leading-relaxed text-foreground text-pretty">{profile.bio}</p>
        )}

        <div className="flex flex-wrap gap-1.5">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
            >
              {interest}
            </span>
          ))}
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Langues parlées
          </p>
          <div className="mt-2 flex flex-col gap-1.5">
            {profile.languages.map((lang) => (
              <div key={lang.name} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{lang.name}</span>
                <span className="text-muted-foreground">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/60 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            Objectif de relation
          </p>
          <p className="mt-1.5 text-base text-foreground">{profile.relationGoal}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card/60 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            Projets de vie
          </p>
          <p className="mt-1.5 text-base leading-relaxed text-foreground text-pretty">
            {profile.lifeProject}
          </p>
        </div>
      </div>

      <div
        className="sticky bottom-0 border-t border-border bg-background/90 px-6 py-4 backdrop-blur-xl"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <button
          type="button"
          className="w-full rounded-2xl bg-primary py-3.5 text-base font-semibold text-primary-foreground outline-none ring-primary/40 transition-opacity hover:opacity-90 focus-visible:ring-2"
        >
          Entrer en contact anonyme
        </button>
      </div>
    </section>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-inset ring-primary/20"
        />
        <Sparkles className="h-8 w-8 text-primary" strokeWidth={1.6} aria-hidden="true" />
      </div>
      <p className="max-w-[17rem] text-base leading-relaxed text-muted-foreground text-pretty">
        Nos algorithmes cherchent vos étoiles compatibles, revenez d&apos;ici 3 jours.
      </p>
    </div>
  )
}

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

      if (error || !data) {
        setLoading(false)
        return
      }
      setProfiles((data as DbUser[]).map(mapDbUserToProfile))
      setLoading(false)
    }
    load()
  }, [])

  const selected = profiles.find((p) => p.id === selectedId) ?? null

  if (selected) {
    return <ProfileDetail profile={selected} onBack={() => setSelectedId(null)} />
  }

  if (loading) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden="true" />
      </div>
    )
  }

  if (profiles.length === 0) {
    return (
      <section aria-labelledby="discovery-title" className="flex min-h-full flex-col">
        <header className="px-6 pb-4 pt-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            Vos étoiles compatibles
          </p>
          <h1 id="discovery-title" className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
            Vos 5 Étoiles du Jour
          </h1>
        </header>
        <EmptyState />
      </section>
    )
  }

  return (
    <section aria-labelledby="discovery-title" className="flex min-h-full flex-col">
      <header className="px-6 pb-3 pt-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
          Vos étoiles compatibles
        </p>
        <h1 id="discovery-title" className="mt-1 text-2xl font-semibold tracking-tight text-foreground text-balance">
          Vos 5 Étoiles du Jour
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          L&apos;algorithme a sélectionné ces {profiles.length} profils uniques pour vous aujourd&apos;hui. Prenez le
          temps de les découvrir.
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
