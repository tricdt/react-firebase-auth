import firebase from 'firebase/compat/app'
import 'firebase/compat/analytics'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/functions'
import 'firebase/compat/storage'

const firebaseConfig = {
   apiKey: "AIzaSyCzhHU8olLMury2WG-uvscdoRo4zFb4Af0",
   authDomain: "fir-34fd2.firebaseapp.com",
   databaseURL: "https://fir-34fd2-default-rtdb.firebaseio.com",
   projectId: "fir-34fd2",
   storageBucket: "fir-34fd2.appspot.com",
   messagingSenderId: "240992004971",
   appId: "1:240992004971:web:87de7ca2ef82edabf8ba2e",
   measurementId: "G-E2SGMBDYWT"
};

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()
const func = firebase.functions()
const storage = firebase.storage()

if (window.location.hostname === 'localhost') {
   auth.useEmulator('http://localhost:9099')
   func.useEmulator('localhost', 5001)
   db.useEmulator('localhost', 8080)
   storage.useEmulator('localhost', 9199)
}

export { db, auth, func, storage }
export default firebase

