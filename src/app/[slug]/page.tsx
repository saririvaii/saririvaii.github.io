import { client } from "@/lib/sanity";
import ProjectClient from "./ProjectClient";

export const revalidate = 3600;

// Generate static params for all projects
export async function generateStaticParams() {
    const projects = await client.fetch(`*[_type == "project"] {
    "slug": slug.current
  }`);

    return projects.map((project: any) => ({
        slug: project.slug,
    }));
}

interface ProjectPostProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ProjectPost({ params }: ProjectPostProps) {
    const resolvedParams = await params;
    const [project, allProjects] = await Promise.all([
        client.fetch(
            `*[_type == "project" && slug.current == $slug][0] {
    _id,
    preTitle,
    heroTitle,
    heroIntro,
    heroStats[]{
      number,
      description
    },
    heroImage{
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
    heroVideo {
      asset-> {
        url
      }
    },
    slug,
    sections[]{
      _key,
      title,
      contentBlocks[]{
        _key,
        headline,
        body[]{
          ...,
          _type == "videoBlock" => {
            ...,
            video {
              ...,
              asset-> {
                url
              }
            }
          },
          _type == "imageColumns" => {
            ...,
            images[]{
              ...,
              video {
                ...,
                asset-> {
                  url
                }
              }
            }
          }
        },
        fullWidth
      }
    },
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
            { slug: resolvedParams.slug },
        ),
        client.fetch(
            `*[_type == "project"] | order(orderRank asc) {
    heroTitle,
    "slug": slug.current,
    featuredImage
  }`,
        ),
    ]);

    // Find next project (wrap around)
    const currentIndex = allProjects.findIndex((p: any) => p.slug === resolvedParams.slug);
    const nextProject = allProjects[(currentIndex + 1) % allProjects.length] ?? null;

    return <ProjectClient project={project} nextProject={nextProject} />;
}
