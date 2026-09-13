'use client'

import { useMemo, useRef, useState, useEffect } from 'react'
import {
  ArrowLeft,
  Check,
  Languages,
  ListTree,
  Lock,
  Mic,
  Send,
  Sparkle,
  X,
} from 'lucide-react'
import {
  AI_SUGGESTIONS,
  INITIAL_COUNT,
  MATCH,
  MAX_MESSAGES,
  SEED_MESSAGES,
  TARGET_LANGUAGES,
  TIERS,
  type ChatMessage,
} from '@/lib/chat-data'
import { cn } from '@/lib/utils'

/** Detects phone numbers, URLs, @handles and banned social platform names. */
const BLOCK_PATTERNS: RegExp[] = [
  /(?:\+?\d[\s.\-()]*){7,}/, // phone numbers
  /(https?:\/\/|www\.)\S+/i, // URLs
  /\b\S+\.(com|fr|net|org|io|me|co)\b/i, // bare domains
  /@[a-z0-9_.]{2,}/i, // @handles
  /\b(insta|instagram|snap|snapchat|whatsapp|whats app|telegram|tiktok|tik tok|messenger)\b/i,
]

function isBlocked(text: string): boolean {
  return BLOCK_PATTERNS.some((re) => re.test(text))
}

type Overlay = 'none' | 'roadmap' | 'ai' | 'profile'

export function ChatModule() {
  const [messages, setMessages] = useState<ChatMessage[]>(SEED_MESSAGES)
  const [count, setCount] = useState(INITIAL_COUNT)
  const [draft, setDraft] = useState('')
  const [overlay, setOverlay] = useState<Overlay>('none')
  const [targetLang, setTargetLang] = useState(TARGET_LANGUAGES[0])
  const [showTranslate, setShowTranslate] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const blocked = draft.trim().length > 0 && isBlocked(draft)

  const unlocked = useMemo(
    () => ({
      sports: count >= 5,
      project: count >= 10,
      voice: count >= 20,
      photo: count >= 50,
    }),
    [count],
  )

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages])

  function send() {
    const text = draft.trim()
    if (!text || blocked || count >= MAX_MESSAGES) return

    setDraft('')
    setMessages((prev) => [...prev, { id: `m-${Date.now()}`, author: 'me', text }])
    bumpCount(1)

    // simulated reply that also advances the counter
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `r-${Date.now()}`, author: 'match', text: replyFor(text) },
      ])
      bumpCount(1)
    }, 900)
  }

  function bumpCount(by: number) {
    setCount((prev) => {
      const next = Math.min(MAX_MESSAGES, prev + by)
      // fire any tier notifications crossed between prev and next
      const crossed = TIERS.filter((t) => t.threshold > prev && t.threshold <= next)
      if (crossed.length) {
        setMessages((msgs) => [
          ...msgs,
          ...crossed.map((t) => ({
            id: `sys-${t.threshold}`,
            author: 'system' as const,
            text: `${t.icon} ${t.notification}`,
            atCount: t.threshold,
          })),
        ])
      }
      return next
    })
  }

  const pct = Math.min(100, Math.round((count / MAX_MESSAGES) * 100))

  return (
    <section className="relative flex h-full flex-col bg-background">
      <ChatHeader
        photoRevealed={unlocked.photo}
        count={count}
        pct={pct}
        onOpenProfile={() => setOverlay('profile')}
        onOpenRoadmap={() => setOverlay('roadmap')}
      />

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
        {messages.map((m) =>
          m.author === 'system' ? (
            <SystemBubble key={m.id} text={m.text} />
          ) : (
            <Bubble key={m.id} mine={m.author === 'me'} text={m.text} />
          ),
        )}

        {count >= MAX_MESSAGES && (
          <p className="pt-2 text-center text-xs text-muted-foreground">
            Vous avez atteint le lien profond. Toutes les fonctionnalités sont débloquées.
          </p>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-border bg-card/60 px-3 pb-4 pt-2 backdrop-blur">
        {/* translation row */}
        <div className="mb-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowTranslate((v) => !v)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
              showTranslate
                ? 'bg-primary/15 text-primary'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Languages className="h-3.5 w-3.5" aria-hidden="true" />
            Traduction en direct
          </button>
          {showTranslate && (
            <div className="relative">
              <select
                aria-label="Langue cible de la traduction"
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="appearance-none rounded-full border border-border bg-secondary py-1 pl-3 pr-7 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {TARGET_LANGUAGES.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex items-end gap-2">
          {/* mic with progressive lock */}
          <button
            type="button"
            disabled={!unlocked.voice}
            aria-label={unlocked.voice ? 'Message vocal' : 'Messages vocaux verrouillés'}
            className={cn(
              'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors',
              unlocked.voice
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'border-border bg-secondary text-muted-foreground',
            )}
          >
            <Mic className="h-4 w-4" aria-hidden="true" />
            {!unlocked.voice && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary ring-1 ring-border">
                <Lock className="h-2.5 w-2.5" aria-hidden="true" />
              </span>
            )}
          </button>

          <div className="flex flex-1 flex-col">
            <div
              className={cn(
                'flex items-end gap-1 rounded-2xl border bg-secondary px-3 py-1.5 transition-colors',
                blocked ? 'border-destructive/60' : 'border-border',
              )}
            >
              <textarea
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === 'Enter' &&
                    !e.shiftKey &&
                    !e.nativeEvent.isComposing &&
                    e.keyCode !== 229
                  ) {
                    e.preventDefault()
                    send()
                  }
                }}
                placeholder={`Écrire à ${MATCH.name}…`}
                className="max-h-24 flex-1 resize-none bg-transparent py-1 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>

          {/* AI assistant */}
          <button
            type="button"
            onClick={() => setOverlay('ai')}
            aria-label="Assistant IA"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-colors hover:bg-primary/20"
          >
            <Sparkle className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* send */}
          <button
            type="button"
            onClick={send}
            disabled={blocked || draft.trim().length === 0 || count >= MAX_MESSAGES}
            aria-label="Envoyer"
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors',
              blocked || draft.trim().length === 0 || count >= MAX_MESSAGES
                ? 'bg-secondary text-muted-foreground'
                : 'bg-primary text-primary-foreground hover:opacity-90',
            )}
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {blocked && (
          <p className="mt-2 px-1 text-xs leading-snug text-destructive">
            Le partage de coordonnées est bloqué jusqu’au palier final pour préserver votre
            démarche.
          </p>
        )}
      </div>

      {/* Overlays */}
      {overlay === 'roadmap' && (
        <RoadmapPanel count={count} onClose={() => setOverlay('none')} />
      )}
      {overlay === 'ai' && <AiDrawer onClose={() => setOverlay('none')} onPick={(s) => setDraft(s)} />}
      {overlay === 'profile' && (
        <ProfileSheet unlocked={unlocked} onClose={() => setOverlay('none')} />
      )}
    </section>
  )
}

function replyFor(text: string): string {
  const pool = [
    'Haha j’adore ça 😄 dis-m’en plus !',
    'C’est intéressant, je n’avais jamais vu les choses comme ça.',
    'Complètement d’accord avec toi 🙂',
    'Oh vraiment ? Raconte !',
    'Tu me donnes envie d’essayer 😌',
  ]
  return pool[text.length % pool.length]
}

function ChatHeader({
  photoRevealed,
  count,
  pct,
  onOpenProfile,
  onOpenRoadmap,
}: {
  photoRevealed: boolean
  count: number
  pct: number
  onOpenProfile: () => void
  onOpenRoadmap: () => void
}) {
  return (
    <header className="border-b border-border bg-card/70 px-4 pb-3 pt-5 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenProfile}
          className="flex flex-1 items-center gap-3 text-left"
          aria-label={`Ouvrir le profil de ${MATCH.name}`}
        >
          <Avatar revealed={photoRevealed} size={44} />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-foreground">
              {MATCH.name}, {MATCH.age} ans
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {MATCH.flag} {MATCH.country}
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={onOpenRoadmap}
          aria-label="Voir la roadmap des paliers"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground"
        >
          <ListTree className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* progress */}
      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-primary/80">
            Lien en cours
          </span>
          <span className="text-xs font-semibold text-foreground tabular-nums">
            {count} / {MAX_MESSAGES} messages
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary shadow-[0_0_12px_var(--gold)] transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </header>
  )
}

function Avatar({ revealed, size }: { revealed: boolean; size: number }) {
  return (
    <span
      className="relative shrink-0 overflow-hidden rounded-full ring-1 ring-border"
      style={{ height: size, width: size }}
    >
      <img
        src={MATCH.photo || '/placeholder.svg'}
        alt={revealed ? `Photo de ${MATCH.name}` : ''}
        aria-hidden={!revealed}
        className="h-full w-full object-cover transition-[filter] duration-1000"
        style={{ filter: revealed ? 'none' : 'blur(14px) saturate(1.1)' }}
      />
      {!revealed && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
        />
      )}
    </span>
  )
}

function Bubble({ mine, text }: { mine: boolean; text: string }) {
  return (
    <div className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[78%] rounded-2xl px-3.5 py-2 text-[15px] leading-relaxed',
          mine
            ? 'rounded-br-md bg-primary text-primary-foreground'
            : 'rounded-bl-md bg-secondary text-foreground',
        )}
      >
        {text}
      </div>
    </div>
  )
}

function SystemBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-center">
      <div className="max-w-[88%] rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-center text-xs font-medium text-primary text-balance">
        {text}
      </div>
    </div>
  )
}

function Scrim({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      aria-label="Fermer"
      onClick={onClose}
      className="absolute inset-0 z-10 bg-black/50 backdrop-blur-sm"
    />
  )
}

function RoadmapPanel({ count, onClose }: { count: number; onClose: () => void }) {
  return (
    <>
      <Scrim onClose={onClose} />
      <aside className="absolute right-0 top-0 z-20 flex h-full w-[82%] max-w-xs flex-col border-l border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <h2 className="text-base font-semibold text-foreground">Votre progression</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <ol className="relative ml-3 border-l border-border">
            {TIERS.map((t) => {
              const reached = count >= t.threshold
              return (
                <li key={t.threshold} className="relative mb-7 pl-6 last:mb-0">
                  <span
                    className={cn(
                      'absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-card',
                      reached ? 'bg-primary' : 'bg-secondary',
                    )}
                  >
                    {reached && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                  </span>
                  <p
                    className={cn(
                      'text-sm font-semibold',
                      reached ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {t.icon} {t.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t.threshold} messages</p>
                  <span
                    className={cn(
                      'mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide',
                      reached
                        ? 'bg-primary/15 text-primary'
                        : 'bg-secondary text-muted-foreground',
                    )}
                  >
                    {reached ? 'Atteint' : 'À venir'}
                  </span>
                </li>
              )
            })}
          </ol>
        </div>
      </aside>
    </>
  )
}

function AiDrawer({
  onClose,
  onPick,
}: {
  onClose: () => void
  onPick: (s: string) => void
}) {
  return (
    <>
      <Scrim onClose={onClose} />
      <aside className="absolute right-0 top-0 z-20 flex h-full w-[86%] max-w-xs flex-col border-l border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <Sparkle className="h-4 w-4 text-primary" aria-hidden="true" />
            Assistant IA
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground text-pretty">
            Quelques idées de relance inspirées de la culture de {MATCH.name} ({MATCH.flag}{' '}
            {MATCH.country}). Touchez une idée pour la préremplir.
          </p>
          <ul className="space-y-3">
            {AI_SUGGESTIONS.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => {
                    onPick(s)
                    onClose()
                  }}
                  className="w-full rounded-2xl border border-border bg-secondary px-4 py-3 text-left text-sm leading-relaxed text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}

function ProfileSheet({
  unlocked,
  onClose,
}: {
  unlocked: { sports: boolean; project: boolean; voice: boolean; photo: boolean }
  onClose: () => void
}) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-background">
      <header className="flex items-center gap-3 border-b border-border px-4 py-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Retour à la conversation"
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <h2 className="text-base font-semibold text-foreground">Profil de {MATCH.name}</h2>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="flex flex-col items-center text-center">
          <Avatar revealed={unlocked.photo} size={96} />
          <p className="mt-3 text-lg font-semibold text-foreground">
            {MATCH.name}, {MATCH.age} ans
          </p>
          <p className="text-sm text-muted-foreground">
            {MATCH.flag} {MATCH.country}
          </p>
        </div>

        <Section title="Langues">
          <div className="flex flex-wrap gap-2">
            {MATCH.languages.map((l) => (
              <span
                key={l.name}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-foreground"
              >
                {l.name} · <span className="text-muted-foreground">{l.level}</span>
              </span>
            ))}
          </div>
        </Section>

        <Section title="Passions">
          <div className="flex flex-wrap gap-2">
            {MATCH.passions.map((p) => (
              <span
                key={p}
                className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {p}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Sports" locked={!unlocked.sports} lockHint="Débloqué à 5 messages">
          <div className="flex flex-wrap gap-2">
            {MATCH.sports.map((s) => (
              <span
                key={s.name}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-foreground"
              >
                {s.name} · <span className="text-muted-foreground">{s.level}</span>
              </span>
            ))}
          </div>
        </Section>

        <Section title="Projet de vie" locked={!unlocked.project} lockHint="Débloqué à 10 messages">
          <p className="text-sm leading-relaxed text-foreground text-pretty">{MATCH.project}</p>
        </Section>

        <Section title="Astrologie & compatibilité">
          <div className="mb-3 flex gap-2">
            <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-foreground">
              {MATCH.astrology.westernSymbol} {MATCH.astrology.western}
            </span>
            <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-foreground">
              {MATCH.astrology.chineseSymbol} {MATCH.astrology.chinese}
            </span>
          </div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-primary/80">
            Votre synergie céleste
          </p>
          <p className="text-sm leading-relaxed text-foreground text-pretty">
            {MATCH.astrology.synergy}
          </p>
        </Section>

        <Section title="Culture">
          <ul className="space-y-2.5">
            {MATCH.culture.map((c, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground text-pretty">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {c}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  )
}

function Section({
  title,
  children,
  locked,
  lockHint,
}: {
  title: string
  children: React.ReactNode
  locked?: boolean
  lockHint?: string
}) {
  return (
    <section className="mt-7">
      <div className="mb-2.5 flex items-center gap-2">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {locked && (
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            <Lock className="h-2.5 w-2.5" aria-hidden="true" />
            {lockHint}
          </span>
        )}
      </div>
      {locked ? (
        <div className="rounded-2xl border border-dashed border-border bg-secondary/40 px-4 py-3 text-xs text-muted-foreground">
          Contenu révélé au fil de votre échange.
        </div>
      ) : (
        children
      )}
    </section>
  )
}
