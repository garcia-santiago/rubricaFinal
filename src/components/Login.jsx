import React from 'react'
import { auth,db } from '../firebase'
import { useNavigate } from 'react-router-dom'

const login = () => {
  const navigate=useNavigate()
  //hooks
  const [nombre,setNombre]=React.useState('')
  const [apellido,setApellido]=React.useState('')
  const [email,setEmail]=React.useState('')
  const [pass,setPass]=React.useState('')
  const [modoRegistro,setModoRegistro]=React.useState(false)
  const [error,setError]=React.useState(null)

  //guardar dato
  const guardarDatos=(e)=>{
    e.preventDefault()
    if (!email.trim()) {
        setError('Ingrese el email')
        return
    }
    if (!pass.trim()) {
        setError('Ingrese el Password')
        return
    }
    if (pass.length<6) {
        setError('Password debe ser mayor a 6 caracteres')
        return
    }
    setError(null)
    if (modoRegistro) {
        registrar()
    } else {
        login()
    }
}

//login
const login=React.useCallback(async()=>{
  try {
      const res=await auth.signInWithEmailAndPassword(email,pass);
      setEmail('')
      setPass('')
      setError('')
      navigate('/libros')
  } catch (error) {
      console.log(error.code);
      if (error.code==='auth/wrong-password') {
          setError('Pass no coincide')
      }
      if (error.code==='auth/user-not-found') {
          setError('usuario no registrado')
      }
  }
},[email,pass,navigate])

//Registrar
const registrar=React.useCallback(async()=>{
  try {
      const res=await auth.createUserWithEmailAndPassword(email,pass)
      await db.collection('usuarios').doc(res.user.email).set(
          {
            id:res.user.uid,
            nombre,
            apellido,
            librosPrestados: [],
            email:res.user.email,
            tipo: 'Usuario'
          }
      )
      setEmail('')
      setPass('')
      setError('')
      setModoRegistro(false)
  } catch (error) {
      console.log(error.code);
      if (error.code==='auth/invalid-email') {
          setError('Email inválido')
      }
      if (error.code==='auth/email-already-in-use') {
          setError('Email ya registrado')
      }
  }
},[email,pass])
   
   
  return (
    <div>
        <h3 className='text-center text-primary'>
            {modoRegistro ? 'Registro de Usuarios': 'Login'}
            </h3>
        <div className='row justify-content-center'>
        <div className='col-12 col-sm-8 col-md-6 col-xl-4'>
            <form onSubmit={guardarDatos}>
                {
                    error && (
                        <div className='alert alert-danger'>
                            {error}
                        </div>
                    )
                }
                {
                    modoRegistro ? 
                    (
                        <div>
                            <input type="text" 
                            className='form-control mb-2'
                            placeholder='Ingrese su nombre'
                            onChange={e=>setNombre(e.target.value.trim())}
                            />
                            <input type="text" 
                            className='form-control mb-2'
                            placeholder='Ingrese su apellido'
                            onChange={e=>setApellido(e.target.value.trim())}
                            />
                        </div>
                    ): ''
                }
                <input type="email" 
                className='form-control mb-2'
                placeholder='Ingrese su email'
                onChange={e=>setEmail(e.target.value.trim())}
                />
                <input type="password" 
                className='form-control mb-2'
                placeholder='Ingrese su Password'
                onChange={e=>setPass(e.target.value.trim())}
                />

                <div className='d-grid gap-2'>
                    <button className='btn btn-outline-dark'>
                        {
                            modoRegistro ? 'Registrarse' :'Acceder'
                        }
                    </button>
                    <button className='btn btn-outline-primary'
                    onClick={()=>{setModoRegistro(!modoRegistro)}}
                    type='button'
                    >
                        {
                            modoRegistro ? 'Ya estas registrado?': 'No tienes cuenta?'
                        }
                    </button>
                </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default login