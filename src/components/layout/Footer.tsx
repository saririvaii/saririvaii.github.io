"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        // Update time immediately
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString("en-AU", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Australia/Melbourne",
                hour12: false,
            });
            setCurrentTime(`${timeString} AEST`);
        };

        updateTime();
        // Update every minute
        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);
    }, []);

    const getInTouchLinks = [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/saririvai" },
        { label: "Github", href: "https://github.com/saririvaii" },
        { label: "Email", href: "mailto:bysaririvai@gmail.com" },
    ];

    const navigationLinks = [
        { label: "Home", href: "/" },
        { label: "Works", href: "/works" },
        { label: "Playground", href: "/playground" },
        { label: "About", href: "/about" },
        // { label: "Contact", href: "/contact" },
    ];

    return (
        <footer className="bg-black-main default-section gap-12 pt-12 pb-8">
            <div className="grid grid-cols-8 gap-4 md:gap-8 w-full">
                {/* Top-left: Name and subtitle */}
                <div className="col-span-8 md:col-span-5 mb-12 md:mb-0">
                    <h2 className="text-hero-title font-sans font-semibold uppercase leading-tight tracking-tight text-white mb-2">
                        SARI RIVAI
                    </h2>
                    <p className="text-white/60 text-button font-sans font-light">
                        Product Designer & Web Developer.
                    </p>
                </div>

                {/* Right-side: Link columns */}
                <div className="col-span-12 md:col-start-6 md:col-span-2 grid grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-0">
                    {/* GET IN TOUCH */}
                    <div>
                        <h3 className="text-white/60 text-xs uppercase tracking-wider font-sans mb-4">
                            GET IN TOUCH
                        </h3>
                        <ul className="space-y-2">
                            {getInTouchLinks.map((link) => (
                                <li key={link.href}>
                                    {link.href.startsWith("http") || link.href.startsWith("mailto") ? (
                                        <a
                                            href={link.href}
                                            target={link.href.startsWith("http") ? "_blank" : undefined}
                                            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                            className="text-white/90 hover:text-white transition-colors font-sans text-button"
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="text-white/90 hover:text-white transition-colors font-sans text-button tracking-tight"
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* NAVIGATION */}
                    <div>
                        <h3 className="text-white/60 text-xs uppercase tracking-wider font-sans mb-4">
                            NAVIGATION
                        </h3>
                        <ul className="space-y-2">
                            {navigationLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/90 hover:text-white transition-colors font-sans text-button tracking-tight"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom row: Copyright, Time, Location */}
            <div className="pt-8 w-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/60 text-xs md:text-sm font-sans">
                    {/* Bottom-left: Copyright */}
                    <div className="order-1 md:order-none text-button">
                        All rights reserved © 2026
                    </div>

                    {/* Bottom-center: Time */}
                    <div className="order-2 md:order-none text-white/70 text-button">
                        {currentTime || "Loading..."}
                    </div>

                    {/* Bottom-right: Location */}
                    <div className="order-3 md:order-none text-button">
                        Melbourne, AU
                    </div>
                </div>
            </div>
        </footer>
    );
}
