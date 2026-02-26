import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Side by SaaS | Benchmark et comparaison SaaS",
  description: "Plateforme de benchmark SaaS basée sur des données d'achats réels. Comparez, négociez et pilotez vos logiciels.",
  icons: {
    icon: [
      { url: "/logo/navicon.png", type: "image/png", sizes: "32x32" },
      { url: "/logo/navicon.png", type: "image/png", sizes: "48x48" },
    ],
    apple: "/logo/navicon.png",
    shortcut: "/logo/navicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get("x-next-locale") ?? "fr";
  const lang = locale === "en" ? "en" : "fr";
  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
