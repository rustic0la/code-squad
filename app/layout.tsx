import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const font = Merriweather({ weight: ["400", "700"], subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "CodeSquad",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </head>
      <body className={font.className}>
        <Navbar />
        <div className="w-full fixed bg-gray-100 h-[calc(100vh-65px)] top-[60px] p-10 overflow-scroll">
          {children}
        </div>
      </body>
    </html>
  );
}
