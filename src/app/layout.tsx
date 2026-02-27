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
  title: "Hamcodz | Developer • Security Expert • Trader",
  description: "Multi-disciplinary technologist specializing in full-stack development, cybersecurity, algorithmic trading, and EA development. Building secure systems, profitable algorithms, and protecting digital assets.",
  keywords: [
    "Hamcodz", 
    "Full-Stack Developer", 
    "Cybersecurity Expert", 
    "Forex Trader", 
    "EA Developer", 
    "Ethical Hacker",
    "Algorithmic Trading",
    "Penetration Testing",
    "MQL5",
    "Python",
    "TypeScript",
    "Security Auditor",
    "ICT Trading"
  ],
  authors: [{ name: "Hamcodz" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Hamcodz | Developer • Security Expert • Trader",
    description: "Multi-disciplinary technologist specializing in full-stack development, cybersecurity, algorithmic trading, and EA development.",
    url: "https://hamcodz.is-a.dev",
    siteName: "Hamcodz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamcodz | Developer • Security Expert • Trader",
    description: "Multi-disciplinary technologist specializing in full-stack development, cybersecurity, algorithmic trading, and EA development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
