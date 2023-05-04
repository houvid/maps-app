import { useContext, useState } from 'react'
import { authContext, useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../components/NavBar'

export const Administration = () => {
  const auth = useAuth()
  const navigate = useNavigate()
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
