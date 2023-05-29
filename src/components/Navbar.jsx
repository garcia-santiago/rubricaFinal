import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logof2.png'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'



const navbar = (props) => {

  const [admin,setAdmin]=React.useState(false)

  const navigate=useNavigate()
  const cerrarsesion=()=>{
    auth.signOut()
    .then(()=>{
        navigate('/login')
    })
  }
  React.useEffect(()=>{
    const obtenerDatos=async()=>{
      try {
        const data=await db.collection("usuarios").get()
        const admin = data.docs.filter(user => user.data().tipo == 'Admin')
        if (props.firebaseUser.email == admin[0].data().email) {
          setAdmin(true);
          console.log("admin")
        }
        else{
          console.log("no admin")
        }
      } catch (error) {
        console.log("no loggeado")
        console.error(error);
      }
    }
    obtenerDatos()
  },[])
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
              admin ? 
              (
                <div>
                   <Link className='btn btn-dark' to="/gestion">Gestión de Biblioteca</Link>
                </div>
              ):
              (
                ''
              )
            }
            {
                props.firebaseUser !==null ?(
                    <button className='btn btn-dark'
                    onClick={cerrarsesion}
                    >Cerrar Sesión</button>
                ):
                (
                    <div>
                        <Link className='btn btn-dark' to="/login">Login / Registro</Link>
                    </div>
                    
                )
            }
     </div>
    </div>
  )
}

export default navbar