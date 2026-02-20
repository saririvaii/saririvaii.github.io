import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface LinkButtonProps {
	href: string;
	children: React.ReactNode;
	icon?: LucideIcon;
	iconPosition?: "left" | "right";
	variant?: "primary" | "secondary";
	target?: string;
	rel?: string;
	className?: string;
}

export default function CTAButton({
	href,
	children,
	icon: Icon,
	iconPosition = "right",
	variant = "primary",
	target,
	rel,
	className = "",
}: LinkButtonProps) {
	const baseStyles =
		"font-sans flex items-center gap-2 rounded-lg px-4 py-2.5 text-button tracking-tight transition-colors w-fit";

	const variantStyles = {
		primary:
			"bg-black-main text-white-main hover:bg-black-main/90",
		secondary:
			"bg-black-main/5 text-black-main/60 hover:bg-black-main/10",
	};

	return (
		<Link
			href={href}
			target={target}
			rel={rel}
			className={`${baseStyles} ${variantStyles[variant]} ${className}`}
		>
			{Icon && iconPosition === "left" && <Icon className="h-4 w-4" />}
			{children}
			{Icon && iconPosition === "right" && <Icon className="h-4 w-4" />}
		</Link>
	);
}
