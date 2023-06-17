/* eslint-disable no-unused-vars */
import { useAuth } from '../context/authContext'
import { NavBar } from '../components/NavBar'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlacesContext } from '../context'

export const Features = () => {
  const { places } = useContext(PlacesContext)
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
        <h2 className='text-center'>(MODULO EN CONSTRUCCIÓN) ¡Estos son los registros que tenemos actualmente!</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Img</th>
                <th scope='col'>Nombre</th>
                <th scope='col'>Latitud</th>
                <th scope='col'>longitud</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope='row'>2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope='row'>3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
