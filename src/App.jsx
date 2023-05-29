import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Inicio from './components/inicio'
import Login from './components/login'
import Libros from './components/Libros'
import Navbar from './components/navbar'
import { auth } from './firebase'
import React from 'react'



function App() {
  const [firebaseUser,setFirebaseUser]=React.useState(false)
  React.useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      console.log(user);
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  },[])

  return firebaseUser !==false ? (
    <Router>
    <div className='container'>
      <Navbar firebaseUser={firebaseUser}/>
      <Routes>
       <Route path='/' element={<Inicio/>}/>
       <Route path='login' element={<Login/>}/>
       <Route path='libros' element={<Libros/>}/>
      </Routes>
    </div>
    </Router>
  ):
  (<p>Loading...</p>)
}

export default App
