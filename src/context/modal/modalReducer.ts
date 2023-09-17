import { ModalState } from './ModalProvider'

import { Feature, Evento } from '../../interfaces/placesFireBase'

type ModalAction =
    | { type: 'setStateModal', payload: boolean }
    | { type: 'setStateModalEvent', payload: boolean }
    | { type: 'setStateModalAddEvent', payload: boolean }
    | { type: 'setPlaceRoute', payload: Feature }
    | { type: 'setPlace', payload: Feature }
    | { type: 'setEvento', payload: Evento }

export const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'setStateModal':
      return {
        ...state,
        stateModal: action.payload
      }
    case 'setStateModalEvent':
      return {
        ...state,
        stateModalEvent: action.payload
      }
    case 'setStateModalAddEvent':
      return {
        ...state,
        stateModalAddEvent: action.payload
      }
    case 'setPlaceRoute':
      return {
        ...state,
        placeRoute: action.payload
      }
    case 'setPlace':
      return {
        ...state,
        place: action.payload
      }
    case 'setEvento':
      return {
        ...state,
        evento: action.payload
      }

    default:
      return state
  }
}
