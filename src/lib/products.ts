import pc2 from "@/assets/pc-2.jpg.asset.json";
import pc3 from "@/assets/pc-3.jpg.asset.json";
import pc4 from "@/assets/pc-4.jpg.asset.json";
import pc5 from "@/assets/pc-5.jpg.asset.json";
import clavier from "@/assets/clavier.jpg";
import ecran from "@/assets/ecran.jpg";
import portable from "@/assets/portable.jpg";
import casque from "@/assets/casque.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  description?: string;
};

export const products: Product[] = [
  { id: "es-001", name: "Ryzen 5X", category: "PC Gaming", price: 200000, image: pc2.url },
  { id: "es-002", name: "Ryzen 7X", category: "PC Gaming", price: 420000, image: pc3.url },
  { id: "es-003", name: "AMD Core 7", category: "PC Gaming", price: 500000, image: pc4.url },
  { id: "es-004", name: "HP iCore 7", category: "PC Portable", price: 250000, image: portable },
  { id: "es-005", name: "Clavier complet", category: "Accessoires", price: 10000, image: clavier },
  { id: "es-006", name: "Écran KooRUI 25\"", category: "Écran", price: 230000, image: ecran },
  { id: "es-007", name: "Écran Pro 54X25", category: "PC Gaming", price: 340000, image: pc5.url },
  { id: "es-008", name: "HP iCore", category: "PC", price: 240000, image: portable },
  { id: "es-009", name: "Écran + clavier + souris", category: "Poste fixe", price: 500000, image: ecran },
  { id: "es-010", name: "Asus tactile iCore 3", category: "PC", price: 420000, image: portable },
  { id: "es-011", name: "HP tactile iCore 5", category: "PC", price: 380000, image: portable },
  { id: "es-012", name: "Lenovo tactile iCore 3", category: "PC", price: 420000, image: portable },
  { id: "es-013", name: "HP iCore 3", category: "PC", price: 380000, image: portable },
  { id: "es-014", name: "Ryzen 5X GPU", category: "Carte graphique", price: 120000, image: pc5.url },
];

export const accessories: Product[] = [
  { id: "ac-101", name: "Clavier mécanique RGB", category: "Accessoire", price: 25000, image: clavier, description: "Design ergonomique et rétroéclairage personnalisable." },
  { id: "ac-102", name: "Casque Audio Pro", category: "Audio", price: 45000, image: casque, description: "Son immersif, micro antibruit, confort supérieur." },
  { id: "ac-103", name: "Écran Ultra HD 27\"", category: "Écran", price: 180000, image: ecran, description: "Qualité d'image exceptionnelle et fluidité incomparable." },
  { id: "ac-104", name: "Casque filaire Confort Max", category: "Audio", price: 25000, image: casque, description: "Son clair, ergonomique, compatible ordinateurs, téléphones et tablettes." },
  { id: "ac-105", name: "Ultrabook de travail", category: "PC Portable", price: 250000, image: portable, description: "Léger, autonome, idéal pour le bureau comme pour les déplacements." },
  { id: "ac-106", name: "Tour Gaming compacte", category: "PC Gaming", price: 420000, image: pc3.url, description: "Refroidissement liquide et ventilation RGB dans un format réduit." },
];

export const sale: Product[] = [
  { id: "so-201", name: "HP iCore 7", category: "PC Portable", price: 199000, oldPrice: 250000, image: portable },
  { id: "so-202", name: "Clavier Gamer RGB", category: "Accessoire", price: 7500, oldPrice: 10000, image: clavier },
  { id: "so-203", name: "Écran Pro 54X25", category: "Écran", price: 289000, oldPrice: 340000, image: ecran },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(n).replace(/\u202f|\u00a0/g, " ") + " FCFA";
