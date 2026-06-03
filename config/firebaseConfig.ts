import admin from "firebase-admin";
import path from "path";

const serviceAccountPath = path.resolve(process.cwd(), "serviceAccountKey.json");

const app = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath)
    });

export const db = app.firestore();