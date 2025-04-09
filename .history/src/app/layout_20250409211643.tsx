import type { Metadata } from "next";
import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import { Button } from "@/components/ui/button"


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

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
    <>
      <ClerkProvider>
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedOut>
                <SignIn routing="hash" afterSignInUrl="/" afterSignUpUrl="/" />
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </header>
            {children}
          </body>
        </html>
      </ClerkProvider>

      {/* <ClerkProvider>
        <html lang="ja">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <SidebarProvider>
              <AppSidebar />
              <main>
                <SidebarTrigger />
              </main>
            </SidebarProvider>
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>

            <div className="mx-8">
              {children}
            </div>
          </body>
        </html>
      </ClerkProvider> */}

      {/*
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
      */}
    </>
  );
}
