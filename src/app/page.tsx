import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/features/Shop/types/shop";

export const metadata: Metadata = {
  title: "Accueil - E.N Shop",
  description:
    "Découvrez notre sélection de produits de qualité, soigneusement choisis pour vous offrir la meilleure expérience d'achat en ligne.",
  keywords: ["e-commerce", "boutique en ligne", "produits", "achat en ligne"],
  openGraph: {
    title: "Accueil - E.N Shop",
    description:
      "Découvrez notre sélection de produits de qualité, soigneusement choisis pour vous offrir la meilleure expérience d'achat en ligne.",
    type: "website",
  },
};

// Données mockées pour les produits en vedette
const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Produit Premium",
    description:
      "Un produit de qualité supérieure conçu pour répondre à tous vos besoins.",
    price: 99.99,
    image: "/api/placeholder/300/200",
    category: "Premium",
  },
  {
    id: "2",
    name: "Produit Standard",
    description: "Une solution fiable et abordable pour votre quotidien.",
    price: 49.99,
    image: "/api/placeholder/300/200",
    category: "Standard",
  },
  {
    id: "3",
    name: "Produit Essentiel",
    description: "L'essentiel à portée de main, qualité garantie.",
    price: 29.99,
    image: "/api/placeholder/300/200",
    category: "Essentiel",
  },
];

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Bienvenue sur Shop</h1>
            <p className="text-xl mb-8 text-blue-100">
              Découvrez notre sélection de produits de qualité, soigneusement
              choisis pour vous offrir la meilleure expérience d&apos;achat en
              ligne.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Produits en vedette */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Produits en vedette
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de produits les plus populaires, choisis
            pour leur qualité et leur valeur exceptionnelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden">
              <div className="h-48 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Image produit</span>
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-bold text-primary">
                  {product.price.toFixed(2)} €
                </span>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-100 font-medium"
                >
                  Voir plus
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Section À propos */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Pourquoi nous choisir ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Livraison rapide
                </h3>
                <p className="text-gray-600">
                  Recevez vos commandes rapidement et en toute sécurité.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Qualité garantie
                </h3>
                <p className="text-gray-600">
                  Tous nos produits sont sélectionnés pour leur qualité
                  exceptionnelle.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Support client
                </h3>
                <p className="text-gray-600">
                  Notre équipe est là pour vous aider à tout moment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
