import { useAuth } from '../context/authContext'
import { NavBar } from '../components/NavBar'
import { useNavigate } from 'react-router-dom'

export const Administration = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const userEmail = auth.user.email
  if (!userEmail) {
    navigate('/login')
    return (<div> <span className='loader' /> </div>)
  }
  return (

    <div><NavBar />
      <div className='container section'>
        <h1 className='text-center'>¡Bienvenido al panel de administración!</h1>
        <h2 className='text-center'> Nos alegra verte de nuevo</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src='Admin-amico.svg' alt='img' style={{ height: '400px' }} />
        </div>
      </div>
    </div>
  )
}
