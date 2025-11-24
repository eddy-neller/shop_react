import type { Metadata } from "next";

/**
 * Configuration par défaut des métadonnées pour le site
 */
const defaultMetadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"
  ),
  title: {
    default: "Shop - E-commerce moderne",
    template: "%s | Shop",
  },
  description:
    "Découvrez notre sélection de produits de qualité. E-commerce moderne avec une expérience utilisateur optimale.",
  keywords: ["e-commerce", "boutique en ligne", "achat en ligne", "produits"],
  authors: [{ name: "Shop Team" }],
  creator: "Shop",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Shop",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Fonction helper pour créer des métadonnées de page
 */
export function createPageMetadata(
  title: string,
  description: string,
  options?: Partial<Metadata>
): Metadata {
  return {
    ...defaultMetadata,
    title,
    description,
    ...options,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      ...options?.openGraph,
    },
  };
}

/**
 * Exemple d'utilisation avec generateMetadata pour des pages dynamiques
 *
 * export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
 *   const product = await fetchProduct(params.id);
 *
 *   return createPageMetadata(
 *     product.name,
 *     product.description,
 *     {
 *       openGraph: {
 *         images: [product.image],
 *       },
 *     }
 *   );
 * }
 */
