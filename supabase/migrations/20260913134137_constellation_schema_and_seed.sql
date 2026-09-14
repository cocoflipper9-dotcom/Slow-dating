/*
# Constellation — Slow Dating MVP: Schema, RLS, Trigger & Seed Data

## Summary
Creates the complete database schema for the Constellation slow-dating app:
users, matches, and messages tables with row-level security, an auto-increment
trigger for message_count, and comprehensive seed data for demo/testing.

## New Tables
1. `users` — profiles with personal info, sports, interests, languages,
   personality, astrology, culture, and avatar gradient colors.
2. `matches` — pairings between two users with message_count (drives the
   progressive unlock system: 5→sports, 10→life project, 20→voice, 50→photo).
3. `messages` — individual messages in a match (type 'text' or 'voice').

## Security (RLS)
- RLS enabled on all three tables.
- Policies allow anon + authenticated full CRUD (demo app, no auth screen).
- This is intentionally permissive: the app has no sign-in flow.

## Automation
- Trigger `on_message_insert` auto-increments `matches.message_count` by 1
  whenever a new message is inserted. This is the core mechanic that drives
  the progressive unlock system.

## Seed Data
- 7 users: 5 discovery profiles (Thomas, Yuki, Sofia, Liam, Amara) +
  Elena (the chat match) + Camille (the demo current user).
- 1 match: Camille ↔ Elena. After 4 seed messages, message_count = 4.
  Sending one more message brings it to 5, unlocking the "Sports" section.
- 4 seed messages: alternating between Elena and Camille.
*/

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
-- 2. RLS
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users: full CRUD for anon + authenticated (demo app, no auth)
DROP POLICY IF EXISTS "anon_select_users" ON users;
CREATE POLICY "anon_select_users" ON users FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_users" ON users;
CREATE POLICY "anon_insert_users" ON users FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_users" ON users;
CREATE POLICY "anon_update_users" ON users FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_users" ON users;
CREATE POLICY "anon_delete_users" ON users FOR DELETE
  TO anon, authenticated USING (true);

-- Matches: full CRUD
DROP POLICY IF EXISTS "anon_select_matches" ON matches;
CREATE POLICY "anon_select_matches" ON matches FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_matches" ON matches;
CREATE POLICY "anon_insert_matches" ON matches FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_matches" ON matches;
CREATE POLICY "anon_update_matches" ON matches FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_matches" ON matches;
CREATE POLICY "anon_delete_matches" ON matches FOR DELETE
  TO anon, authenticated USING (true);

-- Messages: full CRUD
DROP POLICY IF EXISTS "anon_select_messages" ON messages;
CREATE POLICY "anon_select_messages" ON messages FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_messages" ON messages;
CREATE POLICY "anon_insert_messages" ON messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_messages" ON messages;
CREATE POLICY "anon_update_messages" ON messages FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_messages" ON messages;
CREATE POLICY "anon_delete_messages" ON messages FOR DELETE
  TO anon, authenticated USING (true);

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

DROP TRIGGER IF EXISTS on_message_insert ON messages;
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
-- 5. SEED USERS
-- ============================================================

-- Thomas (France)
INSERT INTO users (id, email, name, age, country, flag, bio, photo_url, sports, life_projects, interests, languages, relation_goal, sex, orientation, birth_date, aura_from, aura_to)
SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'thomas@example.com', 'Thomas', 26, 'France', '🇫🇷',
  'Astronome amateur, je cherche quelqu''un avec qui partager de longues soirées à observer les étoiles.',
  'https://images.pexels.com/photos/12871465/pexels-photo-12871465.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  jsonb_build_array(jsonb_build_object('name','Randonnée','level','Intermédiaire'), jsonb_build_object('name','Course à pied','level','Courant')),
  jsonb_build_array('Ouvrir un petit observatoire-café où l''on partage des nuits à regarder les étoiles.'),
  jsonb_build_array('Astronomie','Cuisine','Randonnée','Jazz','Photographie'),
  jsonb_build_array(jsonb_build_object('name','Français','level','Langue maternelle'), jsonb_build_object('name','Anglais','level','Courant'), jsonb_build_object('name','Espagnol','level','Intermédiaire')),
  'Long terme', 'Homme', 'Hétérosexuel(le)', '2000-05-15',
  'oklch(0.32 0.06 265)', 'oklch(0.2 0.02 260)'
ON CONFLICT (id) DO NOTHING;

-- Yuki (Japon)
INSERT INTO users (id, email, name, age, country, flag, bio, photo_url, sports, life_projects, interests, languages, relation_goal, sex, orientation, birth_date, aura_from, aura_to)
SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'yuki@example.com', 'Yuki', 29, 'Japon', '🇯🇵',
  'Céramiste et cinéphile. J''aime les choses qui prennent du temps à se faire.',
  'https://images.pexels.com/photos/10285637/pexels-photo-10285637.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  jsonb_build_array(jsonb_build_object('name','Escalade','level','Intermédiaire'), jsonb_build_object('name','Natation','level','Débutant')),
  jsonb_build_array('Documenter les métiers d''artisanat en voie de disparition à travers le monde.'),
  jsonb_build_array('Céramique','Cinéma','Thé','Escalade','Poésie'),
  jsonb_build_array(jsonb_build_object('name','Japonais','level','Langue maternelle'), jsonb_build_object('name','Anglais','level','Courant')),
  'Relation à distance', 'Femme', 'Bisexuel(le)', '1997-03-20',
  'oklch(0.3 0.05 290)', 'oklch(0.19 0.02 265)'
ON CONFLICT (id) DO NOTHING;

-- Sofia (Italie)
INSERT INTO users (id, email, name, age, country, flag, bio, photo_url, sports, life_projects, interests, languages, relation_goal, sex, orientation, birth_date, aura_from, aura_to)
SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'sofia@example.com', 'Sofia', 24, 'Italie', '🇮🇹',
  'Architecte en herbe, je rêve de redonner vie aux vieilles pierres de Toscane.',
  'https://images.pexels.com/photos/8727454/pexels-photo-8727454.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  jsonb_build_array(jsonb_build_object('name','Vélo','level','Courant'), jsonb_build_object('name','Danse','level','Intermédiaire')),
  jsonb_build_array('Restaurer une vieille bâtisse en Toscane pour en faire une résidence d''artistes.'),
  jsonb_build_array('Danse','Architecture','Vélo','Littérature','Vin'),
  jsonb_build_array(jsonb_build_object('name','Italien','level','Langue maternelle'), jsonb_build_object('name','Français','level','Intermédiaire'), jsonb_build_object('name','Anglais','level','Intermédiaire')),
  'Long terme', 'Femme', 'Hétérosexuel(le)', '2002-07-10',
  'oklch(0.31 0.055 255)', 'oklch(0.2 0.02 270)'
ON CONFLICT (id) DO NOTHING;

-- Liam (Irlande)
INSERT INTO users (id, email, name, age, country, flag, bio, photo_url, sports, life_projects, interests, languages, relation_goal, sex, orientation, birth_date, aura_from, aura_to)
SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'liam@example.com', 'Liam', 31, 'Irlande', '🇮🇪',
  'Musicien et marin. L''océan me fascine autant que les bonnes mélodies.',
  'https://images.pexels.com/photos/12338846/pexels-photo-12338846.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  jsonb_build_array(jsonb_build_object('name','Voile','level','Expert'), jsonb_build_object('name','Course à pied','level','Intermédiaire')),
  jsonb_build_array('Traverser l''Atlantique à la voile et écrire un carnet de bord musical.'),
  jsonb_build_array('Musique','Voile','Histoire','Course à pied','Café'),
  jsonb_build_array(jsonb_build_object('name','Anglais','level','Langue maternelle'), jsonb_build_object('name','Irlandais','level','Courant'), jsonb_build_object('name','Français','level','Débutant')),
  'Amical', 'Homme', 'Hétérosexuel(le)', '1995-09-22',
  'oklch(0.29 0.05 275)', 'oklch(0.19 0.02 258)'
ON CONFLICT (id) DO NOTHING;

-- Amara (Sénégal)
INSERT INTO users (id, email, name, age, country, flag, bio, photo_url, sports, life_projects, interests, languages, relation_goal, sex, orientation, birth_date, aura_from, aura_to)
SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 'amara@example.com', 'Amara', 27, 'Sénégal', '🇸🇳',
  'Peintre et jardinière. Je crois que les plantes et les couleurs racontent des histoires.',
  'https://images.pexels.com/photos/36536385/pexels-photo-36536385.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  jsonb_build_array(jsonb_build_object('name','Yoga','level','Intermédiaire'), jsonb_build_object('name','Natation','level','Débutant')),
  jsonb_build_array('Créer un jardin partagé qui reconnecte la ville à ses plantes médicinales.'),
  jsonb_build_array('Peinture','Yoga','Gastronomie','Voyages','Botanique'),
  jsonb_build_array(jsonb_build_object('name','Wolof','level','Langue maternelle'), jsonb_build_object('name','Français','level','Langue maternelle'), jsonb_build_object('name','Anglais','level','Courant')),
  'Court terme', 'Femme', 'Bisexuel(le)', '1999-11-05',
  'oklch(0.32 0.06 260)', 'oklch(0.2 0.025 275)'
ON CONFLICT (id) DO NOTHING;

-- Elena (Italie) — the chat match
INSERT INTO users (id, email, name, age, country, flag, bio, photo_url, sports, life_projects, interests, languages, relation_goal, sex, orientation, birth_date, astrology_western, astrology_western_symbol, astrology_chinese, astrology_chinese_symbol, astrology_synergy, culture)
SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'elena@example.com', 'Elena', 23, 'Italie', '🇮🇹',
  'Photographe et céramiste. J''aime les choses simples et vraies.',
  'https://images.pexels.com/photos/5920763/pexels-photo-5920763.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  jsonb_build_array(jsonb_build_object('name','Escalade','level','Intermédiaire'), jsonb_build_object('name','Natation','level','Courant')),
  jsonb_build_array('Ouvrir un petit atelier de céramique près de la mer et voyager quelques mois par an pour photographier des cultures locales.'),
  jsonb_build_array('Photographie','Cuisine','Randonnée','Cinéma','Céramique'),
  jsonb_build_array(jsonb_build_object('name','Italien','level','Langue maternelle'), jsonb_build_object('name','Anglais','level','Courant'), jsonb_build_object('name','Français','level','Intermédiaire')),
  'Long terme', 'Femme', 'Bisexuel(le)', '2003-10-08',
  'Balance', '♎', 'Chèvre', '🐐',
  'Votre Balance rencontre une belle harmonie avec la douceur de la Chèvre : deux sensibilités qui cherchent l''équilibre, la beauté et les liens sincères. Là où vous aimez peser chaque nuance, Elena apporte une créativité patiente et un sens du soin. Ensemble, vos tempéraments tendent naturellement vers la coopération plutôt que la confrontation — une base précieuse pour construire une compréhension mutuelle, à votre rythme.',
  jsonb_build_array(
    'En Italie, le repas est un moment social central : partager une longue table le dimanche est une manière courante d''entretenir les liens familiaux et amicaux.',
    'La « passeggiata », cette promenade tranquille en fin de journée, reste dans beaucoup de villes une habitude appréciée pour se retrouver et discuter.',
    'Les usages varient fortement d''une région à l''autre — du nord au sud, les traditions culinaires et les fêtes locales diffèrent, et rien de tout cela n''est une règle absolue.'
  )
ON CONFLICT (id) DO NOTHING;

-- Camille (France) — demo current user
INSERT INTO users (id, email, name, age, country, flag, bio, photo_url, sports, life_projects, interests, languages, relation_goal, sex, orientation, birth_date)
SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'camille@example.com', 'Camille', 28, 'France', '🇫🇷',
  'Astronome et céramiste. Je cherche une connexion profonde avant tout.',
  'https://images.pexels.com/photos/38718559/pexels-photo-38718559.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  jsonb_build_array(jsonb_build_object('name','Escalade','level','Intermédiaire'), jsonb_build_object('name','Natation','level','Avancé')),
  jsonb_build_array('Ouvrir un atelier de céramique ouvert aux voyageurs de passage.'),
  jsonb_build_array('Astronomie','Céramique','Littérature'),
  jsonb_build_array(jsonb_build_object('name','Français','level','Langue maternelle'), jsonb_build_object('name','Anglais','level','Courant'), jsonb_build_object('name','Italien','level','Intermédiaire')),
  'Long terme', 'Femme', 'Bisexuel(le)', '1997-04-12'
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 6. SEED MATCH (message_count starts at 0; trigger increments to 4)
-- ============================================================

INSERT INTO matches (id, user_1_id, user_2_id, message_count)
SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380b01',
       'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
       'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
       0
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 7. SEED MESSAGES (4 messages → trigger sets message_count to 4)
-- ============================================================

INSERT INTO messages (id, match_id, sender_id, content, type, created_at)
SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380c01',
       'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380b01',
       'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
       'Ciao ! J''ai vu qu''on aimait tous les deux le cinéma 🎬',
       'text',
       now() - interval '4 minutes'
ON CONFLICT (id) DO NOTHING;

INSERT INTO messages (id, match_id, sender_id, content, type, created_at)
SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380c02',
       'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380b01',
       'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
       'Oui ! Tu regardes plutôt des classiques ou des sorties récentes ?',
       'text',
       now() - interval '3 minutes'
ON CONFLICT (id) DO NOTHING;

INSERT INTO messages (id, match_id, sender_id, content, type, created_at)
SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380c03',
       'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380b01',
       'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
       'Un peu des deux, mais j''ai un faible pour les films des années 70.',
       'text',
       now() - interval '2 minutes'
ON CONFLICT (id) DO NOTHING;

INSERT INTO messages (id, match_id, sender_id, content, type, created_at)
SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380c04',
       'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380b01',
       'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
       'Excellent goût. Et la randonnée, tu pars souvent en montagne ?',
       'text',
       now() - interval '1 minute'
ON CONFLICT (id) DO NOTHING;