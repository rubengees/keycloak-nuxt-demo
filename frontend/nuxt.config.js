export default {
  mode: "universal",
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: { color: "#fff" },
  css: [],
  plugins: ["~/plugins/axios-keycloak", "~/plugins/axios"],
  buildModules: ["@nuxtjs/eslint-module"],
  modules: ["@nuxtjs/proxy", "@nuxtjs/axios", "@nuxtjs/auth"],
  router: {
    middleware: ["auth"]
  },
  axios: {
    proxy: true
  },
  proxy: {
    "/api/": "http://localhost:8080"
  },
  auth: {
    redirect: {
      callback: "/callback"
    },
    strategies: {
      social: {
        _scheme: "oauth2",
        authorization_endpoint:
          "http://localhost:8180/auth/realms/keycloak-nuxt-demo/protocol/openid-connect/auth",
        userinfo_endpoint:
          "http://localhost:8180/auth/realms/keycloak-nuxt-demo/protocol/openid-connect/userinfo",
        scope: ["openid", "profile", "email"],
        response_type: "token id_token",
        client_id: "nuxt"
      },
      refresh: {
        _scheme: "refresh",
        autoRefresh: true,
        autoLogout: true,
        token: { property: "access_token" },
        refreshToken: { property: "refresh_token" },
        user: false,
        endpoints: {
          login: {
            url:
              "http://localhost:8180/auth/realms/keycloak-nuxt-demo/protocol/openid-connect/token",
            method: "post"
          },
          refresh: {
            url:
              "http://localhost:8180/auth/realms/keycloak-nuxt-demo/protocol/openid-connect/token",
            method: "post"
          },
          logout: false,
          user: {
            url:
              "http://localhost:8180/auth/realms/keycloak-nuxt-demo/protocol/openid-connect/userinfo",
            method: "get"
          }
        }
      }
    }
  },
  build: {
    extend(config, ctx) {}
  }
}
