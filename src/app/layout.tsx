import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "GG Tracker - Valorant & League of Legends Stats",
    description: "Track your Valorant and League of Legends stats in real-time",
    keywords: "Valorant, League of Legends, Stats Tracker, Gaming, LoL",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[rgb(13,13,13)] text-white min-h-screen`}>
                <div className="flex flex-col min-h-screen">
                    <Header />

                    <main className="w-full flex-grow">
                        {children}
                    </main>

                    <Footer />
                </div>
            </body>
        </html>
    );
}
