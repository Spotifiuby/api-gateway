const ROUTES = [
  {
    url: '/users-api/',
    auth: true,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 50
    },
    proxy: {
      target: "https://spotifiuby-backend-users.herokuapp.com",
      changeOrigin: true,
      pathRewrite: {
        [`/users-api`]: '',
      },
      allowedApiKeys: [
          process.env.BACKOFFICE_API_KEY,
          process.env.NATIVE_APP_API_KEY,
          process.env.SONGS_API_KEY,
          'productionkey'
      ]
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
      allowedApiKeys: [
        process.env.BACKOFFICE_API_KEY,
        process.env.NATIVE_APP_API_KEY,
        'productionkey'
      ]
    }
  },
  {
    url: '/chats-api/',
    auth: true,
    creditCheck: false,
    proxy: {
      target: "https://spotifiuby-backend-chats.herokuapp.com",
      changeOrigin: true,
      pathRewrite: {
        [`/chats-api`]: '',
      },
      allowedApiKeys: [
        process.env.BACKOFFICE_API_KEY,
        process.env.NATIVE_APP_API_KEY,
        'productionkey'
      ]
    }
  }
]

exports.ROUTES = ROUTES;
