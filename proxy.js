const { createProxyMiddleware } = require('http-proxy-middleware');
const superagent = require('superagent');

const proxy = (config) => {
  return (req, res, next) => {
    let originalUrl = Object.keys(config.pathRewrite)
      .reduce((prev, current) => prev.replace(current, config.pathRewrite[current]), req.originalUrl);
    const url = `${config.target}${originalUrl}`;
    console.log("Proxy:", url);
    const proxiedHeaders = req.headers;
    console.log("Proxied Headers", proxiedHeaders);
    superagent(req.method, url)
    .set({
      ...proxiedHeaders,
      "content-type": "application/json",
      accept: "application/json",
    }).send(JSON.stringify(req.body))
    .then(result => {
      res.status(result.status);
      res.json(result.data);
    })
    .catch(error => {
      const { response } = error;
      res.status(response?.status || 500);
      res.json(response?.data || "Proxy Failure");
    })
  };
}

const setupProxies = (app, routes) => {
  routes.forEach(r => {
    //app.use(r.url, createProxyMiddleware(r.proxy));
    app.use(r.url, proxy(r.proxy));
  })
}

exports.setupProxies = setupProxies