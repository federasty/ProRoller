import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comic-neue",
});

export const metadata: Metadata = {
  title: "ProRoller - Cortinas Roller y Tradicionales",
  description: "Confección, instalación y automatización de cortinas roller y tradicionales a medida.",
  keywords: "Cortinas, enrollar, tradicionales, automaticos, automatismo, reparacion, a medida, instalación, roller, screen, black out, bambú",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
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
