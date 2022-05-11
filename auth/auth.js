const firebase = require("./firebase/firebase");

const authMiddleware = (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.status(401).send({ message: "No token provided" }).end();
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" }).end();
  }

  const token = headerToken.split(" ")[1];
  firebase
    .auth()
    .verifyIdToken(token)
    .then(() => req.path.includes("validate-session") ? res.end() : next())
    .catch(error => {
      console.log(JSON.stringify(error));
      res.status(403).send({message: "Could not authorize"})
    });
}

const setupAuth = (app, routes) => {
  routes.forEach(r => {
    if (r.auth) {
      app.use(r.url, authMiddleware);
    }
    app.post('/validate-session', authMiddleware);
  })
}

exports.setupAuth = setupAuth;