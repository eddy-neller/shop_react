import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/QueryProvider";
import { SessionProvider } from "@/providers/SessionProvider";
import AuthTokenSync from "@/features/Auth/components/AuthTokenSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop - E-commerce moderne",
  description:
    "Découvrez notre sélection de produits de qualité. E-commerce moderne avec une expérience utilisateur optimale.",
  keywords: ["e-commerce", "boutique en ligne", "achat en ligne", "produits"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <SessionProvider>
            <AuthTokenSync />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
