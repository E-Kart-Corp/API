require("dotenv").config();

const firebaseAdmin = require("firebase-admin");

// if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
//   throw new Error(
//     "La variable d'environnement GOOGLE_APPLICATION_CREDENTIALS n'est pas définie."
//   );
// }

// const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

firebaseAdmin.initializeApp({
  // credential: firebaseAdmin.credential.cert(serviceAccount),
  credential: firebaseAdmin.credential.cert({
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
    client_x509_cert_url: process.env.CLIENT,
    universe_domain: process.env.UNIVERSE_DOMAIN,
  }),
  storageBucket: "e-kart-bdffb.appspot.com",
});

const bucket = firebaseAdmin.storage().bucket();
const db = firebaseAdmin.firestore();

module.exports = { bucket, db, firebaseAdmin };
