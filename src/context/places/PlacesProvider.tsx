import { useReducer, useEffect } from 'react'
import { searchApi } from '../../apis'
import { getUserLocation } from '../../helpers'
import { Feature, PlacesResponse } from '../../interfaces/places'
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

  const searchPlacesByTerm = async (query : string):Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: 'setPlaces', payload: [] })
      return []
    }
    if (!state.userLocation) throw new Error('No tenemos ubicacion del usuario')

    dispatch({ type: 'setLoadingPlaces' })

    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(',')
      }
    })
    dispatch({ type: 'setPlaces', payload: resp.data.features })
    console.log('searchPlacesByTerm')
    console.log('"' + resp.data.features[0].id + '" : ' + JSON.stringify(resp.data.features[0]))

    return resp.data.features
  }

  const SetPlacesInit = async ():Promise<Feature[]> => {
    if (!state.userLocation) throw new Error('No tenemos ubicacion del usuario')
    // dispatch({ type: 'setLoadingPlaces' })

    const resp = await getFeatures()
    dispatch({ type: 'setPlaces', payload: resp })
    console.log('SetPlacesInit')
    console.log(resp[0])

    return resp
  }

  return (
    <PlacesContext.Provider value={{
      ...state,

      // Methods
      searchPlacesByTerm,
      SetPlacesInit

    }}
    >
      {children}
    </PlacesContext.Provider>
  )
}
