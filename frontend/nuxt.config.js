export default {
  mode: 'universal',
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  css: [],
  plugins: [],
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  router: {
    middleware: ['auth']
  },
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': 'http://localhost:8080'
  },
  auth: {
    reidrect: {
      callback: '/callback'
    },
    strategies: {
      social: {
        _scheme: 'oauth2',
        authorization_endpoint:
          'http://localhost:8180/auth/realms/keycloak-nuxt-demo/protocol/openid-connect/auth',
        userinfo_endpoint:
          'http://localhost:8180/auth/realms/keycloak-nuxt-demo/protocol/openid-connect/userinfo',
        scope: ['openid', 'profile', 'email'],
        response_type: 'token id_token',
        client_id: 'nuxt'
      }
    }
  },
  build: {
    extend(config, ctx) {}
  }
}
