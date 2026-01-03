import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/NavbarComponent";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoNexus",
  description: "Secure AES encryption and decryption online tool",
  icons: {
    icon: [
      { url: "/cryptologo.png", sizes: "32x32", type: "image/png" },
      { url: "/cryptologo.png", sizes: "16x16", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-slate-200 selection:bg-cyan-500/30 font-sans`}
      >
        {/* GLOBAL VIBRANT CYBERPUNK BACKGROUND */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
          
          {/* 1. Subtle Grid Layer (soft white lines) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          {/* 2. Left Side: Muted Blue to Cyan Glow */}
          <div className="absolute -top-[20%] -left-[10%] h-[800px] w-[800px] rounded-full bg-blue-700/20 blur-[150px] mix-blend-screen" />
          <div className="absolute top-[10%] left-[5%] h-[200px] w-[200px] rounded-full bg-cyan-400/25 blur-[100px] mix-blend-screen" />
          
          {/* 3. Right Side: Muted Green Glow */}
          <div className="absolute top-[0%] -right-[10%] h-[800px] w-[800px] rounded-full bg-green-700/20 blur-[150px] mix-blend-screen" />
          <div className="absolute top-[20%] right-[5%] h-[200px] w-[200px] rounded-full bg-green-400/25 blur-[100px] mix-blend-screen" />

          {/* 4. Bottom Blend: subtle anchor */}
          <div className="absolute -bottom-[10%] left-[20%] h-[500px] w-[500px] rounded-full bg-blue-900/10 blur-[120px]" />
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-10">
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
