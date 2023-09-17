/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useReducer } from 'react'
import { PlacesContext } from '../context'
import { FaLocationArrow } from 'react-icons/fa'
import { placesReducer } from '../context/places/placesReducer'
import { PlacesState } from '../context/places/PlacesProvider'
const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
  placesFiltered: [],
  eventos: []
}
export const BtnMyLocation = () => {
  const { places, placesFiltered } = useContext(PlacesContext)
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE)

  const onClick = (filter: string) => {
    const placesFilter = places.filter(place => filter === '' || place.properties?.categoria === filter)
    dispatch({ type: 'setPlacesFiltered', payload: placesFilter })
  }
  return (
    <button
      className='btn'
      onClick={() => onClick('Interes Cultural')}
      style={{
        position: 'fixed',
        top: '30px',
        right: '30px',
        zIndex: 998,
        color: '#5b4ce6',
        display: 'none'

      }}
    >
      <FaLocationArrow /> Museos
    </button>
  )
}
