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
    const project = await client.fetch(
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
    );

    return <ProjectClient project={project} />;
}
