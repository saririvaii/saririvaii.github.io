import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
    title: "Saririvaii",
    description: "A Next.js application with Tailwind CSS",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="bg-[#FBFAF8]">
            <body
                className={`${manrope.variable} ${garamond.variable} ${manrope.className} bg-[#FBFAF8]`}
            >
                {children}
            </body>
        </html>
    );
}
