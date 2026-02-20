"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { label: "Works", href: "/works" },
        { label: "Playground", href: "/playground" },
        { label: "About", href: "/about" },
        { label: "Let's Chat", href: "/contact" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 font-sans">
            {/* <div className="default-section py-6 backdrop-blur-md bg-gradient-to-b from-white-main to-white-main/0"> */}
            <div className="default-section py-6 bg-white-main">
                <nav className="w-full flex md:col-span-full md:grid md:gap-4 md:grid-cols-8 items-center justify-between">
                {/* Logo/Brand */}
                <Link
                    href="/"
                    className="text-black-main/40 text-body-small uppercase hover:opacity-80 transition-opacity col-span-2"
                >
                    Sari Rivai
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-10 md:col-start-6 md:col-span-3">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className="text-button text-black-main/60 text-caption hover:opacity-70 transition-opacity"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="md:hidden text-black-main"
                    aria-label="Toggle menu"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-black-main/10 bg-white-main/95 backdrop-blur-md mt-4">
                        <ul className="flex flex-col py-4">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="block py-3 text-black-main text-base hover:opacity-70 transition-opacity"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}
