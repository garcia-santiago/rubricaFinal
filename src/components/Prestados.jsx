import React from 'react'
import {db, auth} from '../firebase'

const Registro = () => {
 
  //hooks
  const [lista,setLista]=React.useState([])
  //leer
  React.useEffect(()=>{
    const obtenerdatos=async()=>{
      try {
        const usuario = db.collection("usuarios").doc(auth.currentUser.email);
        usuario.get().then(async (res2) => {
            setLista(res2.data().librosPrestados)
        })
        // setLista(arrayData.filter(libro => libro.disponibilidad == 'NO'))
      } catch (error) {
        console.error(error);
      }
    }
    obtenerdatos()
  },[])
  const alquilarLibro = (idLibro) => {
    const libro = db.collection("libros").doc(idLibro)
    libro.get().then(res => {
      const libroDoc = res.data()
      const usuario = db.collection("usuarios").doc(auth.currentUser.email);
      usuario.get().then(async (res2) => {
        await libro.update({"disponibilidad": 'NO'})
        await usuario.update({"librosPrestados": [...res2.data().librosPrestados, libroDoc]}) 
      })

    })

  }
  const devolverLibro = (idLibro) => {
    const libro = db.collection("libros").doc(idLibro)
    libro.get().then(res => {
      const libroDoc = res.data()
      const usuario = db.collection("usuarios").doc(auth.currentUser.email);
      usuario.get().then(async (res2) => {
        await libro.update({"disponibilidad": 'SI'})
        const noPrestados = res2.data().librosPrestados.filter(lib => lib.id!=idLibro)
        await usuario.update({"librosPrestados": noPrestados}) 
      })

    })
  }
  return (
    <div className='container'>
      <div className="container">
        <h2 className='text-center text-primary'>Libros Prestados</h2>
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
                            className='btn btn-danger float-end me-2'>Devolver
                          </button>
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

export default Registro