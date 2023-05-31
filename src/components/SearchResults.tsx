import { useContext } from 'react'
import { PlacesContext } from '../context'
import { LoadingPlaces } from '.'
import { Feature } from '../interfaces/places'

export const SearchResuls = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext)
  if (isLoadingPlaces) {
    return <LoadingPlaces />
  }
  if (places.length === 0) { return <></> }
  return (
    <ul className='list-group mt-3 '>
      {
                places.map(place => (
                  <li
                    key={place.id}
                    className='list-group-item list-group-item-action pointer'
                  >
                    <h6>{place.properties?.name} </h6>
                    <button className='btn btn-outline-primary btn-sm '>
                      Direcciones
                    </button>
                  </li>
                ))
            }

    </ul>
  )
}
