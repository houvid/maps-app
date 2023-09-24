import { useReducer, useEffect } from 'react'
import { getUserLocation } from '../../helpers'
import { Evento, Feature } from '../../interfaces/places'
import { PlacesContext } from './PlacesContext'
import { placesReducer } from './placesReducer'
import { getFeatures } from '../../firebase/firebase'

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces?: boolean;
    places: Feature[];
    placesFiltered: Feature[];
    eventos: Evento[];
}

export interface Props {
    children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
  placesFiltered: [],
  eventos: []
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
    dispatch({ type: 'setPlacesFiltered', payload: resp })
    const eventos = await buildEvents(resp)
    SetEventos(eventos)
    return resp
  }
  const SetPlaces = async (places: Feature[]):Promise<Feature[]> => {
    dispatch({ type: 'setPlaces', payload: places })
    return places
  }
  async function buildEvents (resp: Feature[]) {
    const eventos: Evento[] = []
    resp.forEach(feature => {
      if (feature.properties && feature.properties.Eventos) {
        feature.properties.Eventos.forEach(evento => {
          if (evento != null) {
            eventos.push(evento as Evento)
          }
        })
      }
    })

    return eventos
  }
  const SetEventos = async (eventos: Evento[]):Promise<any> => {
    dispatch({ type: 'setEventos', payload: eventos })
  }
  return (
    <PlacesContext.Provider value={{
      ...state,

      // Methods
      SetPlacesInit,
      SetPlaces,
      SetEventos
    }}
    >
      {children}
    </PlacesContext.Provider>
  )
}
