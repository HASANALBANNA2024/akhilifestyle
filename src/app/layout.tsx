import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { SupportFab } from "@/components/layout/SupportFab";
import { catalogApi } from "@/lib/api/catalog";
import { safe } from "@/lib/api/safe";
import { SITE } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

// ফন্ট: বাংলা + ইংরেজি দুটোর জন্য Hind Siliguri, লোগোর জন্য Dancing Script
const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});
const script = Dancing_Script({ subsets: ["latin"], weight: ["700"], variable: "--font-script", display: "swap" });

// ===== সারা সাইটের ডিফল্ট SEO / Meta tag =====
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} - ব্যাগ, জুয়েলারি ও লাইফস্টাইল অ্যাক্সেসরিজ`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["Akhi Lifestyle", "ব্যাগ", "জুয়েলারি", "অ্যাক্সেসরিজ", "অনলাইন শপ বাংলাদেশ", "ক্যাশ অন ডেলিভারি"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "bn_BD", siteName: SITE.name, url: SITE.url,
    title: `${SITE.name} - ${SITE.tagline}`, description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#db1450",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await safe(catalogApi.categories(), []);
  return (
    <html lang="bn" className={`${hind.variable} ${script.variable}`}>
      <body className="min-h-screen bg-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <Providers>
          <Header categories={categories} />
          <main className="container-x py-5 md:py-8">{children}</main>
          <Footer />
          <MobileNav />
          <SupportFab />
        </Providers>
      </body>
    </html>
  );
}
