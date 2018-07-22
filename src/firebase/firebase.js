const firebase = require("firebase");


const prodConfig = {
  apiKey: "AIzaSyDEfRFrMz0UOMW5xxQldbhIcazgnaIt4o8",
    authDomain: "https://complaint-system-8c4fa.firebaseapp.com",
    databaseURL: "https://complaint-system-8c4fa.firebaseio.com",
    projectId: "  ",
    storageBucket: "https://complaint-system-8c4fa.appspot.com",
    messagingSenderId: "782864712392"
};

const devConfig = {
  apiKey: "AIzaSyDEfRFrMz0UOMW5xxQldbhIcazgnaIt4o8",
    authDomain: "complaint-system-8c4fa.firebaseapp.com",
    databaseURL: "https://complaint-system-8c4fa.firebaseio.com",
    projectId: "complaint-system-8c4fa",
    storageBucket: "complaint-system-8c4fa.appspot.com",
    messagingSenderId: "782864712392"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}


const db = firebase.database();
const auth = firebase.auth();
var functions = firebase.functions();

export {
  db,
  auth,
  functions,
  firebase
};
