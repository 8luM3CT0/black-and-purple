import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCLWN3_foNwJarD4NGrmqvsd0OiPrFvbzg',
  authDomain: 'black-and-purple.firebaseapp.com',
  projectId: 'black-and-purple',
  storageBucket: 'black-and-purple.appspot.com',
  messagingSenderId: '471294629116',
  appId: '1:471294629116:web:afcd681182b794050fb379',
  measurementId: 'G-H3PEYKT8E5'
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const store = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { store, auth, provider }
