import type { Metadata, Viewport } from "next";
import { Comic_Neue } from "next/font/google";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comic-neue",
});

export const metadata: Metadata = {
  title: "ProRoller - Cortinas Roller y Tradicionales",
  description: "Confección, instalación y automatización de cortinas roller y tradicionales a medida.",
  keywords: "Cortinas, enrollar, tradicionales, automaticos, automatismo, reparacion, a medida, instalación, roller, screen, black out, bambú",
  icons: {
    icon: "/logo_proroller.png",
    shortcut: "/logo_proroller.png",
    apple: "/logo_proroller.png",
  },
  openGraph: {
    title: "ProRoller - Cortinas Roller y Tradicionales",
    description: "Confección, instalación y automatización de cortinas roller y tradicionales a medida.",
    url: "https://pro-roller.vercel.app",
    siteName: "ProRoller",
    images: [
      {
        url: "https://pro-roller.vercel.app/logo_proroller.png",
        width: 1200,
        height: 630,
        alt: "ProRoller Logo",
      },
    ],
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProRoller - Cortinas Roller y Tradicionales",
    description: "Confección, instalación y automatización de cortinas roller y tradicionales a medida.",
    images: ["https://pro-roller.vercel.app/logo_proroller.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth relative">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-93XBH8RTVV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-93XBH8RTVV');
          `}
        </Script>
      </head>
      <body className={`${comicNeue.variable} font-comic antialiased`}>
        {children}
      </body>
    </html>
  );
}
