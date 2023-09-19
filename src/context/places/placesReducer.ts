import { PlacesState } from './PlacesProvider'

import { Evento, Feature } from '../../interfaces/places'

type PlacesAction =
| { type: 'setUserLocation', payload: [number, number]}
| { type: 'setLoadingPlaces'}
| { type: 'setPlaces', payload: Feature[] }
| { type: 'setEventos', payload: Evento[] }
| { type: 'setPlacesFiltered', payload: Feature[] }
| { type: 'setEventos', payload: Evento[] }

export const placesReducer = (state: PlacesState, action: PlacesAction): PlacesState => {
  switch (action.type) {
    case 'setUserLocation':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload
      }
    case 'setLoadingPlaces':
      return {
        ...state,
        isLoadingPlaces: true,
        places: []
      }
    case 'setPlaces':
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload
      }
    case 'setEventos':
      return {
        ...state,
        eventos: action.payload
      }
    case 'setPlacesFiltered':
      return {
        ...state,
        isLoadingPlaces: false,
        placesFiltered: action.payload
      }
    default:
      return state
  }
}
