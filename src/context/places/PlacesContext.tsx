import { createContext } from 'react'
import { Evento, Feature } from '../../interfaces/places'

export interface PlacesContextProps {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces?: boolean;
    places: Feature[];
    eventos: Evento[];
    placesFiltered: Feature[];
    SetPlacesInit: () => Promise<Feature[]>
    SetEventos: (eventos: Evento[]) => Promise<Evento[]>
}

export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps)
