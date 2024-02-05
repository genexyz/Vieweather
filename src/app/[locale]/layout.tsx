import {Inter} from "next/font/google";

import "../globals.css";

import {locales} from "@/navigation";
import {NextIntlClientProvider, useMessages} from "next-intl";
import {unstable_setRequestLocale} from "next-intl/server";

import Navbar from "@/components/navbar";

import {ThemeProvider, UnitProvider} from "../providers";

const inter = Inter({subsets: ["latin"]});

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

const LocaleLayout = ({
  children,
  params: {locale},
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) => {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} root-body`}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <UnitProvider>
              <Navbar />
              {children}
            </UnitProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
