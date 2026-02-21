import { useEffect, useState, useRef } from "react";
import { client, queries } from "@/lib/sanity";

// Cache interface
interface CacheEntry<T> {
    data: T;
    timestamp: number;
    ttl: number; // Time to live in milliseconds
}

// In-memory cache
const cache = new Map<string, CacheEntry<any>>();

// Cache TTL: 5 minutes for projects/homePage, 1 minute for others
const CACHE_TTL = {
    projects: 5 * 60 * 1000, // 5 minutes
    homePage: 5 * 60 * 1000, // 5 minutes
    hero: 5 * 60 * 1000, // 5 minutes (derived from homePage)
    featuredProjects: 5 * 60 * 1000, // 5 minutes
    default: 1 * 60 * 1000, // 1 minute
};

function getCacheKey(query: string, params?: Record<string, any>): string {
    return params ? `${query}:${JSON.stringify(params)}` : query;
}

function getCacheTTL(query: string): number {
    if (query.includes('projects') || query.includes('homePage') || query.includes('hero')) {
        return CACHE_TTL.projects;
    }
    return CACHE_TTL.default;
}

function getCachedData<T>(cacheKey: string): T | null {
    const entry = cache.get(cacheKey);
    if (!entry) return null;
    
    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
        cache.delete(cacheKey);
        return null;
    }
    
    return entry.data as T;
}

function setCachedData<T>(cacheKey: string, data: T, ttl: number): void {
    cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
        ttl,
    });
}

export function useSanityData<T>(query: string, params?: Record<string, any>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const cacheKey = getCacheKey(query, params);
        const cachedData = getCachedData<T>(cacheKey);
        
        // If we have cached data, use it immediately
        if (cachedData !== null) {
            setData(cachedData);
            setLoading(false);
            return;
        }

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
                    
                    // Cache the result
                    const ttl = getCacheTTL(query);
                    setCachedData(cacheKey, result, ttl);
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
