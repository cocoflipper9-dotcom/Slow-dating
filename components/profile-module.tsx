'use client'

import { useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Plus,
  Sparkle,
  Stars,
  UploadCloud,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  ALL_ADJECTIVES,
  BIG_FIVE,
  COUNTRIES,
  createEmptyProfile,
  createExistingProfile,
  KNOWN_INTERESTS,
  LANGUAGE_LEVELS,
  ORIENTATIONS,
  RELATION_GOALS,
  SPORT_LEVELS,
  type LanguageLevel,
  type ProfileData,
  type SportLevel,
} from '@/lib/profile-constants'

/* ---------------------------------------------------------------- primitives */

function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string
  hint?: string
  htmlFor?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {hint ? <p className="-mt-1 text-xs leading-relaxed text-muted-foreground">{hint}</p> : null}
      {children}
    </div>
  )
}

const inputClasses =
  'w-full rounded-xl border border-input bg-secondary/40 px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20'

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClasses, props.className)} />
}

function SelectMenu({
  value,
  onChange,
  children,
  id,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  children: React.ReactNode
  id?: string
  placeholder?: string
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputClasses, 'appearance-none pr-10', value === '' && 'text-muted-foreground/60')}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  )
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-4 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/30',
        active
          ? 'border-primary bg-primary/15 text-primary'
          : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}

/* --------------------------------------------------------------- step 1 */

function StepIdentity({
  data,
  update,
}: {
  data: ProfileData
  update: (p: Partial<ProfileData>) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <Field label="Prénom" htmlFor="firstName">
        <TextInput
          id="firstName"
          value={data.firstName}
          onChange={(e) => update({ firstName: e.target.value })}
          placeholder="Votre prénom"
          autoComplete="given-name"
        />
      </Field>

      <Field label="Pays de résidence" htmlFor="country">
        <SelectMenu
          id="country"
          value={data.country}
          onChange={(v) => update({ country: v })}
          placeholder="Sélectionnez un pays"
        >
          {COUNTRIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.flag} {c.name}
            </option>
          ))}
        </SelectMenu>
      </Field>

      <Field label="Date de naissance" htmlFor="birthDate">
        <TextInput
          id="birthDate"
          type="date"
          value={data.birthDate}
          onChange={(e) => update({ birthDate: e.target.value })}
        />
      </Field>

      <Field label="Sexe">
        <div className="grid grid-cols-2 gap-3">
          {(['Homme', 'Femme'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => update({ sex: s })}
              aria-pressed={data.sex === s}
              className={cn(
                'rounded-xl border py-3 text-[15px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/30',
                data.sex === s
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </Field>
    </div>
  )
}

/* --------------------------------------------------------------- step 2 */

function StepOrientation({
  data,
  update,
}: {
  data: ProfileData
  update: (p: Partial<ProfileData>) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <Field label="Orientation sexuelle" hint="Vous pourrez modifier ce choix à tout moment.">
        <div className="flex flex-col gap-2">
          {ORIENTATIONS.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => update({ orientation: o })}
              aria-pressed={data.orientation === o}
              className={cn(
                'flex items-center justify-between rounded-xl border px-4 py-3 text-left text-[15px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/30',
                data.orientation === o
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground',
              )}
            >
              {o}
              {data.orientation === o ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
            </button>
          ))}
        </div>
      </Field>
    </div>
  )
}

/* --------------------------------------------------------------- step 3 */

function TagBadge({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 py-1 pl-3 pr-1.5 text-sm text-primary">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Retirer ${label}`}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full text-primary/70 transition-colors hover:bg-primary/20 hover:text-primary"
      >
        <X className="h-3 w-3" aria-hidden="true" />
      </button>
    </span>
  )
}

function StepInterests({
  data,
  update,
}: {
  data: ProfileData
  update: (p: Partial<ProfileData>) => void
}) {
  const [query, setQuery] = useState('')
  const trimmed = query.trim()
  const exists = KNOWN_INTERESTS.some((k) => k.toLowerCase() === trimmed.toLowerCase())
  const alreadyAdded = data.interests.some((i) => i.toLowerCase() === trimmed.toLowerCase())

  function add(term: string) {
    const clean = term.trim()
    if (!clean || data.interests.some((i) => i.toLowerCase() === clean.toLowerCase())) return
    update({ interests: [...data.interests, clean] })
    setQuery('')
  }

  return (
    <div className="flex flex-col gap-4">
      <Field
        label="Métiers & passions"
        hint="Recherchez un terme puis validez. Aucune suggestion n'est proposée automatiquement."
      >
        <TextInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              e.preventDefault()
              if (trimmed && exists) add(trimmed)
            }
          }}
          placeholder="Ex : Astronomie, Médecine, Jazz…"
        />
      </Field>

      {trimmed && !exists && !alreadyAdded ? (
        <button
          type="button"
          onClick={() => add(trimmed)}
          className="inline-flex items-center gap-1.5 self-start rounded-lg border border-dashed border-primary/40 px-3 py-2 text-sm text-primary/90 outline-none transition-colors hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Ajouter «&nbsp;{trimmed}&nbsp;» à la base collaborative
        </button>
      ) : null}

      {trimmed && exists && !alreadyAdded ? (
        <button
          type="button"
          onClick={() => add(trimmed)}
          className="inline-flex items-center gap-1.5 self-start rounded-lg px-1 py-1 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Ajouter «&nbsp;{trimmed}&nbsp;»
        </button>
      ) : null}

      {data.interests.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.interests.map((i) => (
            <TagBadge
              key={i}
              label={i}
              onRemove={() => update({ interests: data.interests.filter((x) => x !== i) })}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground/70">Aucun métier ou passion ajouté pour l&apos;instant.</p>
      )}
    </div>
  )
}

/* --------------------------------------------------------------- step 4 */

function LevelSelect<T extends string>({
  value,
  levels,
  onChange,
  ariaLabel,
}: {
  value: string
  levels: readonly T[]
  onChange: (v: T) => void
  ariaLabel: string
}) {
  return (
    <div className="relative">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={cn(
          'w-full appearance-none rounded-lg border border-input bg-secondary/40 py-2 pl-3 pr-8 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
          value === '' ? 'text-muted-foreground/60' : 'text-foreground',
        )}
      >
        <option value="" disabled>
          Niveau
        </option>
        {levels.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  )
}

function StepLanguages({
  data,
  update,
}: {
  data: ProfileData
  update: (p: Partial<ProfileData>) => void
}) {
  function setLang(idx: number, patch: Partial<ProfileData['languages'][number]>) {
    update({
      languages: data.languages.map((l, i) => (i === idx ? { ...l, ...patch } : l)),
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Ajoutez les langues que vous parlez et précisez votre niveau. Au moins une langue doit être
        votre <span className="text-foreground">langue maternelle</span> pour continuer.
      </p>

      <div className="flex flex-col gap-3">
        {data.languages.map((lang, idx) => (
          <div key={idx} className="rounded-xl border border-border bg-card/50 p-3">
            <div className="flex items-center gap-2">
              <TextInput
                value={lang.name}
                onChange={(e) => setLang(idx, { name: e.target.value })}
                placeholder="Langue"
                className="flex-1 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => update({ languages: data.languages.filter((_, i) => i !== idx) })}
                aria-label="Retirer la langue"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-2">
              <LevelSelect
                ariaLabel={`Niveau pour ${lang.name || 'la langue'}`}
                value={lang.level}
                levels={LANGUAGE_LEVELS}
                onChange={(v: LanguageLevel) => setLang(idx, { level: v })}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => update({ languages: [...data.languages, { name: '', level: '' }] })}
        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-primary/40 py-3 text-sm text-primary outline-none transition-colors hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Ajouter une langue
      </button>
    </div>
  )
}

/* --------------------------------------------------------------- step 5 */

function StepAstrology() {
  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-inset ring-primary/20"
        />
        <Stars className="h-10 w-10 text-primary" strokeWidth={1.4} aria-hidden="true" />
      </div>
      <p className="max-w-[18rem] text-[15px] leading-relaxed text-muted-foreground text-pretty">
        {
          'Vos signes astrologiques occidental et chinois seront calculés et intégrés automatiquement à votre profil grâce à votre date de naissance.'
        }
      </p>
    </div>
  )
}

/* --------------------------------------------------------------- step 6 */

function PersonalitySlider({
  label,
  value,
  onChange,
}: {
  label: string
  value: number | null
  onChange: (v: number) => void
}) {
  const touched = value !== null
  const current = touched ? value : 5.5
  const pct = ((current - 1) / 9) * 100

  return (
    <div className="py-2">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className={cn('text-sm', touched ? 'text-foreground' : 'text-muted-foreground')}>
          {label}
        </span>
        <span
          className={cn(
            'tabular-nums text-sm',
            touched ? 'font-semibold text-primary' : 'text-muted-foreground/40',
          )}
        >
          {touched ? current.toFixed(1) : '—'}
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        step={0.5}
        value={current}
        aria-label={label}
        className={cn('psl', touched && 'psl--on')}
        style={{ ['--pct' as string]: `${pct}%` } as React.CSSProperties}
        onPointerDown={() => {
          if (!touched) onChange(5.5)
        }}
        onKeyDown={() => {
          if (!touched) onChange(5.5)
        }}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  )
}

function StepPersonality({
  data,
  update,
}: {
  data: ProfileData
  update: (p: Partial<ProfileData>) => void
}) {
  const touchedCount = ALL_ADJECTIVES.filter((a) => data.personality[a] !== null).length

  function setAdj(adj: string, v: number) {
    update({ personality: { ...data.personality, [adj]: v } })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card/50 p-3 text-sm text-muted-foreground">
        Réglez chaque curseur au moins une fois. Un curseur gris n&apos;a pas encore été ajusté.
        <span className="mt-1 block font-medium text-foreground">
          {touchedCount} / 30 ajustés
        </span>
      </div>

      {BIG_FIVE.map((group) => (
        <div key={group.dimension}>
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
            {group.dimension}
          </h3>
          <div className="divide-y divide-border/60">
            {group.adjectives.map((adj) => (
              <PersonalitySlider
                key={adj}
                label={adj}
                value={data.personality[adj]}
                onChange={(v) => setAdj(adj, v)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* --------------------------------------------------------------- step 7 */

function StepSports({
  data,
  update,
}: {
  data: ProfileData
  update: (p: Partial<ProfileData>) => void
}) {
  const [query, setQuery] = useState('')

  function addSport(term: string) {
    const clean = term.trim()
    if (!clean || data.sports.some((s) => s.name.toLowerCase() === clean.toLowerCase())) return
    update({ sports: [...data.sports, { name: clean, level: '' }] })
    setQuery('')
  }

  function setSport(idx: number, patch: Partial<ProfileData['sports'][number]>) {
    update({ sports: data.sports.map((s, i) => (i === idx ? { ...s, ...patch } : s)) })
  }

  return (
    <div className="flex flex-col gap-4">
      <Field label="Activité physique" hint="Ajoutez un ou plusieurs sports et précisez votre niveau.">
        <div className="flex items-center gap-2">
          <TextInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                e.preventDefault()
                addSport(query)
              }
            }}
            placeholder="Rechercher un sport…"
          />
          <button
            type="button"
            onClick={() => addSport(query)}
            aria-label="Ajouter le sport"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/40 text-primary transition-colors hover:bg-primary/10"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </Field>

      {data.sports.length > 0 ? (
        <div className="flex flex-col gap-3">
          {data.sports.map((sport, idx) => (
            <div
              key={sport.name}
              className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3"
            >
              <span className="flex-1 text-[15px] text-foreground">{sport.name}</span>
              <div className="w-40">
                <LevelSelect
                  ariaLabel={`Niveau pour ${sport.name}`}
                  value={sport.level}
                  levels={SPORT_LEVELS}
                  onChange={(v: SportLevel) => setSport(idx, { level: v })}
                />
              </div>
              <button
                type="button"
                onClick={() => update({ sports: data.sports.filter((_, i) => i !== idx) })}
                aria-label={`Retirer ${sport.name}`}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground/70">Aucun sport ajouté pour l&apos;instant.</p>
      )}
    </div>
  )
}

/* --------------------------------------------------------------- step 8 */

function StepIntentions({
  data,
  update,
}: {
  data: ProfileData
  update: (p: Partial<ProfileData>) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <Field label="Objectif de relation">
        <div className="grid grid-cols-1 gap-3">
          {RELATION_GOALS.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => update({ relationGoal: goal })}
              aria-pressed={data.relationGoal === goal}
              className={cn(
                'flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-[15px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/30',
                data.relationGoal === goal
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-border bg-secondary/40 text-foreground hover:border-primary/30',
              )}
            >
              {goal}
              {data.relationGoal === goal ? (
                <Check className="h-5 w-5" aria-hidden="true" />
              ) : (
                <span
                  aria-hidden="true"
                  className="h-4 w-4 rounded-full border border-muted-foreground/40"
                />
              )}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Projets de vie" htmlFor="lifeProject">
        <TextInput
          id="lifeProject"
          value={data.lifeProject}
          onChange={(e) => update({ lifeProject: e.target.value })}
          placeholder="En quelques mots, ce qui vous fait avancer…"
          maxLength={140}
        />
      </Field>
    </div>
  )
}

/* --------------------------------------------------------------- step 9 */

function StepPhoto({
  data,
  update,
}: {
  data: ProfileData
  update: (p: Partial<ProfileData>) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <label
        htmlFor="photo"
        className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/5 px-6 py-12 text-center transition-colors hover:bg-primary/10"
      >
        {data.photoName ? (
          <>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
              <Check className="h-6 w-6 text-primary" aria-hidden="true" />
            </span>
            <span className="text-[15px] font-medium text-foreground">{data.photoName}</span>
            <span className="text-xs text-muted-foreground">Toucher pour remplacer</span>
          </>
        ) : (
          <>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
              <UploadCloud className="h-6 w-6 text-primary" aria-hidden="true" />
            </span>
            <span className="text-[15px] font-medium text-foreground">
              Importer une photo de profil
            </span>
            <span className="text-xs text-muted-foreground">JPG ou PNG</span>
          </>
        )}
        <input
          id="photo"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => update({ photoName: e.target.files?.[0]?.name ?? data.photoName })}
        />
      </label>

      <p className="text-[15px] font-bold leading-relaxed text-foreground text-pretty">
        Votre photo sera automatiquement floutée par notre algorithme. Elle ne sera révélée à vos
        correspondants qu&apos;au bout de 40 messages échangés, lorsque vous aurez créé un lien
        profond.
      </p>
    </div>
  )
}

/* --------------------------------------------------------------- step registry */

const STEPS: {
  title: string
  subtitle: string
  render: (p: { data: ProfileData; update: (patch: Partial<ProfileData>) => void }) => React.ReactNode
}[] = [
  { title: 'Identité civile', subtitle: 'Étape 1', render: (p) => <StepIdentity {...p} /> },
  { title: 'Orientation', subtitle: 'Étape 2', render: (p) => <StepOrientation {...p} /> },
  { title: 'Métiers & passions', subtitle: 'Étape 3', render: (p) => <StepInterests {...p} /> },
  { title: 'Langues parlées', subtitle: 'Étape 4', render: (p) => <StepLanguages {...p} /> },
  { title: 'Astrologie', subtitle: 'Étape 5', render: () => <StepAstrology /> },
  { title: 'Personnalité', subtitle: 'Étape 6', render: (p) => <StepPersonality {...p} /> },
  { title: 'Activité physique', subtitle: 'Étape 7', render: (p) => <StepSports {...p} /> },
  { title: 'Intentions & projets', subtitle: 'Étape 8', render: (p) => <StepIntentions {...p} /> },
  { title: 'Photo de profil', subtitle: 'Étape 9', render: (p) => <StepPhoto {...p} /> },
]

/* --------------------------------------------------------------- validation */

function canProceed(step: number, data: ProfileData): boolean {
  switch (step) {
    case 0:
      return (
        data.firstName.trim() !== '' &&
        data.country !== '' &&
        data.birthDate !== '' &&
        data.sex !== ''
      )
    case 3:
      return data.languages.some((l) => l.name.trim() !== '' && l.level === 'Langue maternelle')
    case 5:
      return ALL_ADJECTIVES.every((a) => data.personality[a] !== null)
    case 7:
      return data.relationGoal !== ''
    default:
      return true
  }
}

/* --------------------------------------------------------------- wizard */

function Wizard({ scrollTop }: { scrollTop: () => void }) {
  const [data, setData] = useState<ProfileData>(createEmptyProfile)
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  const update = (patch: Partial<ProfileData>) => setData((d) => ({ ...d, ...patch }))
  const meta = STEPS[step]
  const isLast = step === STEPS.length - 1
  const proceed = canProceed(step, data)

  function next() {
    if (!proceed) return
    if (isLast) {
      setDone(true)
      scrollTop()
      return
    }
    setStep((s) => s + 1)
    scrollTop()
  }

  function back() {
    if (step === 0) return
    setStep((s) => s - 1)
    scrollTop()
  }

  if (done) {
    return (
      <section className="flex min-h-full flex-col items-center justify-center px-8 py-16 text-center">
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-inset ring-primary/20" />
          <Sparkle className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Profil créé, {data.firstName || 'bienvenue'}.
        </h1>
        <p className="mt-2 max-w-[17rem] text-[15px] leading-relaxed text-muted-foreground text-pretty">
          Nos algorithmes commencent à chercher vos étoiles compatibles.
        </p>
      </section>
    )
  }

  return (
    <section className="flex min-h-full flex-col">
      <header className="px-6 pb-4 pt-8">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour
          </button>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
            {meta.subtitle} sur {STEPS.length}
          </span>
        </div>

        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1 flex-1 rounded-full transition-colors',
                i <= step ? 'bg-primary' : 'bg-muted',
              )}
            />
          ))}
        </div>

        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-foreground text-balance">
          {meta.title}
        </h1>
      </header>

      <div className="flex-1 px-6 pb-8 pt-2">{meta.render({ data, update })}</div>

      <div
        className="sticky bottom-0 border-t border-border bg-background/90 px-6 py-4 backdrop-blur-xl"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <button
          type="button"
          onClick={next}
          disabled={!proceed}
          className={cn(
            'w-full rounded-2xl py-3.5 text-base font-semibold outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/40',
            proceed
              ? 'bg-primary text-primary-foreground hover:opacity-90'
              : 'cursor-not-allowed bg-muted text-muted-foreground/50',
          )}
        >
          {isLast ? 'Terminer mon profil' : 'Suivant'}
        </button>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- edit mode */

function EditView({ scrollTop }: { scrollTop: () => void }) {
  const initial = useMemo(() => createExistingProfile(), [])
  const [data, setData] = useState<ProfileData>(() => createExistingProfile())
  const [savedCount, setSavedCount] = useState<number | null>(null)

  const update = (patch: Partial<ProfileData>) => {
    setSavedCount(null)
    setData((d) => ({ ...d, ...patch }))
  }

  const changedCount = useMemo(() => {
    return (Object.keys(data) as (keyof ProfileData)[]).filter(
      (k) => JSON.stringify(data[k]) !== JSON.stringify(initial[k]),
    ).length
  }, [data, initial])

  function save() {
    setSavedCount(changedCount)
    scrollTop()
  }

  return (
    <section className="flex min-h-full flex-col">
      <header className="px-6 pb-2 pt-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
          Mon profil
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground text-balance">
          Modifier mon profil
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Seuls les champs que vous modifiez seront mis à jour.
        </p>
      </header>

      {savedCount !== null ? (
        <div className="mx-6 mt-2 flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">
          <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
          {savedCount === 0
            ? 'Aucune modification à enregistrer.'
            : `${savedCount} champ${savedCount > 1 ? 's' : ''} mis à jour.`}
        </div>
      ) : null}

      <div className="flex flex-col gap-8 px-6 pb-8 pt-6">
        {STEPS.map((s, i) => (
          <div key={s.title}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {s.title}
            </h2>
            {s.render({ data, update })}
            {i < STEPS.length - 1 ? <div className="mt-8 h-px bg-border/60" /> : null}
          </div>
        ))}
      </div>

      <div
        className="sticky bottom-0 border-t border-border bg-background/90 px-6 py-4 backdrop-blur-xl"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <button
          type="button"
          onClick={save}
          className="w-full rounded-2xl bg-primary py-3.5 text-base font-semibold text-primary-foreground outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          Enregistrer les modifications
        </button>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- entry */

export function ProfileModule({ mode }: { mode: 'create' | 'edit' }) {
  const rootRef = useRef<HTMLDivElement>(null)

  function scrollTop() {
    let el = rootRef.current?.parentElement as HTMLElement | null
    while (el) {
      const oy = getComputedStyle(el).overflowY
      if (oy === 'auto' || oy === 'scroll') {
        el.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      el = el.parentElement
    }
  }

  return (
    <div ref={rootRef}>
      {mode === 'edit' ? <EditView scrollTop={scrollTop} /> : <Wizard scrollTop={scrollTop} />}
    </div>
  )
}
