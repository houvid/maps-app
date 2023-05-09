import { useAuth } from '../context/authContext'
import { NavBar } from '../components/NavBar'

export const Administration = () => {
  const auth = useAuth()
  const userEmail = auth.user.email
  console.log(userEmail)
  if (!userEmail) {
    return (<div> <span className='loader' /> </div>)
  }
  return (

    <div>
      <NavBar />
      <h1>administration  {userEmail}</h1>
    </div>
  )
}
