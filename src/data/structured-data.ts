/**
 * Structured Data (JSON-LD) Schemas for SEO
 *
 * This file contains Schema.org structured data to help search engines understand
 * your business, services, and content. Update the placeholders marked with [TO UPDATE]
 *
 * Learn more: https://schema.org/
 * Test your schemas: https://search.google.com/test/rich-results
 */

import type { Language } from '@i18n/utils';

// ============================================================================
// ORGANIZATION / LOCAL BUSINESS SCHEMA
// ============================================================================

export function getOrganizationSchema(lang: Language) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://automx.fr/#organization",
    "name": "AutomX",
    "alternateName": "AutomX Solutions",
    "url": lang === 'en' ? "https://automx.fr/en" : "https://automx.fr",
    "logo": {
      "@type": "ImageObject",
      "url": "https://automx.fr/logo.png", // [TO UPDATE] Add your logo
      "width": 512,
      "height": 512
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://automx.fr/og-image.png", // [TO UPDATE] Add OG image
      "width": 1200,
      "height": 630
    },
    "description": lang === 'en'
      ? "AutomX provides professional web development, process automation, and data analysis services for businesses in France."
      : "AutomX offre des services professionnels de développement web, automatisation de processus et analyse de données pour les entreprises en France.",

    // Contact Information
    "email": "contact@automx.fr", // [TO UPDATE] Your business email
    "telephone": "+33-X-XX-XX-XX-XX", // [TO UPDATE] Your phone number

    // Address Information
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[TO UPDATE: Street Address]", // e.g., "123 Rue de la République"
      "addressLocality": "[TO UPDATE: City]", // e.g., "Paris"
      "postalCode": "[TO UPDATE: Postal Code]", // e.g., "75001"
      "addressRegion": "[TO UPDATE: Region]", // e.g., "Île-de-France"
      "addressCountry": "FR"
    },

    // Business Details
    "priceRange": "$$",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer, Invoice",

    // Social Media Links
    "sameAs": [
      "https://www.linkedin.com/company/automx", // [TO UPDATE] Your LinkedIn
      "https://github.com/automx", // [TO UPDATE] Your GitHub
      "https://twitter.com/automx", // [TO UPDATE] Your Twitter/X
      // Add more social profiles as needed
    ],

    // Services Offered
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },

    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": lang === 'en' ? "AutomX Services" : "Services AutomX",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": lang === 'en' ? "Web Development" : "Développement Web",
            "description": lang === 'en'
              ? "Custom web application development using modern technologies"
              : "Développement d'applications web personnalisées avec des technologies modernes"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": lang === 'en' ? "Process Automation" : "Automatisation de Processus",
            "description": lang === 'en'
              ? "Business process automation to improve efficiency and reduce costs"
              : "Automatisation des processus métier pour améliorer l'efficacité et réduire les coûts"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": lang === 'en' ? "Data Analysis" : "Analyse de Données",
            "description": lang === 'en'
              ? "Data analysis and business intelligence solutions"
              : "Solutions d'analyse de données et de business intelligence"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": lang === 'en' ? "System Integration" : "Intégration de Systèmes",
            "description": lang === 'en'
              ? "API integration and system connectivity solutions"
              : "Solutions d'intégration API et de connectivité système"
          }
        }
      ]
    }
  };
}

// ============================================================================
// WEBSITE SCHEMA
// ============================================================================

export function getWebsiteSchema(lang: Language) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://automx.fr/#website",
    "url": lang === 'en' ? "https://automx.fr/en" : "https://automx.fr",
    "name": "AutomX",
    "description": lang === 'en'
      ? "Professional web development and automation services"
      : "Services professionnels de développement web et d'automatisation",
    "publisher": {
      "@id": "https://automx.fr/#organization"
    },
    "inLanguage": lang === 'en' ? "en-US" : "fr-FR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": lang === 'en'
          ? "https://automx.fr/en/projects?search={search_term_string}"
          : "https://automx.fr/projets?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

// ============================================================================
// BREADCRUMB SCHEMA
// ============================================================================

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// ============================================================================
// SERVICE SCHEMA (for individual service pages)
// ============================================================================

export function getServiceSchema(
  serviceId: string,
  lang: Language,
  serviceData: {
    name: string;
    description: string;
    url: string;
    image?: string;
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceData.name,
    "name": serviceData.name,
    "description": serviceData.description,
    "url": serviceData.url,
    "provider": {
      "@id": "https://automx.fr/#organization"
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "availableLanguage": ["French", "English"],
    ...(serviceData.image && {
      "image": {
        "@type": "ImageObject",
        "url": serviceData.image
      }
    })
  };
}

// ============================================================================
// PROJECT / CREATIVE WORK SCHEMA (for portfolio items)
// ============================================================================

export function getProjectSchema(
  projectData: {
    name: string;
    description: string;
    url: string;
    image?: string;
    datePublished: string;
    category: string;
    technologies: string[];
  },
  lang: Language
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": projectData.name,
    "description": projectData.description,
    "url": projectData.url,
    "creator": {
      "@id": "https://automx.fr/#organization"
    },
    "datePublished": projectData.datePublished,
    "genre": projectData.category,
    "keywords": projectData.technologies.join(", "),
    ...(projectData.image && {
      "image": {
        "@type": "ImageObject",
        "url": projectData.image
      }
    }),
    "inLanguage": lang === 'en' ? "en-US" : "fr-FR"
  };
}

// ============================================================================
// PERSON SCHEMA (for about/founder page if needed)
// ============================================================================

export function getPersonSchema(lang: Language) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "[TO UPDATE: Your Name]", // e.g., "Jean Dupont"
    "jobTitle": lang === 'en' ? "Founder & Developer" : "Fondateur & Développeur",
    "url": lang === 'en' ? "https://automx.fr/en" : "https://automx.fr",
    "email": "contact@automx.fr", // [TO UPDATE] Your email
    "worksFor": {
      "@id": "https://automx.fr/#organization"
    },
    "sameAs": [
      "[TO UPDATE: Your LinkedIn Profile]",
      "[TO UPDATE: Your GitHub Profile]",
      // Add more personal social profiles
    ]
  };
}

// ============================================================================
// FAQ SCHEMA (for service pages with FAQs)
// ============================================================================

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// ============================================================================
// HELPER FUNCTION: Inject Schema into HTML
// ============================================================================

export function injectSchema(schema: any): string {
  return JSON.stringify(schema, null, 0); // Minified JSON for production
}
