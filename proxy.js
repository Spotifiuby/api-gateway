const superagent = require('superagent');

const FORWARDABLE_HEADERS = {
  'authorization': true,
  'x-api-key': true,
  'x-user-id': true
};

function filterHeaders(headers) {
  return Object.keys(headers)
  .filter(header => FORWARDABLE_HEADERS[header.toLowerCase()])
  .reduce((prev, current) => {
    prev[current] = headers[current];
    return prev;
  }, {});
}

const proxy = (config) => {
  return (req, res, next) => {
    if (!req.headers['x-api-key'] || !config.allowedApiKeys.includes(req.headers['x-api-key'])) {
      return res.status(403).json({message:'Could not authorize client'}).end();
    }

    let originalUrl = Object.keys(config.pathRewrite)
      .reduce((prev, current) => prev.replace(current, config.pathRewrite[current]), req.originalUrl);
    const url = `${config.target}${originalUrl}`;
    console.log("Proxy:", url);
    const filteredHeaders = filterHeaders(req.headers);
    console.log("Proxy method:", req.method);
    return superagent(req.method, url)
    .set({
      ...filteredHeaders,
      "content-type": "application/json",
      accept: "application/json",
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
    app.use(r.url, proxy(r.proxy));
  })
}

exports.setupProxies = setupProxies