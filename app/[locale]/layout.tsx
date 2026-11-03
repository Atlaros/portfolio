import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { MotionProvider } from "@/components/motion/MotionProvider";
import {
  SITE_NAME,
  TITLE_TEMPLATE,
  buildLanguageAlternates,
  getSiteSeoCopy,
  openGraphLocale,
} from "@/lib/i18n/seo";
import { isLocale, locales } from "@/lib/i18n/locales";
import { getSiteUrl } from "@/lib/seo/site";
import "../globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export function generateStaticParams() {
  return Object.values(locales).map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return { title: SITE_NAME };
  }

  const site = getSiteUrl();
  const { description } = getSiteSeoCopy(locale);
  const canonical = `${site}/${locale}`;

  return {
    title: {
      default: SITE_NAME,
      template: TITLE_TEMPLATE,
    },
    description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(""),
    },
    openGraph: {
      type: "website",
      locale: openGraphLocale[locale],
      url: canonical,
      title: SITE_NAME,
      description,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
