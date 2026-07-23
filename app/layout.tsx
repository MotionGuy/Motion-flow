import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

/* Anton drives the condensed stacked wordmark only */
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

/* Poppins 800 pairs with Anton inside the wordmark: geometric FLOW under condensed MOTION */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "800",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Motion Flow, the motion studio for cybersecurity",
  description:
    "Launch videos and ads that make complex security products make sense. Explainers, demos, and paid social for cybersecurity teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${poppins.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        {/* Zodiak: high-contrast editorial display serif */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=zodiak@400,401,500,700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
