import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/app/components/Header';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="bg-[hsl(var(--background))] flex min-h-screen flex-col items-center justify-center pt-10 sm:pt-24 sm:pr-36 sm:pl-36 sm:pb-24">
                    <div className="flex flex-col items-center">
                        <Header/>
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
