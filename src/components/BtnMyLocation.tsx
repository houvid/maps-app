import { useContext } from 'react'
import { MapContext, PlacesContext } from '../context'
import { FaLocationArrow } from 'react-icons/fa'

export const BtnMyLocation = () => {
  const { map, isMapReady } = useContext(MapContext)
  const { userLocation } = useContext(PlacesContext)

  const onClick = () => {
    if (!isMapReady) throw new Error('Mapa no está listo')
    if (!userLocation) throw new Error('No hay ubicación de usuario')

    map?.flyTo({
      zoom: 14,
      center: userLocation
    })
  }

  return (
    <button
      className='btn btn-link'
      onClick={onClick}
      style={{
        position: 'fixed',
        top: '30px',
        right: '30px',
        zIndex: 999

      }}
    >
      <FaLocationArrow />
    </button>
  )
}
