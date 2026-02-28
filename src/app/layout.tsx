import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hamcodz.duckdns.org'),
  title: {
    default: "HAMCODZ | Full-Stack Developer & Cybersecurity Expert",
    template: "%s | HAMCODZ"
  },
  description: "Full-Stack Developer, Cybersecurity Expert, Forex Trader & EA Developer from Uganda. Specializing in Next.js, Python, MQL5, Penetration Testing & Algorithmic Trading. Building secure systems and profitable algorithms.",
  keywords: [
    "Hamcodz",
    "HAMCODZ",
    "Full-Stack Developer",
    "Cybersecurity Expert",
    "Ethical Hacker",
    "Forex Trader",
    "EA Developer",
    "MQL5 Developer",
    "Algorithmic Trading",
    "Penetration Testing",
    "Next.js Developer",
    "React Developer",
    "Python Developer",
    "Uganda Developer",
    "Kampala Developer",
    "ICT Trading",
    "Price Action Trading",
    "Security Auditor",
    "Web Developer"
  ],
  authors: [{ name: "Hamcodz", url: "https://hamcodz.duckdns.org" }],
  creator: "Hamcodz",
  publisher: "Hamcodz",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': "large",
    },
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hamcodz.duckdns.org",
    title: "HAMCODZ | Full-Stack Developer & Cybersecurity Expert",
    description: "Full-Stack Developer, Cybersecurity Expert, Forex Trader & EA Developer from Uganda.",
    siteName: "HAMCODZ",
    images: [
      {
        url: "https://hamcodz.duckdns.org/logo.svg",
        width: 1200,
        height: 630,
        alt: "HAMCODZ Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HAMCODZ | Full-Stack Developer & Cybersecurity Expert",
    description: "Full-Stack Developer, Cybersecurity Expert, Forex Trader & EA Developer from Uganda.",
    creator: "@hamcodz",
    images: ["https://hamcodz.duckdns.org/logo.svg"],
  },
  verification: {
    google: "https://hamcodz.duckdns.org/",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="canonical" href="https://hamcodz.duckdns.org" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
