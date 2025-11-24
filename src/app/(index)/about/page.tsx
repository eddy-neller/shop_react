import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos - E.N Shop",
  description:
    "Découvrez l'histoire de notre boutique en ligne et notre engagement envers la qualité.",
  keywords: ["about", "histoire", "engagement", "qualité"],
  openGraph: {
    title: "À propos - E.N Shop",
    description:
      "Découvrez l'histoire de notre boutique en ligne et notre engagement envers la qualité.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">À propos</h1>
            <p className="text-gray-600">
              Découvrez l&apos;histoire de notre boutique en ligne et notre
              engagement envers la qualité.
            </p>
          </div>

          <div className="text-gray-600">
            <p>
              Nous sommes une boutique en ligne passionnée par la qualité et la
              satisfaction de nos clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
