import type { Metadata } from "next";
import { Oswald, Inter_Tight } from "next/font/google";
import MorphPanel from "@/components/ui/ai-input";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-oswald",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: "Salt Route Group | Connecting Local Roots to Global Routes",
  description: "A Nepal-based collective building pathways from local innovation to global opportunity through consulting, experiences, and sustainable development.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${interTight.variable} font-inter antialiased bg-black text-white selection:bg-white selection:text-black`}>
        {children}
        <MorphPanel />
      </body>
    </html>
  );
}
