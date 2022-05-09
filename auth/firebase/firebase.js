const firebase = require("firebase-admin");

const credentials = require("./credentials");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: "https://spotifiuby-2c0b2.firebaseio.com",
});

module.exports = firebase;