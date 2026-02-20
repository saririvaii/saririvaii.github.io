import { useEffect, useState, useRef } from "react";
import { client, queries } from "@/lib/sanity";

export function useSanityData<T>(query: string, params?: Record<string, any>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        // Abort previous request if it exists
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new abort controller for this request
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        async function fetchData() {
            try {
                setLoading(true);
                const result = await client.fetch(query, params || {});
                
                // Only update state if request wasn't aborted
                if (!signal.aborted) {
                    setData(result);
                    setError(null);
                }
            } catch (err) {
                // Don't set error if request was aborted
                if (!signal.aborted && err instanceof Error) {
                    setError(err);
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        // Cleanup: abort request on unmount or dependency change
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return { data, loading, error };
}

// Specific hooks for common queries
export function useHero() {
    return useSanityData(queries.hero);
}

export function useProjects() {
    return useSanityData(queries.projects);
}

export function useProject(slug: string) {
    return useSanityData(queries.project, { slug });
}

export function useFeaturedProjects() {
    return useSanityData(queries.featuredProjects);
}

export function useSkills() {
    return useSanityData(queries.skills);
}

export function useHomePage() {
    return useSanityData(queries.homePage);
}
