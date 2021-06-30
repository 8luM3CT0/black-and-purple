//backend components
import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, store } from '../firebase'
import { useEffect } from 'react'
import firebase from 'firebase'
//frontend components
import Login from '../components/login/Login'
import Loading from '../components/loading/Loading'

function MyApp ({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      store
        .collection('users')
        .doc(user.uid)
        .set(
          {
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
          },
          { merge: true }
        )
    }
  }, [user])

  if (loading) return <Loading />
  if (!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
