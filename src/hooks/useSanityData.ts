import { useEffect, useState } from 'react'
import { client, queries } from '@/lib/sanity'

export function useSanityData<T>(query: string, params?: Record<string, any>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const result = await client.fetch(query, params || {})
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [query, params])

  return { data, loading, error }
}

// Specific hooks for common queries
export function useHero() {
  return useSanityData(queries.hero)
}

export function useProjects() {
  return useSanityData(queries.projects)
}

export function useProject(slug: string) {
  return useSanityData(queries.project, { slug })
}

export function useFeaturedProjects() {
  return useSanityData(queries.featuredProjects)
}

export function useSkills() {
  return useSanityData(queries.skills)
}

export function useHomePage() {
  return useSanityData(queries.homePage)
}
