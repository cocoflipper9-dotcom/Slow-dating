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

/** Base collaborative de départ (métiers & passions). Extensible par l'utilisateur. */
export const KNOWN_INTERESTS = [
  'Astronomie',
  'Cuisine',
  'Randonnée',
  'Jazz',
  'Photographie',
  'Peinture',
  'Cinéma',
  'Littérature',
  'Voyages',
  'Yoga',
  'Architecture',
  'Danse',
  'Musique',
  'Histoire',
  'Médecine',
  'Ingénierie',
  'Enseignement',
  'Design',
  'Botanique',
  'Céramique',
]

export const BIG_FIVE: { dimension: string; adjectives: string[] }[] = [
  {
    dimension: "Ouverture d'esprit",
    adjectives: ['Curieux', 'Créatif', 'Imaginatif', 'Artiste', 'Inventif', 'Non-conformiste'],
  },
  {
    dimension: 'Consciencieux',
    adjectives: ['Organisé', 'Rigoureux', 'Discipliné', 'Prévoyant', 'Persévérant', 'Méthodique'],
  },
  {
    dimension: 'Extraversion',
    adjectives: ['Sociable', 'Énergique', 'Enthousiaste', 'Audacieux', 'Bavard', 'Expressif'],
  },
  {
    dimension: 'Agréabilité',
    adjectives: ['Empathique', 'Bienveillant', 'Altruiste', 'Conciliant', 'Généreux', 'Tolérant'],
  },
  {
    dimension: 'Stabilité émotionnelle',
    adjectives: ['Calme', 'Serein', 'Pacifique', 'Confiant', 'Stoïque', 'Détaché'],
  },
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
    firstName: '',
    country: '',
    birthDate: '',
    sex: '',
    orientation: 'Préférer ne pas dire',
    interests: [],
    languages: [],
    personality: emptyPersonality(),
    sports: [],
    relationGoal: '',
    lifeProject: '',
    photoName: null,
  }
}

/** Données existantes simulées, utilisées pour pré-remplir le mode édition. */
export function createExistingProfile(): ProfileData {
  const personality = emptyPersonality()
  const seed = [7, 8, 6.5, 5, 7.5, 6, 8, 7, 6.5, 7, 8.5, 7, 6, 5.5, 7, 6.5, 4.5, 6, 8, 7.5, 9, 8, 7.5, 8.5, 7, 6.5, 5, 6, 7, 8]
  ALL_ADJECTIVES.forEach((a, i) => {
    personality[a] = seed[i] ?? 6
  })
  return {
    firstName: 'Camille',
    country: 'France',
    birthDate: '1997-04-12',
    sex: 'Femme',
    orientation: 'Bisexuel(le)',
    interests: ['Astronomie', 'Céramique', 'Littérature'],
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
