import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBarWrapper from "./components/NavBarWrapper";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Templates",
  description: "Method:CRM Templates Website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NavBarWrapper />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}