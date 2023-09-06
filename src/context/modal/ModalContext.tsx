import { createContext } from 'react'
import { Feature } from '../../interfaces/placesFireBase'

export interface ModalContextProps {
    stateModal: boolean;
    stateModalEvent: boolean;
    place: Feature;
    placeRoute: Feature;
    SetStateModal: (state: boolean) => Promise<any>;
    SetStateModalEvent: (state: boolean) => Promise<any>;
    SetPlace: (place: Feature) => Promise<Feature>
    SetPlaceRoute: (placeRoute: Feature) => Promise<Feature>

}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)
