import React from 'react'
import {db} from '../firebase'

const Registro = () => {
 
  //hooks
  const [lista,setLista]=React.useState([])
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

  return (
    <div className='container'>
      
      <h2 className='text-center text-primary'>Listado de Libros</h2>
     <table className="table table-bordered">
          <thead>
            <tr>
              <th>Autor</th>
              <th>Descripcion</th>
              <th>Disponibilidad</th>
              <th>Titulo</th>
              <th>Año</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {
           lista.map(
             (elemento)=>(
                 
                 <tr  key={elemento.id}>
                 <td>{elemento.autor}</td>
                 <td>{elemento.descripcion}</td>
                 <td>{elemento.disponibilidad}</td>
                 <td>{elemento.titulo}</td>
                 <td>{elemento.año}</td>
                 <td>
                 <button 
                 onClick={()=>devolverLibro(elemento.id)} 
                 className='btn btn-danger float-end me-2'>Devolver</button>
                 <button 
                 onClick={()=>alquilarLibro(elemento)} 
                 className='btn btn-info float-end me-2'>Alquilar</button>
                 </td>
 
               </tr>
             )
           )
         } 
          
          </tbody>
        </table>

    </div>
  )
}

export default Registro