require("dotenv").config();

const firebaseAdmin = require("firebase-admin");

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error(
    "La variable d'environnement GOOGLE_APPLICATION_CREDENTIALS n'est pas définie."
  );
}

// const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const serviceAccount = require(`../${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: "e-kart-bdffb.appspot.com",
});

const bucket = firebaseAdmin.storage().bucket();
const db = firebaseAdmin.firestore();

module.exports = { bucket, db, firebaseAdmin };
