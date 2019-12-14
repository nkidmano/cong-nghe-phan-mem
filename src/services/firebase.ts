import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import store from '@/store'

firebase.initializeApp({
  apiKey: 'AIzaSyAHjtTJw9NRWiRaRoqZP1b4zn4fnVXkPCg',
  authDomain: 'cong-nghe-phan-mem.firebaseapp.com',
  databaseURL: 'https://cong-nghe-phan-mem.firebaseio.com',
  projectId: 'cong-nghe-phan-mem',
  storageBucket: 'cong-nghe-phan-mem.appspot.com',
  messagingSenderId: '795856584302',
  appId: '1:795856584302:web:0e96e9357ed386e61e307f',
})
export const db = firebase.firestore()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()

export class FirebaseService {
  public static getLoginResult(): Promise<firebase.auth.UserCredential | null> {
    return firebase
      .auth()
      .getRedirectResult()
      .then((credential) => (credential.user ? credential : null))
      .catch(() => null)
  }

  public static loginWithGoogle(): Promise<void> {
    return firebase.auth().signInWithRedirect(googleAuthProvider)
  }

  public static loginWithFacebook(): Promise<void> {
    return firebase.auth().signInWithRedirect(facebookAuthProvider)
  }

  public static login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential | string> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((credential) => credential)
      .catch((error) => {
        console.warn(error)
        if (error.code === 'auth/user-disabled') {
          return Promise.reject('Account has been disabled')
        }
        return Promise.reject('Invalid email or password')
      })
  }

  public static register(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential | string> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((credential) => credential)
      .catch((error) => {
        console.warn(error)
        if (error.code === 'auth/email-already-in-use') {
          return Promise.reject('Email already in use')
        }
        if (error.code === 'auth/invalid-email') {
          return Promise.reject('Invalid email')
        }
        if (error.code === 'auth/weak-password') {
          return Promise.reject('Invalid email')
        }
        return Promise.reject('Unexpected error, please try again later')
      })
  }

  public static logout(): Promise<void> {
    return firebase.auth().signOut()
  }
}
