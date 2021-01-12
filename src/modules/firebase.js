import firebaseApp from "firebase/app";
import "firebase/auth";
import "firebase/database";
import store from "./store";

const apiKey = process.env.VUE_APP_FIREBASE_API_KEY;
const project = process.env.VUE_APP_FIREBASE_PROJECT;
const authDomain = process.VUE_APP_FIREBASE_AUTH_DOMAIN;
const databaseUrl = process.VUE_APP_FIREBASE_DATABASE_URL;

const config = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseUrl,
  projectId: project,
};

firebaseApp.initializeApp(config);

export const firebase = firebaseApp.app();
export const auth = firebaseApp.auth();
export const database = firebaseApp.database();

auth.onAuthStateChanged((user) => {
  store.dispatch("updateUser", user);
});

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};
