import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boarding House Ledger",
  description: "Search tenant accounts and track outstanding balances.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <nav className="flex items-center justify-between border-b border-zinc-800 px-6 py-6 md:px-[max(24px,calc((100vw-1000px)/2))]">
          <Link href="/projects" className="font-bold"><span className="mr-2">B</span><span>Boarding House<span className="font-normal text-zinc-400"> / Ledger</span></span></Link>
          <span className="text-xs text-zinc-400"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-white" /> API connected</span>
        </nav>
        {children}
      </body>
    </html>
  );
}
