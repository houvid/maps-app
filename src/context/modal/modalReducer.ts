import { ModalState } from './ModalProvider'

import { Feature } from '../../interfaces/placesFireBase'

type ModalAction =
    | { type: 'setStateModal', payload: boolean }
    | { type: 'setStateModalEvent', payload: boolean }
    | { type: 'setPlaceRoute', payload: Feature }
    | { type: 'setPlace', payload: Feature }

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

    default:
      return state
  }
}
