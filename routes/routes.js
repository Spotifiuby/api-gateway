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
        [`^/users-api`]: '',
      },
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
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
        [`^/songs-api`]: '',
      },
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
    }
  }
]

exports.ROUTES = ROUTES;