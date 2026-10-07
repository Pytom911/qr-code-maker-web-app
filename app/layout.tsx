import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR Code Maker – Free & Private",
  description: "Create QR codes instantly in your browser. Free, fast, private. Download as SVG or PNG.",
  keywords: ["qr code maker", "qr generator", "free qr", "browser", "svg qr", "png qr"],
  authors: [{ name: "PytomDev", url: "https://github.com/Pytom911" }],
  openGraph: {
    title: "QR Code Maker – Free & Private",
    description: "Free QR code generator. Runs 100% in your browser.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth selection:bg-amber-400 selection:text-black touch-action-manipulation`}
    >
      <body className="min-h-full bg-zinc-950 font-sans antialiased text-zinc-100 flex flex-col">
        {children}
      </body>
    </html>
  );
}
