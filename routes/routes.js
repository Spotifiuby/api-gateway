const ROUTES = [
  {
    url: '/users-api/',
    auth: true,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5
    },
    proxy: {
      target: "https://spotifiuby-backend-users.herokuapp.com",
      changeOrigin: true,
      pathRewrite: {
        [`/users-api`]: '',
      },
      apiKey: 'productionkey'
    }
  },
  {
    url: '/songs-api/',
    auth: true,
    creditCheck: false,
    proxy: {
      target: "https://spotifiuby-backend-songs.herokuapp.com",
      changeOrigin: true,
      pathRewrite: {
        [`/songs-api`]: '',
      },
      apiKey: 'productionkey'
    }
  }
]

exports.ROUTES = ROUTES;