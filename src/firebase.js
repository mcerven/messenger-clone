import firebase from 'firebase';
import firebaseConfig from './config/firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const authProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export { db, auth, authProvider };