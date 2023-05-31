import { useReducer } from 'react'
import { Feature } from '../../interfaces/placesFireBase'
import { ModalContext } from './ModalContext'
import { modalReducer } from './modalReducer'

export interface ModalState {
    stateModal: boolean;
    placeRoute: Feature;
    place: Feature;
}

export interface Props {
    children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: ModalState = {
  stateModal: false,
  placeRoute: {},
  place: {}
}

export const ModalProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(modalReducer, INITIAL_STATE)

  const SetStateModal = async (state: boolean):Promise<any> => {
    dispatch({ type: 'setStateModal', payload: state })
  }
  const SetPlace = async (place: Feature):Promise<any> => {
    dispatch({ type: 'setPlace', payload: place })
  }
  const SetPlaceRoute = async (placeRoute: Feature):Promise<any> => {
    dispatch({ type: 'setPlaceRoute', payload: placeRoute })
  }

  return (
    <ModalContext.Provider value={{
      ...state,

      // Methods
      SetStateModal,
      SetPlaceRoute,
      SetPlace

    }}
    >
      {children}
    </ModalContext.Provider>
  )
}
