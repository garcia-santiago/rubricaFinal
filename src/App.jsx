import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Inicio from './components/Inicio'
import Login from './components/Login'
import Libros from './components/Libros'
import Navbar from './components/Navbar'
import Gestion from './components/Gestion'
import { auth } from './firebase'
import React from 'react'
import Footer from './components/Footer'


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
    <div>
      <Navbar firebaseUser={firebaseUser}/>
      <Routes>
       <Route path='/' element={<Inicio/>}/>
       <Route path='login' element={<Login/>}/>
       <Route path='libros' element={<Libros/>}/>
       <Route path='gestion' element={<Gestion/>}/>
      </Routes>
      <Footer/>
    </div>
    </Router>
    
  ):
  (<p>Loading...</p>)
}

export default App
