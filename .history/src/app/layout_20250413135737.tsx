import {
  ClerkProvider,
  SignedOut,
} from '@clerk/nextjs'

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

export const metadata = {
  title: "Digital Signage System",
  description: "Digital Signage System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClerkProvider>
        <html lang="ja">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <header className="">

              <SignedOut>
                <div className="mt-10 text-8xl font-bold text-center mb-20">
                  <p>Digital Signage</p>
                  <p>System</p>
                </div>
              </SignedOut>

            </header>
            <main className="w-full">
              {children}
            </main>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
