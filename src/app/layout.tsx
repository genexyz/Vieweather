import {ReactNode} from "react";
import type {Metadata} from "next";

import "./globals.css";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Vieweather",
  description: "Simple and fast weather app with 5 day forecast",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL as string),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Vieweather",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Vieweather",
    description: "Simple and fast weather app with 5 day forecast",
  },
  robots: {
    follow: true,
    index: true,
  },
  manifest: `${process.env.NEXT_PUBLIC_APP_URL}/site.webmanifest`,
};

export default function RootLayout({children}: Props) {
  return children;
}
