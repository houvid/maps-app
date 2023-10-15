import { createContext } from 'react'
import { Evento, Feature } from '../../interfaces/places'

export interface PlacesContextProps {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces?: boolean;
    places: Feature[];
    placesFiltered: Feature[];
    eventos: Evento[];
    SetPlacesInit: () => Promise<Feature[]>;
    SetPlaces: (places: Feature[]) => Promise<Feature[]>;
    SetEventos: (eventos: Evento[]) => Promise<Evento[]>;
    SetUserLocation: (location: [number, number]) => void;
}

export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps)
