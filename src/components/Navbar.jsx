import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logof2.png'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'



const navbar = (props) => {
  const navigate=useNavigate()
    const cerrarsesion=()=>{
        auth.signOut()
        .then(()=>{
            navigate('/login')
        })
    }
  return (
    <div className='navbar navbar-dark bg-dark'>
     <Link className='navbar-band' to='/'>
     <img
          src={logo}
          alt="example"
        />
     </Link>
     <div className='d-flex'>
       <Link className='btn btn-dark' to='/'>Inicio</Link>
       {
                props.firebaseUser !==null ?
                (<Link className='btn btn-dark' to="/libros">Libros</Link>):
                null
            }
            {
                props.firebaseUser !==null ?(
                    <button className='btn btn-dark'
                    onClick={cerrarsesion}
                    >Cerrar Sesión</button>
                ):(
                    <div>
                        <Link className='btn btn-dark' to="/login">Login</Link>
                    </div>
                    
                )
            }
     </div>
    </div>
  )
}

export default navbar