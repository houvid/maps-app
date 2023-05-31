import { useReducer, useEffect } from 'react'
import { getUserLocation } from '../../helpers'
import { Feature } from '../../interfaces/places'
import { PlacesContext } from './PlacesContext'
import { placesReducer } from './placesReducer'
import { getFeatures } from '../../firebase/firebase'

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];

    isLoadingPlaces?: boolean;
    places: Feature[];
}

export interface Props {
    children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: []
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE)

  useEffect(() => {
    getUserLocation().then(lnLat => dispatch({ type: 'setUserLocation', payload: lnLat }))
  }, [])

  const SetPlacesInit = async ():Promise<Feature[]> => {
    dispatch({ type: 'setLoadingPlaces' })
    const resp = await getFeatures()
    dispatch({ type: 'setPlaces', payload: resp })
    return resp
  }

  return (
    <PlacesContext.Provider value={{
      ...state,

      // Methods
      SetPlacesInit

    }}
    >
      {children}
    </PlacesContext.Provider>
  )
}
