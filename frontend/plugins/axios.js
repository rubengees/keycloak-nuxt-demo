export default function(nuxt) {
  nuxt.$axios.onError((error) => {
    if (error.response && error.response.status === 401) {
      nuxt.$auth.logout()
      nuxt.redirect('/login')
    }
  })
}
