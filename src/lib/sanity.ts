import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    useCdn: process.env.NODE_ENV === "production",
    apiVersion: "2024-01-01",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}

// GROQ Queries
export const queries = {
    // Home page queries
    homePage: `*[_type == "homePage"][0]`,

    // Hero queries (from home page)
    hero: `*[_type == "homePage"][0].hero{
    title,
    description,
    primaryButton,
    secondaryButton,
    heroImage,
    animatedHeroImage{
      desktopImages[]{
        ...,
        asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      mobileImages[]{
        ...,
        asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      }
    }
  }`,

    // Project queries (consolidated with blog functionality)
    projects: `*[_type == "project"] | order(orderRank asc) {
    _id,
    preTitle,
    heroTitle,
    heroIntro,
    heroStats[]{
      number,
      description
    },
    heroImage,
    slug,
    featuredImage,
    technologies,
    category,
    liveUrl,
    githubUrl,
    featured,
    publishedAt,
    tags,
    orderRank
  }`,

    featuredProjects: `*[_type == "project" && featured == true] | order(orderRank asc) [0...3] {
    _id,
    preTitle,
    heroTitle,
    heroIntro,
    heroStats[]{
      number,
      description
    },
    heroImage,
    slug,
    featuredImage,
    technologies,
    category,
    liveUrl,
    githubUrl,
    publishedAt,
    tags,
    orderRank
  }`,

    project: `*[_type == "project" && slug.current == $slug][0] {
    _id,
    preTitle,
    heroTitle,
    heroIntro,
    heroStats[]{
      number,
      description
    },
    heroImage,
    slug,
    content,
    featuredImage,
    gallery,
    technologies,
    category,
    liveUrl,
    githubUrl,
    featured,
    publishedAt,
    tags
  }`,

    // Skills queries (from skills page)
    skills: `*[_type == "skillsPage"][0].categories[]{
    name,
    skills
  }`,

    skillsPage: `*[_type == "skillsPage"][0]`,
};
