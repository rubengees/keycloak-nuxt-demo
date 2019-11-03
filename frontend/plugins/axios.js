/**
 * Custom plugin for handling authentication errors in axios responses.
 *
 * @param ctx The context.
 */
export default ctx => {
  ctx.$axios.onError(error => {
    if (error.response && error.response.status === 401) {
      ctx.$auth.logout()
      ctx.redirect(ctx.$auth.options.redirect.login)
    }
  })
}
