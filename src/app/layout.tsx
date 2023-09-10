import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Fake shop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="./next.svg" type="image/x-icon" />
      </head>
      <body className={montserrat.className}>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
