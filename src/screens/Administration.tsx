import { useAuth } from '../context/authContext'
import { NavBar } from '../components/NavBar'
import { useNavigate } from 'react-router-dom'

export const Administration = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const userEmail = auth.user.email
  console.log(userEmail)
  if (!userEmail) {
    navigate('/login')
    return (<div> <span className='loader' /> </div>)
  }
  return (

    <div><NavBar />
      <div className='container section'>
        <h1>administration  {userEmail}</h1>
      </div>
    </div>
  )
}
