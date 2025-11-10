import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://automx.fr',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
      fallback: {
        en: 'fr',
      },
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@i18n': '/src/i18n',
        '@data': '/src/data',
        '@scripts': '/src/scripts',
        '@lib': '/src/lib',
      },
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-FR',
          en: 'en-US',
        },
      },
      filter: (page) =>
        // Exclude backup files and development pages from sitemap
        !page.includes('.backup') &&
        !page.includes('/test') &&
        !page.includes('/draft'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
