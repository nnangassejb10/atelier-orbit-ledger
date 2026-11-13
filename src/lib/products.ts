import pc2 from "@/assets/pc-2.jpg.asset.json";
import pc3 from "@/assets/pc-3.jpg.asset.json";
import pc4 from "@/assets/pc-4.jpg.asset.json";
import pc5 from "@/assets/pc-5.jpg.asset.json";
import clavier from "@/assets/clavier.jpg";
import ecran from "@/assets/ecran.jpg";
import portable from "@/assets/portable.jpg";
import casque from "@/assets/pc gmaing complet fixe, materiel bureau et chaisse.jpg";
import asus from "@/assets/asus1.png";
import gaming from "@/assets/gaming.webp";
import msi from "@/assets/msi.webp";
import mysit from "@/assets/mysti.png";
import asus_rog from "@/assets/Asus-rog.jpg";
import RYZEN from "@/assets/Ryzen41.jpg";
import gaming41 from "@/assets/GAMING11.webp";
import Lenovo1 from "@/assets/lenovo1.jpg";
import kit from "@/assets/kit12_.jpg";
import hp from "@/assets/hp11.jpg";
import Dell from "@/assets/dell icore i7.jpg";
import casque12 from "@/assets/CASQUE12.webp";
import casque123 from "@/assets/CASQUE33.jpg";
import beat from "@/assets/Casque-Beats-by-Dre-Solo-bluetooth.jpg";
import white from "@/assets/clavier-white.webp";
import casqueM from "@/assets/casqueM.jpg";
import tour from "@/assets/tour-gamer.jpg";
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
  { id: "es-001", name: "MSI Raider HX AI- RTX 5090 - 64 Go Ultra", category: "PC Portable", price: 400000, image: msi },
  { id: "es-002", name: "Bureau Gaming", category: "PC Gaming complet + Table + casque + haut-parleur", price: 420000, image: mysit },
  { id: "es-003", name: "Asus rog 16 Go RAM - 512 Go SSD - 6 Go dédié", category: "PC Gaming", price: 500000, image: asus_rog},
  { id: "es-004", name: "HP iCore 7", category: "PC Portable", price: 250000, image: portable },
  { id: "es-005", name: "Clavier complet", category: "Accessoires", price: 10000, image: clavier },
  { id: "es-006", name: "Écran KooRUI 25\"", category: "Écran", price: 230000, image: ecran },
  { id: "es-007", name: "Alpha-MIKA-n v2 GTX1650", category: "PC Gaming", price: 840000, image: RYZEN },
  { id: "es-008", name: "HP iCore i7 8 Go SSD 256 Windows 11", category: "PC", price: 340000, image: hp },
  { id: "es-009", name: "Écran + clavier + souris + casque", category: "Poste fixe", price: 500000, image: kit },
  { id: "es-010", name: "Lenovo IdeaPad tactile iCore 3", category: "PC", price: 420000, image: Lenovo1 },
  { id: "es-011", name: "PC Gamer ORBE - Intel Core i7-14700KF / NVIDIA GeForce RTX 5070 Ti 16 Go / 1 To", category: "PC", price: 880000, image: gaming },
  { id: "es-012", name: "Lenovo tactile iCore 3", category: "PC", price: 420000, image: asus },
  { id: "es-013", name: "DELL iCore 7", category: "PC", price: 380000, image: Dell },
  { id: "es-014", name: "VIBOX 5500 RTX 5060 16 Go RAM / 1 To NVMe boulanger", category: "PC Gamer complet", price: 900000, image: gaming41 },
];

export const accessories: Product[] = [
  { id: "ac-101", name: "Clavier mécanique RGB", category: "Accessoire", price: 25000, image: white, description: "Design ergonomique et rétroéclairage personnalisable." },
  { id: "ac-102", name: "Casque Audio Pro", category: "Audio", price: 45000, image: casque, description: "Son immersif, micro antibruit, confort supérieur." },
  { id: "ac-103", name: "Écran Ultra HD 27\"", category: "Écran", price: 180000, image: ecran, description: "Qualité d'image exceptionnelle et fluidité incomparable." },
  { id: "ac-104", name: "Casque filaire Confort Max", category: "Audio", price: 25000, image: casqueM, description: "Son clair, ergonomique, compatible ordinateurs, téléphones et tablettes." },
  { id: "ac-105", name: "Ultrabook de travail", category: "PC Portable", price: 250000, image: portable, description: "Léger, autonome, idéal pour le bureau comme pour les déplacements." },
  { id: "ac-106", name: "Tour Gaming compacte", category: "PC Gaming", price: 420000, image: tour, description: "Refroidissement liquide et ventilation RGB dans un format réduit." },
];

export const sale: Product[] = [
  { id: "so-201", name: "Casque Gaming filaire 7.1 Micro Anti-bruit, RGB LED", category: "Casque", price: 10000, oldPrice: 20000, image: casque12 },
  { id: "so-202", name: "Casque Gamer PC Stéréo Microphone Vibration Voyant led cablé", category: "Accessoire", price: 15500, oldPrice: 30000, image: casque123 },
  { id: "so-203", name: "Casque Beats by Dre Solo Bluetooth", category: "Casque", price: 15000, oldPrice: 30000, image: beat },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(n).replace(/\u202f|\u00a0/g, " ") + " FCFA";
