import React from 'react'
import {db} from '../firebase'

const Registro = (props) => {
  //hooks
  const [lista,setLista]=React.useState([])
  const [nombre,setNombre]=React.useState('')
  const [apellido,setApellido]=React.useState('')
  const [id,setId]=React.useState('')
  const [modoedicion,setModoEdicion]=React.useState(false)
  const [error,setError]=React.useState(null)

  //leer
  React.useEffect(()=>{
    const obtenerdatos=async()=>{
      try {
        const data=await db.collection(props.user.email).get()
        //console.log(data.docs);
        const arrayData=data.docs.map(doc=>({id:doc.id,...doc.data()}))
        setLista(arrayData)
      } catch (error) {
        console.error(error);
      }
    }
    obtenerdatos()
  },[])
  //guardar 
  const guardarDatos=async(e)=>{
    e.preventDefault()
    if(!nombre){
     setError("Ingrese el Nombre")
     return
    }
    if(!apellido){
      setError("Ingrese el Apellido")
      return
     }
    //registrar en firebase
    try {
      const nuevoUsuario={nombre, apellido}
      const dato=await db.collection(props.user.email).add(nuevoUsuario)
      setLista([
        ...lista,
        {...nuevoUsuario,id:dato.id}
      ])
      setNombre('')
      setApellido('')
      setError(null)
    } catch (error) {
      console.error(error)
    }
  }
  //eliminar
  const eliminarDato=async(id)=>{
    if (modoedicion) {
      setError('No se Puede Eliminar Mientras Edita El Usuario')
      return
    }
    try {
      await db.collection(props.user.email).doc(id).delete()
      const listaFiltrada=lista.filter(elemento=>elemento.id!==id)
      setLista(listaFiltrada)
    } catch (error) {
      console.error(error);
    }
  }
  //editar
  const editar=(elemento)=>{
    setModoEdicion(true)//activamos el modo para editar
    setNombre(elemento.nombre)
    setApellido(elemento.apellido)
    setId(elemento.id)
  }
 //editarDatos
  const editarDatos=async(e)=>{
    e.preventDefault()
    if(!nombre){
     setError("Ingrese el Nombre")
     return
    }
    if(!apellido){
      setError("Ingrese el Apellido")
      return
     }
    try {
      await db.collection(props.user.email).doc(id).update({
        nombre,apellido
      })
    const listaEditada=lista.map(elemento=>elemento.id===id ? {id,nombre,apellido} : 
      elemento
      )  
      setLista(listaEditada)//listamos nuevos valores
      setModoEdicion(false)
      setNombre('')
      setApellido('')
      setId('')
      setError(null)
    
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='container'>
      {
        modoedicion ? <h2 className='text-center text-success'>Edicion de usuarios</h2> : 
        <h2 className='text-center text-primary'>Registro de usuarios</h2>
      }
      <form onSubmit={modoedicion ? editarDatos : guardarDatos}>
        {
          error ? (
         <div className="alert alert-danger" role="alert">
           {error}
          </div>
          ):
          null
        }
       
        <input type="text" 
        placeholder='Ingrese el Nombre'
        className='form-control mb-2'
        onChange={(e)=>{setNombre(e.target.value.trim())}}
        value={nombre}
        />

       <input type="text" 
        placeholder='Ingrese el Apellido'
        className='form-control mb-2'
        onChange={(e)=>{setApellido(e.target.value.trim())}}
        value={apellido}
        />

        <div className='d-grid gap-2'>
          {
            modoedicion ? <button type='submit'className='btn btn-outline-success'>Editar</button> :
            <button type='submit'className='btn btn-outline-info'>Registrar</button>
          }
      
        </div>
         
      </form>
      <h2 className='text-center text-primary'>Listado de Usuarios Registados</h2>
      <ul className='list-group'>
        {
          lista.map(
            (elemento)=>(
              <li className='list-group-item bg-info' key={elemento.id}>
                {elemento.nombre} {elemento.apellido}
                <button 
                onClick={()=>eliminarDato(elemento.id)} 
                className='btn btn-danger float-end me-2'>Eliminar</button>
                <button 
                onClick={()=>editar(elemento)} 
                className='btn btn-warning float-end me-2'>Editar</button>
                </li>
            )
          )
        }
      </ul>

    </div>
  )
}

export default Registro