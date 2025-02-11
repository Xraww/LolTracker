import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import LanguageSelector from "@/components/LanguageSelector";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "GG Tracker - League of Legends Stats",
    description: "Track your League of Legends stats in real-time",
    keywords: "League of Legends, Stats Tracker, LoL, Summoner Stats, Champion Stats",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[rgb(13,13,13)] text-white min-h-screen`}>
                <LanguageProvider>
                    <div className="flex flex-col min-h-screen">
                        <Header />

                        <main className="w-full flex-grow">
                            {children}
                        </main>

                        <LanguageSelector />
                    </div>
                </LanguageProvider>
            </body>
        </html>
    );
}