import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase
  .initializeApp({
    apiKey: 'AIzaSyBEckByVfNSltZHjxWMnYc2YpIxRCdTBo0',
    authDomain: 'fernochat.firebaseapp.com',
    projectId: 'fernochat',
    storageBucket: 'fernochat.appspot.com',
    messagingSenderId: '756909078466',
    appId: '1:756909078466:web:4b57414cb51e7b29fe085b',
  })
  .auth();
