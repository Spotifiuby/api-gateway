const firebase = require("firebase-admin");

const credentials = require("./credentials");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials)
});

module.exports = firebase;