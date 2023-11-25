import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { ColorSchemeScript } from "@mantine/core";
import { LOCALES } from "@/util/constants";
import { Providers } from "../_components/providers";
import { authOptions } from "@/domain/auth";

type Params = { locale: string };
type Props = { children: ReactNode; params: Params };

export async function generateMetadata({
  params: { locale },
}: {
  params: Params;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: {
      template: t("template"),
      default: t("title"),
    },
    description: t("description"),
    metadataBase: new URL(process.env.WEB_URL!),
    manifest: "manifest.json",
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [{ url: "logo.png" }],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
      images: [{ url: "logo.png" }],
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  if (!LOCALES.includes(locale)) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <Providers locale={locale} session={session}>
          <main className="main-layout">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
