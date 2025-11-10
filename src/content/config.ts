import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Basic Information
    title: z.string(),
    description: z.string(),

    // Categorization
    category: z.enum([
      'web-development',
      'mobile-app',
      'process-automation',
      'data-analysis',
      'ui-ux-design',
      'consulting',
    ]),
    industry: z.enum([
      'e-commerce',
      'healthcare',
      'finance',
      'education',
      'real-estate',
      'manufacturing',
      'hospitality',
      'technology',
      'non-profit',
      'other',
    ]),

    // Client Information
    client: z.string(),
    clientLogo: z.string().optional(),

    // Project Details
    date: z.coerce.date(),
    duration: z.string().optional(), // e.g., "3 months"
    teamSize: z.number().optional(), // e.g., 5

    // Media
    featuredImage: z.string(),
    image: z.string().optional(), // Alias for featuredImage
    mobileImage: z.string().optional(), // Mobile version of image
    gallery: z.array(z.string()).optional(),
    videoUrl: z.string().optional(),

    // Technical Details
    technologies: z.array(z.string()),
    githubUrl: z.string().optional(),
    liveUrl: z.string().optional(),

    // Project Sections (optional - can be in markdown content instead)
    challenge: z.string().optional(),
    solution: z.string().optional(),
    results: z.array(
      z.object({
        metric: z.string(),
        value: z.string(),
        description: z.string().optional(),
      })
    ).optional(),

    // SEO
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    ogImage: z.string().optional(),

    // Display Options
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    order: z.number().optional(), // For manual ordering
  }),
});

export const collections = {
  'projects-fr': projectsCollection,
  'projects-en': projectsCollection,
};
