import { createContext } from 'react'

export interface ModalContextProps {
    stateModal: boolean;
    SetStateModal: (state: boolean) => Promise<any>;
}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)
