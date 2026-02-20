import StudioClient from "./StudioClient";

// Sanity Studio requires dynamic rendering and cannot be statically exported
// This route will be excluded from static export builds
export const dynamic = "force-dynamic";
export const dynamicParams = true;

// Return empty array to allow all dynamic routes
export async function generateStaticParams() {
    return [];
}

export default function StudioPage() {
    return <StudioClient />;
}
