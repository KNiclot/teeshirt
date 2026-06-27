export type Gamme = 'classique' | 'premium'
export type Categorie = 'batiment' | 'route' | 'mecanique'
export type Couleur = 'noir' | 'blanc' | 'gris'
export type Taille = 'S' | 'M' | 'L' | 'XL' | 'XXL'

export interface Product {
  slug: string
  titre: string
  phrase: string
  gamme: Gamme
  categorie: Categorie
  metier: string
  prix: number
  printfulId: string
  couleurs: Couleur[]
  tailles: Taille[]
  bestseller?: boolean
}

export const TAILLES: Taille[] = ['S', 'M', 'L', 'XL', 'XXL']
export const COULEURS: Couleur[] = ['noir', 'blanc', 'gris']

export const PRIX: Record<Gamme, number> = {
  classique: 19.99,
  premium: 29.90,
}

export const METIERS_BATIMENT = [
  'maçon', 'électricien', 'plombier', 'charpentier', 'couvreur', 'carreleur', 'peintre'
]
export const METIERS_ROUTE = ['routier', 'chauffeur PL', 'grutier', "conducteur d'engins"]
export const METIERS_MECANIQUE = ['mécanicien auto', 'mécanicien moto', 'carrossier']

export const products: Product[] = [
  // BÂTIMENT — CLASSIQUE
  {
    slug: 'fier-detre-macon',
    titre: 'Fier d\'être Maçon',
    phrase: 'Fier d\'être Maçon',
    gamme: 'classique',
    categorie: 'batiment',
    metier: 'maçon',
    prix: 19.99,
    printfulId: 'printful-macon-classique',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
    bestseller: true,
  },
  {
    slug: 'macon-de-pere-en-fils',
    titre: 'Maçon de Père en Fils',
    phrase: 'Maçon de Père en Fils',
    gamme: 'classique',
    categorie: 'batiment',
    metier: 'maçon',
    prix: 19.99,
    printfulId: 'printful-macon-classique-2',
    couleurs: ['noir', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'macon-brique-par-brique',
    titre: 'Brique par Brique',
    phrase: 'Je construis ce monde brique par brique',
    gamme: 'premium',
    categorie: 'batiment',
    metier: 'maçon',
    prix: 29.90,
    printfulId: 'printful-macon-premium',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
    bestseller: true,
  },
  {
    slug: 'fier-detre-electricien',
    titre: 'Fier d\'être Électricien',
    phrase: 'Fier d\'être Électricien',
    gamme: 'classique',
    categorie: 'batiment',
    metier: 'électricien',
    prix: 19.99,
    printfulId: 'printful-electricien-classique',
    couleurs: ['noir', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'electricien-qui-branche',
    titre: 'Celui Qui Branche',
    phrase: 'Je suis celui qui branche — ne touchez pas',
    gamme: 'premium',
    categorie: 'batiment',
    metier: 'électricien',
    prix: 29.90,
    printfulId: 'printful-electricien-premium',
    couleurs: ['noir', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
    bestseller: true,
  },
  {
    slug: 'fier-detre-plombier',
    titre: 'Fier d\'être Plombier',
    phrase: 'Fier d\'être Plombier',
    gamme: 'classique',
    categorie: 'batiment',
    metier: 'plombier',
    prix: 19.99,
    printfulId: 'printful-plombier-classique',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'plombier-assez-fou',
    titre: 'Assez Fou pour être Plombier',
    phrase: 'Assez fou pour être plombier, assez doué pour le rester',
    gamme: 'premium',
    categorie: 'batiment',
    metier: 'plombier',
    prix: 29.90,
    printfulId: 'printful-plombier-premium',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
    bestseller: true,
  },
  {
    slug: 'plombier-ex-tuyaux',
    titre: 'Mon ex m\'a quitté, mes tuyaux jamais',
    phrase: 'Mon ex m\'a quitté, mes tuyaux jamais',
    gamme: 'premium',
    categorie: 'batiment',
    metier: 'plombier',
    prix: 24.90,
    printfulId: '443008651',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'fier-detre-charpentier',
    titre: 'Fier d\'être Charpentier',
    phrase: 'Fier d\'être Charpentier',
    gamme: 'classique',
    categorie: 'batiment',
    metier: 'charpentier',
    prix: 19.99,
    printfulId: 'printful-charpentier-classique',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'charpentier-bois-noble',
    titre: 'Le Bois, c\'est Noble',
    phrase: 'Le bois c\'est noble — le reste c\'est du bricolage',
    gamme: 'premium',
    categorie: 'batiment',
    metier: 'charpentier',
    prix: 29.90,
    printfulId: 'printful-charpentier-premium',
    couleurs: ['noir', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'fier-detre-couvreur',
    titre: 'Fier d\'être Couvreur',
    phrase: 'Fier d\'être Couvreur',
    gamme: 'classique',
    categorie: 'batiment',
    metier: 'couvreur',
    prix: 19.99,
    printfulId: 'printful-couvreur-classique',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'couvreur-au-sommet',
    titre: 'Au Sommet',
    phrase: 'Au sommet depuis toujours — demandez-moi comment',
    gamme: 'premium',
    categorie: 'batiment',
    metier: 'couvreur',
    prix: 29.90,
    printfulId: 'printful-couvreur-premium',
    couleurs: ['noir', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'fier-detre-carreleur',
    titre: 'Fier d\'être Carreleur',
    phrase: 'Fier d\'être Carreleur',
    gamme: 'classique',
    categorie: 'batiment',
    metier: 'carreleur',
    prix: 19.99,
    printfulId: 'printful-carreleur-classique',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'fier-detre-peintre',
    titre: 'Fier d\'être Peintre',
    phrase: 'Fier d\'être Peintre',
    gamme: 'classique',
    categorie: 'batiment',
    metier: 'peintre',
    prix: 19.99,
    printfulId: 'printful-peintre-classique',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },

  // ROUTE & TRANSPORT — CLASSIQUE & PREMIUM
  {
    slug: 'fier-detre-routier',
    titre: 'Fier d\'être Routier',
    phrase: 'Fier d\'être Routier',
    gamme: 'classique',
    categorie: 'route',
    metier: 'routier',
    prix: 19.99,
    printfulId: 'printful-routier-classique',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
    bestseller: true,
  },
  {
    slug: 'routier-roi-de-la-route',
    titre: 'Roi de la Route',
    phrase: 'La route est mon bureau, le bitume est mon royaume',
    gamme: 'premium',
    categorie: 'route',
    metier: 'routier',
    prix: 29.90,
    printfulId: 'printful-routier-premium',
    couleurs: ['noir', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
    bestseller: true,
  },
  {
    slug: 'fier-detre-chauffeur-pl',
    titre: 'Fier d\'être Chauffeur PL',
    phrase: 'Fier d\'être Chauffeur PL',
    gamme: 'classique',
    categorie: 'route',
    metier: 'chauffeur PL',
    prix: 19.99,
    printfulId: 'printful-chauffeurpl-classique',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'chauffeur-pl-sans-lui',
    titre: 'Sans Moi Vous Avez Rien',
    phrase: 'Sans les chauffeurs PL, les rayons sont vides',
    gamme: 'premium',
    categorie: 'route',
    metier: 'chauffeur PL',
    prix: 29.90,
    printfulId: 'printful-chauffeurpl-premium',
    couleurs: ['noir', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'fier-detre-grutier',
    titre: 'Fier d\'être Grutier',
    phrase: 'Fier d\'être Grutier',
    gamme: 'classique',
    categorie: 'route',
    metier: 'grutier',
    prix: 19.99,
    printfulId: 'printful-grutier-classique',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'grutier-plus-haut',
    titre: 'Plus Haut que les Autres',
    phrase: 'Je vois le chantier d\'en haut — les autres voient juste leurs pieds',
    gamme: 'premium',
    categorie: 'route',
    metier: 'grutier',
    prix: 29.90,
    printfulId: 'printful-grutier-premium',
    couleurs: ['noir', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
    bestseller: true,
  },
  {
    slug: 'fier-detre-conducteur-engins',
    titre: "Fier d'être Conducteur d'Engins",
    phrase: "Fier d'être Conducteur d'Engins",
    gamme: 'classique',
    categorie: 'route',
    metier: "conducteur d'engins",
    prix: 19.99,
    printfulId: 'printful-conductengins-classique',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },

  // MÉCANIQUE — CLASSIQUE & PREMIUM
  {
    slug: 'fier-detre-mecanicien-auto',
    titre: 'Fier d\'être Mécanicien Auto',
    phrase: 'Fier d\'être Mécanicien Auto',
    gamme: 'classique',
    categorie: 'mecanique',
    metier: 'mécanicien auto',
    prix: 19.99,
    printfulId: 'printful-mecauto-classique',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
    bestseller: true,
  },
  {
    slug: 'mecanicien-auto-diagnostique',
    titre: 'Le Docteur des Voitures',
    phrase: 'Je diagnostique ce que les autres ne comprennent même pas',
    gamme: 'premium',
    categorie: 'mecanique',
    metier: 'mécanicien auto',
    prix: 29.90,
    printfulId: 'printful-mecauto-premium',
    couleurs: ['noir', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
    bestseller: true,
  },
  {
    slug: 'fier-detre-mecanicien-moto',
    titre: 'Fier d\'être Mécanicien Moto',
    phrase: 'Fier d\'être Mécanicien Moto',
    gamme: 'classique',
    categorie: 'mecanique',
    metier: 'mécanicien moto',
    prix: 19.99,
    printfulId: 'printful-mecamoto-classique',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'mecanicien-moto-passion',
    titre: 'La Moto dans le Sang',
    phrase: 'La moto c\'est dans le sang — et un peu dans les mains aussi',
    gamme: 'premium',
    categorie: 'mecanique',
    metier: 'mécanicien moto',
    prix: 29.90,
    printfulId: 'printful-mecamoto-premium',
    couleurs: ['noir', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'fier-detre-carrossier',
    titre: 'Fier d\'être Carrossier',
    phrase: 'Fier d\'être Carrossier',
    gamme: 'classique',
    categorie: 'mecanique',
    metier: 'carrossier',
    prix: 19.99,
    printfulId: 'printful-carrossier-classique',
    couleurs: ['noir', 'blanc', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'carrossier-comme-neuf',
    titre: 'Comme Neuf',
    phrase: 'Je remets les blessures à neuf — l\'assurance aime pas ça',
    gamme: 'premium',
    categorie: 'mecanique',
    metier: 'carrossier',
    prix: 29.90,
    printfulId: 'printful-carrossier-premium',
    couleurs: ['noir', 'gris'],
    tailles: ['S', 'M', 'L', 'XL', 'XXL'],
    bestseller: true,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategorie(cat: Categorie): Product[] {
  return products.filter((p) => p.categorie === cat)
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.bestseller)
}

export const CATEGORIES_META: Record<Categorie, { label: string; emoji: string; description: string }> = {
  batiment: { label: 'Bâtiment', emoji: '🏗️', description: 'Maçon, électricien, plombier, charpentier, couvreur, carreleur, peintre' },
  route: { label: 'Route & Transport', emoji: '🚛', description: 'Routier, chauffeur PL, grutier, conducteur d\'engins' },
  mecanique: { label: 'Mécanique', emoji: '🔧', description: 'Mécanicien auto, mécanicien moto, carrossier' },
}
