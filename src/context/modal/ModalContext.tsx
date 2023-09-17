import { createContext } from 'react'
import { Feature, Evento } from '../../interfaces/placesFireBase'
export interface ModalContextProps {
    stateModal: boolean;
    stateModalEvent: boolean;
    stateModalAddEvent: boolean;
    place: Feature;
    evento: Evento;
    placeRoute: Feature;
    SetStateModal: (state: boolean) => Promise<any>;
    SetStateModalEvent: (state: boolean) => Promise<any>;
    SetStateModalAddEvent: (state: boolean) => Promise<any>;
    SetPlace: (place: Feature) => Promise<Feature>
    SetEvento: (evento: Evento) => Promise<Evento>
    SetPlaceRoute: (placeRoute: Feature) => Promise<Feature>

}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)
