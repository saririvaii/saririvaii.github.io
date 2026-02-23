import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Header from "@/components/layout/Header";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    display: "swap",
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const garamond = localFont({
    src: "./GaramondPremrPro-Bd.otf",
    variable: "--font-garamond",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Sari Rivai | Product Designer & Web Developer",
    description: "Sari Rivai is a Melbourne-based product designer and developer specialising in accessibility-driven, system-level digital experiences. She partners closely with engineering to ship performant, scalable products grounded in research, clarity, and long-term maintainability.",
    keywords: ["Product Designer", "Web Developer", "Melbourne", "Australia", "Design", "Development", "UI/UX", "Frontend", "Backend", "Full Stack", "Portfolio", "Resume", "About", "Contact", "Accessibility", "System-Level", "Digital Experiences", "Research", "Clarity", "Long-term Maintainability"],
    authors: [{ name: "Sari Rivai", url: "https://saririvai.vercel.app" }],
    creator: "Sari Rivai",
    publisher: "Sari Rivai",
    openGraph: {
        title: "Sari Rivai | Product Designer & Web Developer",
        description: "Sari Rivai is a Melbourne-based product designer and developer specialising in accessibility-driven, system-level digital experiences. She partners closely with engineering to ship performant, scalable products grounded in research, clarity, and long-term maintainability.",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="bg-white-main">
            <body
                className={`${manrope.variable} ${garamond.variable} ${manrope.className} bg-white-main`}
            >
                <SmoothScrollProvider>
                    <Header />
                    {children}
                </SmoothScrollProvider>
            </body>
        </html>
    );
}
