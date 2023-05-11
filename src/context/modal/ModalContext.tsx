import { createContext } from 'react'
import { Feature } from '../../interfaces/placesFireBase'

export interface ModalContextProps {
    stateModal: boolean;
    place: Feature
    SetStateModal: (state: boolean) => Promise<any>;
    SetPlace: (place: Feature) => Promise<Feature>

}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)
