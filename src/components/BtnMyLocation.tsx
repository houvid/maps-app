import { useContext } from 'react'
import { PlacesContext } from '../context'
import { FaLocationArrow } from 'react-icons/fa'

export const BtnMyLocation = () => {
  const { userLocation } = useContext(PlacesContext)

  const onClick = () => {
    if (!userLocation) throw new Error('No hay ubicación de usuario')
  }

  return (
    <button
      className='btn'
      onClick={onClick}
      style={{
        position: 'fixed',
        top: '30px',
        right: '30px',
        zIndex: 998,
        color: '#5b4ce6'

      }}
    >
      <FaLocationArrow />
    </button>
  )
}
