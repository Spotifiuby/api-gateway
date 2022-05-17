const { createProxyMiddleware } = require('http-proxy-middleware');
const superagent = require('superagent');

const proxy = (config) => {
  return (req, res, next) => {
    let originalUrl = Object.keys(config.pathRewrite)
      .reduce((prev, current) => prev.replace(current, config.pathRewrite[current]), req.originalUrl);
    const url = `${config.target}${originalUrl}`;
    console.log("Proxy:", url);
    console.log("Proxy method:", req.method);
    return superagent(req.method, url)
    .set({
      "content-type": "application/json",
      accept: "application/json",
      "x-api-key": config.apiKey,
    }).send(JSON.stringify(req.body))
    .then(result => {
      res.status(result.status);
      res.json(result.body).end();
    })
    .catch(error => {
      console.log(error);
      const { response } = error;
      res.status(response?.status || 500);
      res.json(response?.body || "Proxy Failure").end();
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