import type { Metadata } from "next";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
});
const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-serif',
});
export const metadata: Metadata = {
  title: "Side by SaaS | Benchmark et comparaison SaaS",
  description: "Plateforme de benchmark SaaS basée sur des données d'achats réels. Comparez, négociez et pilotez vos logiciels.",
  icons: {
    icon: [
      { url: "/logo/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/logo/favicon-64.png", type: "image/png", sizes: "64x64" },
    ],
    apple: "/logo/apple-touch-icon.png",
    shortcut: "/logo/favicon-32.png",
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
        className={`${plusJakartaSans.variable} ${lora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
