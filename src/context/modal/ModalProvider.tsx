import { useReducer } from 'react'
import { Evento, Feature } from '../../interfaces/placesFireBase'
import { ModalContext } from './ModalContext'
import { modalReducer } from './modalReducer'

export interface ModalState {
    stateModal: boolean;
    stateModalEvent: boolean;
    stateModalAddEvent: boolean;
    placeRoute: Feature;
    place: Feature;
    evento: Evento;
}

export interface Props {
    children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: ModalState = {
  stateModal: false,
  stateModalEvent: false,
  stateModalAddEvent: false,
  placeRoute: {},
  place: {},
  evento: {}
}

export const ModalProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(modalReducer, INITIAL_STATE)

  const SetStateModal = async (state: boolean):Promise<any> => {
    dispatch({ type: 'setStateModal', payload: state })
  }
  const SetStateModalEvent = async (state: boolean):Promise<any> => {
    dispatch({ type: 'setStateModalEvent', payload: state })
  }
  const SetStateModalAddEvent = async (state: boolean):Promise<any> => {
    dispatch({ type: 'setStateModalAddEvent', payload: state })
  }
  const SetPlace = async (place: Feature):Promise<any> => {
    dispatch({ type: 'setPlace', payload: place })
  }
  const SetEvento = async (evento: Evento):Promise<any> => {
    dispatch({ type: 'setEvento', payload: evento })
  }
  const SetPlaceRoute = async (placeRoute: Feature):Promise<any> => {
    dispatch({ type: 'setPlaceRoute', payload: placeRoute })
  }

  return (
    <ModalContext.Provider value={{
      ...state,

      // Methods
      SetStateModal,
      SetStateModalEvent,
      SetStateModalAddEvent,
      SetPlaceRoute,
      SetPlace,
      SetEvento

    }}
    >
      {children}
    </ModalContext.Provider>
  )
}
