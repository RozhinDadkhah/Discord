import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyA-MnAY_dgLGjU0vNIQG0K0WacDLrltMM0",
  authDomain: "discord-2765d.firebaseapp.com",
  projectId: "discord-2765d",
  storageBucket: "discord-2765d.appspot.com",
  messagingSenderId: "310115624502",
  appId: "1:310115624502:web:736de75ba19f38be2cda97",
  measurementId: "G-EDC6XXNG0Y"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db 