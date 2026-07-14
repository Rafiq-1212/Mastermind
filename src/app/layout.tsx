import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import { BookCallModalProvider } from "@/components/BookCallModalContext";
import BookCallModal from "@/components/BookCallModal";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Million-Dollar Founder Residency | Athirapalli, Kerala",
  description:
    "Become a 10X Founder. Immersive 3-day residential program in Athirapalli, Kerala, for ambitious founders and creators under 29 from Tamil Nadu to build the systems, identity, and engine to scale to a million-dollar business.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <BookCallModalProvider>
          {children}
          <BookCallModal />
        </BookCallModalProvider>
      </body>
    </html>
  );
}
