// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Portfolio',
      titleTemplate: '%s | Portfolio',
    }
  },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', 'nuxt-icon'],
  content: {
    highlight: {
      theme: 'github-light',
      preload: ['ts', 'js', 'css', 'java', 'json', 'bash', 'vue']
    }
  }
})
