-- ══════════════════════════════════════════
-- ACURA AROMA — Supabase Schema + Seed Data
-- ══════════════════════════════════════════

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name_fr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT DEFAULT '🌿',
  description_fr TEXT DEFAULT '',
  description_en TEXT DEFAULT ''
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name_fr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_fr TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  benefits_fr TEXT DEFAULT '',
  benefits_en TEXT DEFAULT '',
  usage_fr TEXT DEFAULT '',
  usage_en TEXT DEFAULT '',
  category_id INTEGER REFERENCES categories(id),
  image_url TEXT,
  emoji TEXT DEFAULT '🌿',
  type TEXT CHECK (type IN ('eau','huile')) DEFAULT 'eau',
  tags_fr TEXT[] DEFAULT '{}',
  tags_en TEXT[] DEFAULT '{}',
  color_from TEXT DEFAULT '#eef3ee',
  color_to TEXT DEFAULT '#7a9e7e',
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quotes
CREATE TABLE IF NOT EXISTS quotes (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  type_client TEXT,
  product_name TEXT,
  product_id INTEGER REFERENCES products(id),
  quantity TEXT,
  message TEXT,
  locale TEXT DEFAULT 'fr',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt_fr TEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  content_fr TEXT DEFAULT '',
  content_en TEXT DEFAULT '',
  image_url TEXT,
  emoji TEXT DEFAULT '🌿',
  category TEXT DEFAULT 'Général',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  active BOOLEAN DEFAULT true
);

-- RLS: allow anonymous inserts on quotes (for contact forms)
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon insert quotes" ON quotes FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon select quotes" ON quotes FOR SELECT TO anon USING (false);

-- Public read on products, categories, blog_posts
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products" ON products FOR SELECT TO anon USING (active = true);
CREATE POLICY "Public read categories" ON categories FOR SELECT TO anon USING (true);
CREATE POLICY "Public read blog" ON blog_posts FOR SELECT TO anon USING (active = true);

-- ══════════════════
-- SEED: Categories
-- ══════════════════
INSERT INTO categories (name_fr, name_en, slug, icon, description_fr, description_en) VALUES
('Eaux florales', 'Floral waters', 'eaux-florales', '💧', 'Hydrolats distillés à la vapeur', 'Steam-distilled hydrosols'),
('Huiles essentielles', 'Essential oils', 'huiles-essentielles', '🌿', 'Huiles essentielles pures à 100%', '100% pure essential oils');

-- ══════════════════
-- SEED: Products
-- ══════════════════
INSERT INTO products (name_fr, name_en, slug, description_fr, description_en, benefits_fr, benefits_en, usage_fr, usage_en, category_id, emoji, type, tags_fr, tags_en, color_from, color_to, featured, active) VALUES

('Eau de Rose', 'Rose Water',
 'eau-de-rose',
 'Notre eau de rose est obtenue par distillation à la vapeur de pétales de roses fraîches cueillies à l''aube. Un hydrolat d''une pureté remarquable, au parfum floral délicat et authentique.',
 'Our rose water is obtained by steam distillation of fresh rose petals picked at dawn. A remarkably pure hydrosol with a delicate and authentic floral fragrance.',
 'Purifie et resserre les pores. Hydrate et tonifie la peau en profondeur. Propriétés anti-inflammatoires et apaisantes. Idéale pour les peaux sensibles et mixtes.',
 'Purifies and tightens pores. Deeply hydrates and tones the skin. Anti-inflammatory and soothing properties. Ideal for sensitive and combination skin.',
 'Appliquer en brume sur le visage après nettoyage. Utiliser comme base de sérum ou crème. Ajouter à vos formulations cosmétiques. Peut également être utilisée en cuisine.',
 'Spray on face after cleansing. Use as a serum or cream base. Add to your cosmetic formulations. Can also be used in cooking.',
 1, '🌹', 'eau',
 ARRAY['Cosmétique','Soin peau','Anti-âge','Hydratant'],
 ARRAY['Cosmetic','Skincare','Anti-aging','Hydrating'],
 '#f9d6e3','#e07aaa', true, true),

('Huile Essentielle de Citron', 'Lemon Essential Oil',
 'huile-essentielle-citron',
 'Extraite par distillation à la vapeur de zestes de citrons frais tunisiens, cette huile essentielle offre une fragrance vive et acidulée aux multiples vertus thérapeutiques.',
 'Extracted by steam distillation from fresh Tunisian lemon zests, this essential oil offers a lively and tangy fragrance with multiple therapeutic virtues.',
 'Tonifiante et purifiante. Propriétés antiseptiques et antibactériennes naturelles. Stimule et clarifie le teint. Excellente pour les soins des ongles et des cheveux.',
 'Toning and purifying. Natural antiseptic and antibacterial properties. Stimulates and clarifies the complexion. Excellent for nail and hair care.',
 'Diluer à 2-3% dans une huile végétale avant application cutanée. Quelques gouttes en diffusion pour purifier l''air. Ajouter aux produits ménagers naturels.',
 'Dilute to 2-3% in a carrier oil before skin application. A few drops in a diffuser to purify the air. Add to natural household products.',
 2, '🍋', 'huile',
 ARRAY['Antiseptique','Tonifiant','Aromathérapie','Purifiante'],
 ARRAY['Antiseptic','Toning','Aromatherapy','Purifying'],
 '#fff9c4','#e0b800', true, true),

('Eau et Huile d''Armoise', 'Mugwort Water & Oil',
 'armoise-eau-huile',
 'L''armoise est une plante ancestrale aux multiples vertus. Nous proposons à la fois l''hydrolat et l''huile essentielle obtenus par distillation à la vapeur de plantes fraîches.',
 'Mugwort is an ancestral plant with multiple virtues. We offer both the hydrosol and essential oil obtained by steam distillation of fresh plants.',
 'Apaisante et équilibrante pour le système nerveux. Facilite la digestion. Propriétés antispasmodiques reconnues. Favorise la détente musculaire.',
 'Soothing and balancing for the nervous system. Facilitates digestion. Recognised antispasmodic properties. Promotes muscle relaxation.',
 'Eau : en brume apaisante sur le corps. Huile : diluer à 1% dans huile végétale pour massage. Usage en aromathérapie uniquement, déconseillée aux femmes enceintes.',
 'Water: as a soothing body mist. Oil: dilute to 1% in carrier oil for massage. For aromatherapy use only, not recommended for pregnant women.',
 1, '🌿', 'eau',
 ARRAY['Apaisant','Équilibrant','Bien-être','Digestif'],
 ARRAY['Soothing','Balancing','Wellness','Digestive'],
 '#d4edda','#558b2f', true, true),

('Huile Essentielle de Lavande', 'Lavender Essential Oil',
 'huile-essentielle-lavande',
 'La lavande de Tunisie bénéficie d''un terroir unique qui lui confère une concentration exceptionnelle en linalol. Notre huile est distillée au moment optimal de la floraison.',
 'Tunisian lavender benefits from a unique terroir that gives it an exceptional concentration of linalool. Our oil is distilled at the optimal moment of flowering.',
 'Relaxante et anxiolytique naturelle. Cicatrisante et régénérante pour la peau. Favorise un sommeil de qualité. Anti-inflammatoire et antifongique.',
 'Natural relaxant and anxiolytic. Healing and regenerating for the skin. Promotes quality sleep. Anti-inflammatory and antifungal.',
 'Quelques gouttes sur l''oreiller pour le sommeil. Diluer à 3% pour application cutanée. En diffusion 30 minutes avant le coucher. Usage direct possible sur petites surfaces cutanées.',
 'A few drops on the pillow for sleep. Dilute to 3% for skin application. Diffuse 30 minutes before bedtime. Direct use possible on small skin areas.',
 2, '💜', 'huile',
 ARRAY['Relaxant','Cicatrisant','Sommeil','Anti-âge'],
 ARRAY['Relaxing','Healing','Sleep','Anti-aging'],
 '#dce8ff','#4a6fce', true, true),

('Eau de Fleur d''Oranger', 'Orange Blossom Water',
 'eau-fleur-oranger',
 'Distillée à partir des fleurs fraîches du bigaradier tunisien, notre eau de fleur d''oranger est un trésor olfactif aux propriétés multiples, utilisée depuis des siècles en cuisine et cosmétique.',
 'Distilled from the fresh flowers of the Tunisian bitter orange tree, our orange blossom water is an olfactory treasure with multiple properties, used for centuries in cooking and cosmetics.',
 'Calmante et anxiolytique naturelle. Tonique cutané doux pour tous types de peau. Propriétés antioxydantes. Parfum délicat et long-lasting.',
 'Natural calming and anxiolytic. Gentle skin tonic for all skin types. Antioxidant properties. Delicate and long-lasting fragrance.',
 'En tonique après nettoyage. En cuisine pour pâtisseries et boissons. Ajout à la crème de nuit. En bain relaxant quelques cuillères dans l''eau.',
 'As a tonic after cleansing. In cooking for pastries and drinks. Added to night cream. In a relaxing bath, a few spoonfuls in the water.',
 1, '🌸', 'eau',
 ARRAY['Calmant','Culinaire','Parfumerie','Hydratant'],
 ARRAY['Calming','Culinary','Perfumery','Hydrating'],
 '#fff3e0','#ffa726', true, true),

('Huile Essentielle de Romarin', 'Rosemary Essential Oil',
 'huile-essentielle-romarin',
 'Notre romarin sauvage de Tunisie, cueilli à altitude en pleine floraison, produit une huile essentielle riche en 1,8-cinéole aux propriétés stimulantes exceptionnelles.',
 'Our wild Tunisian rosemary, harvested at altitude in full bloom, produces an essential oil rich in 1,8-cineole with exceptional stimulating properties.',
 'Stimule la circulation sanguine du cuir chevelu. Favorise la pousse et fortifie les cheveux. Améliore la concentration et la mémoire. Tonifiant musculaire efficace.',
 'Stimulates blood circulation in the scalp. Promotes growth and strengthens hair. Improves concentration and memory. Effective muscle tonic.',
 'Capillaire : 5 gouttes dans un shampoing. Massage : diluer à 3% dans huile végétale. Diffusion : 10-15 minutes pour stimuler la concentration.',
 'Hair: 5 drops in shampoo. Massage: dilute to 3% in carrier oil. Diffusion: 10-15 minutes to stimulate concentration.',
 2, '🌾', 'huile',
 ARRAY['Capillaire','Stimulant','Circulatoire','Concentration'],
 ARRAY['Hair care','Stimulating','Circulatory','Concentration'],
 '#e8f5e9','#388e3c', false, true),

('Eau de Menthe', 'Mint Water',
 'eau-de-menthe',
 'Distillée à partir de feuilles de menthe poivrée fraîches, notre hydrolat de menthe offre une fraîcheur immédiate et des propriétés toniques et digestives remarquables.',
 'Distilled from fresh peppermint leaves, our mint hydrosol offers immediate freshness and remarkable toning and digestive properties.',
 'Effet rafraîchissant et tonique immédiat. Apaise les irritations et démangeaisons cutanées. Propriétés digestives en usage interne. Soulage les maux de tête par application locale.',
 'Immediate refreshing and toning effect. Soothes skin irritations and itching. Digestive properties for internal use. Relieves headaches by local application.',
 'En brume rafraîchissante sur le visage et le corps. En compresse froide sur le front contre les maux de tête. Quelques gouttes dans l''eau pour favoriser la digestion.',
 'As a refreshing mist on face and body. As a cold compress on the forehead for headaches. A few drops in water to aid digestion.',
 1, '🌀', 'eau',
 ARRAY['Rafraîchissant','Digestif','Tonique','Apaisant'],
 ARRAY['Refreshing','Digestive','Toning','Soothing'],
 '#e0f7fa','#0097a7', false, true),

('Huile Essentielle d''Eucalyptus', 'Eucalyptus Essential Oil',
 'huile-essentielle-eucalyptus',
 'Notre huile essentielle d''eucalyptus globulus est distillée à partir de feuilles fraîchement récoltées. Haute concentration en 1,8-cinéole garantissant une action respiratoire optimale.',
 'Our eucalyptus globulus essential oil is distilled from freshly harvested leaves. High concentration of 1,8-cineole guaranteeing optimal respiratory action.',
 'Dégage et libère les voies respiratoires. Propriétés expectorantes et mucolytiques. Purifie et assainit l''air ambiant. Effet antiseptique puissant.',
 'Clears and opens the respiratory tract. Expectorant and mucolytic properties. Purifies and sanitises the ambient air. Powerful antiseptic effect.',
 'Diffusion : 4-6 gouttes pour dégager les voies respiratoires. Inhalation : 2 gouttes dans bol d''eau chaude. Massage thoracique : diluer à 5% dans huile végétale.',
 'Diffusion: 4-6 drops to clear the airways. Inhalation: 2 drops in a bowl of hot water. Chest massage: dilute to 5% in carrier oil.',
 2, '🌲', 'huile',
 ARRAY['Respiratoire','Purifiante','Antiseptique','Hiver'],
 ARRAY['Respiratory','Purifying','Antiseptic','Winter'],
 '#f1f8e9','#689f38', false, true),

('Eau de Moringa', 'Moringa Water',
 'eau-de-moringa',
 'Le moringa, surnommé "l''arbre aux mille vertus", nous livre un hydrolat exceptionnel riche en antioxydants, vitamines et minéraux. Un véritable élixir de jeunesse pour la peau.',
 'Moringa, nicknamed "the tree of a thousand virtues", delivers an exceptional hydrosol rich in antioxidants, vitamins and minerals. A true elixir of youth for the skin.',
 'Richesse exceptionnelle en antioxydants et vitamines A, C, E. Régénère et répare les cellules cutanées. Propriétés anti-âge puissantes. Combat les radicaux libres.',
 'Exceptional richness in antioxidants and vitamins A, C, E. Regenerates and repairs skin cells. Powerful anti-aging properties. Fights free radicals.',
 'En soin tonique matin et soir. En masque régénérant mélangé à de l''argile. Comme base de sérum anti-âge. En brume hydratante pendant la journée.',
 'As a morning and evening toning treatment. As a regenerating mask mixed with clay. As an anti-aging serum base. As a hydrating mist during the day.',
 1, '🌺', 'eau',
 ARRAY['Antioxydant','Anti-âge','Régénérant','Nutrition'],
 ARRAY['Antioxidant','Anti-aging','Regenerating','Nutrition'],
 '#f3e5f5','#8e24aa', false, true),

('Huile Essentielle de Thym', 'Thyme Essential Oil',
 'huile-essentielle-thym',
 'Notre thym sauvage tunisien à thymol produit une huile essentielle parmi les plus puissantes de la pharmacopée naturelle. Distillée avec soin pour préserver sa richesse phénolique.',
 'Our Tunisian wild thyme with thymol produces one of the most powerful essential oils in natural pharmacopoeia. Carefully distilled to preserve its phenolic richness.',
 'Antibactérien et antiviral puissant. Renforce et stimule le système immunitaire. Propriétés antifongiques reconnues. Tonique général, booste l''énergie.',
 'Powerful antibacterial and antiviral. Strengthens and stimulates the immune system. Recognised antifungal properties. General tonic, boosts energy.',
 'Usage très dilué obligatoire : max 1% sur la peau. En diffusion courte : 5-10 minutes max. Jamais pur sur la peau. Usage interne uniquement sous contrôle médical.',
 'Very diluted use mandatory: max 1% on skin. Short diffusion: 5-10 minutes max. Never neat on skin. Internal use only under medical supervision.',
 2, '🌼', 'huile',
 ARRAY['Antibactérien','Immunitaire','Énergisant','Puissant'],
 ARRAY['Antibacterial','Immune','Energising','Powerful'],
 '#fff8e1','#f9a825', false, true);

-- ══════════════════
-- SEED: Blog Posts
-- ══════════════════
INSERT INTO blog_posts (title_fr, title_en, slug, excerpt_fr, excerpt_en, content_fr, content_en, emoji, category, published_at) VALUES

('5 utilisations méconnues de l''eau de rose en cosmétique naturelle',
 '5 Lesser-known uses of rose water in natural cosmetics',
 'utilisations-eau-de-rose',
 'L''eau de rose va bien au-delà du simple tonique. Découvrez comment l''intégrer dans vos formulations cosmétiques pour des résultats bluffants.',
 'Rose water goes far beyond a simple toner. Discover how to incorporate it into your cosmetic formulations for surprising results.',
 'Contenu complet de l''article à rédiger...',
 'Full article content to be written...',
 '🌹', 'Bienfaits', NOW() - INTERVAL '5 days'),

('La lavande tunisienne : pourquoi elle est différente des autres',
 'Tunisian lavender: why it is different from the rest',
 'lavande-tunisienne-specificite',
 'Le terroir tunisien confère à la lavande des caractéristiques organoleptiques uniques. Plongée dans les secrets de notre distillation.',
 'The Tunisian terroir gives lavender unique organoleptic characteristics. A dive into the secrets of our distillation.',
 'Contenu complet de l''article à rédiger...',
 'Full article content to be written...',
 '💜', 'Aromathérapie', NOW() - INTERVAL '15 days'),

('Comment choisir une huile essentielle pour votre marque cosmétique',
 'How to choose an essential oil for your cosmetic brand',
 'choisir-huile-essentielle-marque',
 'Grade, pureté, chémotype, certification... Tout ce que vous devez savoir avant de sélectionner une huile essentielle pour vos formulations.',
 'Grade, purity, chemotype, certification... Everything you need to know before selecting an essential oil for your formulations.',
 'Contenu complet de l''article à rédiger...',
 'Full article content to be written...',
 '🌱', 'Guide', NOW() - INTERVAL '30 days');
