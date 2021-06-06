import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCeivYz9gPkULfBKghTczFeYxepsPqGUdM",
    authDomain: "vue-app-f01.firebaseapp.com",
    databaseURL: "https://vue-app-f01-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vue-app-f01",
    storageBucket: "vue-app-f01.appspot.com",
    messagingSenderId: "567868302071",
    appId: "1:567868302071:web:e8e82bf8c56120c619a9f2"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')
const dislikesCollection = db.collection('dislikes')

const files = firebase.storage()

export {
    db,
    auth,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection,
    dislikesCollection,
    files
}
