import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";

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
            <body className={`${inter.className} bg-gray-950 text-white min-h-screen`}>
                <div className="flex flex-col min-h-screen">
                    <header className="bg-gray-900 border-b border-gray-800">
                        <div className="container mx-auto px-4 py-4">
                            <Navbar />
                        </div>
                    </header>

                    <main className="flex-grow container mx-auto px-4 py-8">
                        {children}
                    </main>

                    <footer className="bg-gray-900 border-t border-gray-800">
                        <div className="container mx-auto px-4 py-6 text-center text-gray-400">
                            <p>&copy; {new Date().getFullYear()} GG Tracker. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
}
