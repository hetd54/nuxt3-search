// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },

  app: {
    head: {
      title: "Test Website",
      link: [
        { rel: 'stylesheet', href: 'https://use.typekit.net/egg1tbq.css' },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css',
        },
      ]
    }
  },

  modules: [
    '@nuxt/content',
  ],

  content: {
    markdown: {
      anchorLinks: false,
      remarkPlugins: {
        'remark-squeeze-paragraphs': {},
        'remark-slug': {},
        'remark-external-links': {}
      },
    },
    experimental: {
      search: {
        indexed: true,
        filterQuery: {_extension: "yml"},
        options: {
          fields: ['title', 'content', 'titles'],
          storeFields: ['title', 'content', 'titles'],
          searchOptions: {
            prefix: true,
            fuzzy: 0.2,
            boost: {
              title: 4,
              content: 2,
              titles: 1
            }
          }
        }
      }
    }
  },
  compatibilityDate: '2024-07-09',
})