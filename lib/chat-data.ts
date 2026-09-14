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

/** Anti-bypass regex: blocks sharing of social media, phone numbers, emails, and URLs. */
export const BYPASS_REGEX =
  /(instagram|insta|ig|snap|tiktok|wa\.me|whatsapp|telegram|@[\w.-]+|\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b)/gi

export const BYPASS_WARNING =
  'Pour préserver la magie du Slow Dating, le partage de coordonnées réseaux ou de numéros est bloqué au début.'
