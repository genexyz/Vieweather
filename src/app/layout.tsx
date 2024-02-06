import {ReactNode} from "react";
import type {Metadata} from "next";

import "./globals.css";

import {SITE_URL} from "@/lib/utils";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Vieweather",
  description: "Simple and fast weather app with 5 day forecast",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Vieweather",
    url: SITE_URL,
    title: "Vieweather",
    description: "Simple and fast weather app with 5 day forecast",
  },
  robots: {
    follow: true,
    index: true,
  },
  manifest: `${SITE_URL}/site.webmanifest`,
};

export default function RootLayout({children}: Props) {
  return children;
}
