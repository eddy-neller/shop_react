import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contactez-nous - E.N Shop",
  description:
    "Une question ? Une demande ? N'hésitez pas à nous écrire, nous vous répondrons dans les plus brefs délais.",
  keywords: ["contact", "support", "aide", "service client"],
  openGraph: {
    title: "Contactez-nous - E.N Shop",
    description:
      "Une question ? Une demande ? N'hésitez pas à nous écrire, nous vous répondrons dans les plus brefs délais.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h1>
            <p className="text-gray-600">
              Une question ? Une demande ? N&apos;hésitez pas à nous écrire,
              nous vous répondrons dans les plus brefs délais.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
