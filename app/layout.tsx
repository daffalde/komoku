import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // Ganti import ke Plus Jakarta Sans
import "./globals.css";

// 1. Inisialisasi font Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta", // Variabel CSS untuk dipanggil di .css
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Awesome App", // Sesuaikan judul aplikasi kamu
  description: "Built with Next.js and Plus Jakarta Sans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      {/* 2. Tambahkan className font ke body agar aktif secara global */}
      <body className={plusJakartaSans.className}>{children}</body>
    </html>
  );
}
