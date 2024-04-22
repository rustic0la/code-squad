import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import React, { ReactNode } from "react";
import "./globals.css";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/Avatar";
import { Login } from "@/components/Login";
import { Sidebar } from "@/components/Sidebar";
import { auth } from "@/lib/auth";
import { ThemeProvider } from "@/context/ThemeProvider";

const font = Zen_Maru_Gothic({ weight: "500", subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "CodeSquad",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

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
        <ThemeProvider>
          <div className="fixed right-0 top-0 m-2">
            <Dialog>
              <DialogTrigger asChild>
                {!session?.user ? (
                  <Button size="sm">Войти</Button>
                ) : (
                  <Avatar
                    image={session?.user.image}
                    name={session?.user.name}
                  />
                )}
              </DialogTrigger>
              {!session?.user && <Login />}
            </Dialog>
          </div>
          <Sidebar />
          <div className="w-screen bg-gray-100 dark:bg-gray-900 h-screen overflow-scroll p-6 pl-12">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
