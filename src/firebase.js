import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDmBEa82qvAUuESou4mEL5GWiKwiEm-AiY",
  authDomain: "crudreact-6a97a.firebaseapp.com",
  projectId: "crudreact-6a97a",
  storageBucket: "crudreact-6a97a.appspot.com",
  messagingSenderId: "441976465370",
  appId: "1:441976465370:web:6fcd78dd7ad5f7b1ef42e3"
};


app.initializeApp(firebaseConfig);

const db=app.firestore()
const auth=app.auth()
export {db,auth}