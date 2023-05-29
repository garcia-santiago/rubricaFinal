import React from 'react'
import { auth, db } from '../firebase'
import { useNavigate} from 'react-router-dom'

const gestion = () => {
  const navigate=useNavigate()
    const [esAdmin,setEsAdmin]=React.useState(false)
    React.useEffect(()=>{
        const mainFN = async () => {
                const data=await db.collection("usuarios").get()
                const admin = data.docs.filter(user => user.data().tipo == 'Admin')
                try {
                    if (auth.currentUser.email == admin[0].data().email) {
                        setEsAdmin(true);
                        console.log('Admin')
                    }
                    else{
                        console.log('Usuario no admin')
                        navigate('/')
                    }
                } catch (error) {
                    console.log('No existe un usuario');
                    navigate('/login')
                }

        }
        mainFN();

    },[navigate])
  return (
    <div>
        <h1>hola</h1>
    </div>
  )
}

export default gestion