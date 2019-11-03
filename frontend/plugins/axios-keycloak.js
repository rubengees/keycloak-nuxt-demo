import querystring from "querystring"

/**
 * Custom plugin for rewriting axios requests to work with Keycloak.
 *
 * @param ctx The context.
 */
export default ctx => {
  ctx.$axios.interceptors.request.use(config => {
    const strategy = ctx.$auth.strategies.refresh
    const loginUrl = strategy.options.endpoints.login.url
    const refreshUrl = strategy.options.endpoints.refresh.url

    if (config.url === loginUrl || config.url === refreshUrl) {
      if (config.url === loginUrl && config.data.username) {
        config.data.grant_type = "password"
      }

      config.data.client_id = "nuxt"

      config.data = querystring.stringify(config.data)
      config.headers["Content-Type"] = "application/x-www-form-urlencoded"
    }

    return config
  })
}
