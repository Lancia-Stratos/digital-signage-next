import type { Metadata } from "next";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import { LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import TopTitle from "./components/TopTitle";
import TopMenu from "./components/TopMenu";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ja">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex px-4 py-2 h-12 mb-8 whitespace-nowrap">

            <div className="">
              <TopTitle />
            </div>

            <div className="ml-2">
              <SignedIn>
                <TopMenu />
              </SignedIn>
            </div>

            <div className="flex gap-4 ml-auto">

              <SignedOut>
                <Link href="/sign-in">
                  <Button className="cursor-pointer">
                    <LogIn className="mr-2" />
                    Sign in
                  </Button>
                </Link>

                <Link href="/sign-up">
                  <Button className="cursor-pointer">
                    <UserPlus className="mr-2" />
                    Sign up
                  </Button>
                </Link>
              </SignedOut>

              <SignedIn>
                <div className="ml-2 flex items-end">
                  <UserButton />
                </div>
              </SignedIn>
            </div>

          </header>

          <div className="mx-8">
            {children}
          </div>

        </body>
      </html>
    </ClerkProvider>
  );
}
