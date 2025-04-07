import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import { LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

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
          <header className="flex items-center p-4 h-12 shadow-md mb-8 whitespace-nowrap">

            <div className="">
              <TopTitle />
            </div>

            <div className="ml-6">
              <SignedIn>
                <TopMenu />
              </SignedIn>
            </div>

            <div className="flex gap-4 ml-auto">

              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="cursor-pointer">
                    <LogIn className="mr-2" />
                    Sign in
                  </Button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <Button className="cursor-pointer">
                    <UserPlus className="mr-2" />
                    Sign up
                  </Button>
                </SignUpButton>

              </SignedOut>

              <SignedIn>
                <UserButton />
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
