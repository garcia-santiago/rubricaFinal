import React from 'react'
import {db} from '../firebase'

const gestion = () => {

  //hooks
  const [lista,setLista]=React.useState([])
  const [autor,setAutor]=React.useState('')
  const [descripcion,setDescripcion]=React.useState('')
  const [disponibilidad,setDisponibilidad]=React.useState('')
  const [titulo,setTitulo]=React.useState('')
  const [año,setAño]=React.useState('')
  const [id,setId]=React.useState('')
  const [modoedicion,setModoEdicion]=React.useState(false)
  const [error,setError]=React.useState(null)
  //leer
  React.useEffect(()=>{
    const obtenerdatos=async()=>{
      try {
        const data=await db.collection('libros').get()
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
  if(!autor){
   setError("Ingrese el Autor")
   return
  }
  if(!descripcion){
    setError("Ingrese el Descripcion")
    return
   }
  if(!disponibilidad){
    setError("Ingrese el Disponibilidad")
    return
  }
  if(!titulo){
    setError("Ingrese el Titulo")
    return
  }
  if(!año){
    setError("Ingrese el Año")
    return
   }
  //registrar en firebase
  try {
    const nuevoLibro={autor,descripcion,disponibilidad,titulo,año}
    const dato=await db.collection('libros').add(nuevoLibro)
    setLista([
      ...lista,
      {...nuevoLibro,id:dato.id}
    ])
    setAutor('')
    setDescripcion('')
    setDisponibilidad('')
    setTitulo('')
    setAño('')
    setError(null)
  } catch (error) {
    console.error(error)
  }
}
//eliminar
const eliminarDato=async(id)=>{
  if (modoedicion) {
    setError('No se Puede Eliminar Mientras Edita El Libro')
    return
  }
  try {
    await db.collection('libros').doc(id).delete()
    const listaFiltrada=lista.filter(elemento=>elemento.id!==id)
    setLista(listaFiltrada)
  } catch (error) {
    console.error(error);
  }
}
//editar
const editar=(elemento)=>{
  setModoEdicion(true)//activamos el modo para editar
  setAutor(elemento.autor)
  setDescripcion(elemento.descripcion)
  setDisponibilidad(elemento.disponibilidad)
  setTitulo(elemento.titulo)
  setAño(elemento.año)
  setId(elemento.id)
}
//editarDatos
const editarDatos=async(e)=>{
  e.preventDefault()
  if(!autor){
    setError("Ingrese el Autor")
    return
   }
   if(!descripcion){
     setError("Ingrese el Descripcion")
     return
    }
   if(!disponibilidad){
     setError("Ingrese el Disponibilidad")
     return
   }
   if(!titulo){
     setError("Ingrese el Titulo")
     return
   }
   if(!año){
     setError("Ingrese el Año")
     return
    }
  try {
    await db.collection('libros').doc(id).update({
      autor,descripcion,disponibilidad,titulo,año
    })
  const listaEditada=lista.map(elemento=>elemento.id===id ? {autor,descripcion,disponibilidad,titulo,año} : 
    elemento
    )  
    setLista(listaEditada)//listamos nuevos valores
    setModoEdicion(false)
    setAutor('')
    setDescripcion('')
    setDisponibilidad('')
    setTitulo('')
    setAño('')
    setId('')
    setError(null)
  
  } catch (error) {
    console.error(error);
  }
}

  return (
     
    <div className='container'>
     {
        modoedicion ? <h2 className='text-center text-success'>Edicion de Libros</h2> : 
        <h2 className='text-center text-primary'>Registro de Libros</h2>
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
        placeholder='Ingrese el Titulo'
        className='form-control mb-2'
        onChange={(e)=>{setTitulo(e.target.value)}}
        value={titulo}
        />

        <input type="text" 
        placeholder='Ingrese el Autor'
        className='form-control mb-2'
        onChange={(e)=>{setAutor(e.target.value)}}
        value={autor}
        />

       <input type="text" 
        placeholder='Ingrese el Descripcion'
        className='form-control mb-2'
        onChange={(e)=>{setDescripcion(e.target.value)}}
        value={descripcion}
        />

        <input type="text" 
        placeholder='Ingrese el Año'
        className='form-control mb-2'
        onChange={(e)=>{setAño(e.target.value.trim())}}
        value={año}
        /> 

        <input type="text" 
        placeholder='Ingrese el Disponibilidad'
        className='form-control mb-2'
        onChange={(e)=>{setDisponibilidad(e.target.value.trim())}}
        value={disponibilidad}
        />

        <div className='d-grid gap-2'>
          {
            modoedicion ? <button type='submit'className='btn btn-outline-success'>Editar</button> :
            <button type='submit'className='btn btn-outline-info'>Registrar</button>
          }
      
        </div>
         
      </form>


      <h2 className='text-center text-primary'>Listado de Libros</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Autor</th>
                <th>Descripcion</th>
                <th>Año</th>
                <th>Disponible</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
            {
            lista.map(
              (elemento)=>(
                  
                  <tr  key={elemento.id}>
                    <td>{elemento.titulo}</td>
                    <td>{elemento.autor}</td>
                    <td>{elemento.descripcion}</td>
                    <td>{elemento.año}</td>
                    <td>{elemento.disponibilidad}</td>
                    <td>
                      <button 
                      onClick={()=>eliminarDato(elemento.id)} 
                      className='btn btn-danger float-end me-2'>Eliminar</button>
                      <button 
                      onClick={()=>editar(elemento)} 
                      className='btn btn-warning float-end me-2'>Editar</button>
                    </td>
                </tr>
              )
            )
          } 
            
            </tbody>
          </table>
      </div>
    </div>
  )
 
      
   
   
}

export default gestion