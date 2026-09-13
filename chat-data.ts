export type ChatMessage = {
  id: string
  author: 'me' | 'match' | 'system'
  text: string
  /** message count at which this system notification was emitted */
  atCount?: number
}

export type Tier = {
  threshold: number
  label: string
  icon: string
  /** short label used inside the profile sheet unlock rows */
  unlocks: 'sports' | 'project' | 'voice' | 'photo'
  notification: string
}

/** The five unlock milestones of the effeuillage progressif. */
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
    notification: 'Niveau 2 atteint : Le projet de vie d’Elena est débloqué !',
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
    notification: 'Connexion Profonde Atteinte : La photo de profil d’Elena est révélée !',
  },
]

export const MAX_MESSAGES = 50

export const MATCH = {
  name: 'Elena',
  age: 23,
  country: 'Italie',
  flag: '🇮🇹',
  photo: '/match/elena.png',
  languages: [
    { name: 'Italien', level: 'Langue maternelle' },
    { name: 'Anglais', level: 'Courant' },
    { name: 'Français', level: 'Intermédiaire' },
  ],
  passions: ['Photographie', 'Cuisine', 'Randonnée', 'Cinéma', 'Céramique'],
  sports: [
    { name: 'Escalade', level: 'Intermédiaire' },
    { name: 'Natation', level: 'Courant' },
  ],
  project:
    'Ouvrir un petit atelier de céramique près de la mer et voyager quelques mois par an pour photographier des cultures locales.',
  astrology: {
    western: 'Balance',
    westernSymbol: '♎',
    chinese: 'Chèvre',
    chineseSymbol: '🐐',
    synergy:
      'Votre Balance rencontre une belle harmonie avec la douceur de la Chèvre : deux sensibilités qui cherchent l’équilibre, la beauté et les liens sincères. Là où vous aimez peser chaque nuance, Elena apporte une créativité patiente et un sens du soin. Ensemble, vos tempéraments tendent naturellement vers la coopération plutôt que la confrontation — une base précieuse pour construire une compréhension mutuelle, à votre rythme.',
  },
  culture: [
    'En Italie, le repas est un moment social central : partager une longue table le dimanche est une manière courante d’entretenir les liens familiaux et amicaux.',
    'La “passeggiata”, cette promenade tranquille en fin de journée, reste dans beaucoup de villes une habitude appréciée pour se retrouver et discuter.',
    'Les usages varient fortement d’une région à l’autre — du nord au sud, les traditions culinaires et les fêtes locales diffèrent, et rien de tout cela n’est une règle absolue.',
  ],
}

/** Culture-aware relance ideas surfaced by the AI assistant drawer. */
export const AI_SUGGESTIONS = [
  'Demande-lui quel plat italien elle adore cuisiner quand elle veut se faire plaisir.',
  'Elle aime la photographie — demande-lui le dernier lieu qui l’a marquée derrière l’objectif.',
  'La “passeggiata” est une belle habitude italienne : demande-lui à quoi ressemble sa fin de journée idéale.',
  'Elle fait de la céramique — demande-lui ce qu’elle ressent quand une pièce sort du four.',
]

export const TARGET_LANGUAGES = ['Français', 'Anglais', 'Italien', 'Espagnol', 'Allemand']

/** Conversation already in progress (count starts at 24 / 50). */
export const SEED_MESSAGES: ChatMessage[] = [
  { id: 's1', author: 'match', text: 'Ciao ! J’ai vu qu’on aimait tous les deux le cinéma 🎬' },
  { id: 's2', author: 'me', text: 'Oui ! Tu regardes plutôt des classiques ou des sorties récentes ?' },
  { id: 's3', author: 'match', text: 'Un peu des deux, mais j’ai un faible pour les films des années 70.' },
  { id: 'sys20', author: 'system', text: '🎵 Niveau 3 atteint : Les messages vocaux sont débloqués !', atCount: 20 },
  { id: 's4', author: 'me', text: 'Excellent goût. Et la randonnée, tu pars souvent en montagne ?' },
  { id: 's5', author: 'match', text: 'Dès que je peux ! L’escalade aussi, ça me vide la tête.' },
]

export const INITIAL_COUNT = 24
