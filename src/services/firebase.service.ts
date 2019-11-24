import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyAHjtTJw9NRWiRaRoqZP1b4zn4fnVXkPCg',
  authDomain: 'cong-nghe-phan-mem.firebaseapp.com',
  databaseURL: 'https://cong-nghe-phan-mem.firebaseio.com',
  projectId: 'cong-nghe-phan-mem',
  storageBucket: 'cong-nghe-phan-mem.appspot.com',
  messagingSenderId: '795856584302',
  appId: '1:795856584302:web:0e96e9357ed386e61e307f',
});

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export default class FirebaseService {
  public static loginWithGoogle(): Promise<void> {
    return firebase.auth().signInWithRedirect(googleAuthProvider);
  }

  public static loginWithFacebook(): Promise<void> {
    return firebase.auth().signInWithRedirect(facebookAuthProvider);
  }

  public static loginWithEmail(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((credential) => credential)
      .catch((error) => {
        console.warn(error);
        if (error.code === 'auth/user-disabled') {
          throw new Error('Account has been disabled');
        }

        throw new Error('Invalid email or password');
      });
  }

  public static logout(): Promise<void> {
    return firebase.auth().signOut();
  }

  public static getLoginResult(): Promise<firebase.auth.UserCredential | null> {
    return firebase
      .auth()
      .getRedirectResult()
      .then((credential) => (credential.user ? credential : null))
      .catch((error) => {
        console.warn(error);
        return null;
      });
  }
}
