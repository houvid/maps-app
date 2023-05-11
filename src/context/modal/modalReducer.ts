import { ModalState } from './ModalProvider'

import { Feature } from '../../interfaces/places'

type ModalAction =
    | { type: 'setStateModal', payload: boolean }
    | { type: 'setLoadingPlaces' }
    | { type: 'setPlaces', payload: Feature[] }

export const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'setStateModal':
      return {
        ...state,
        stateModal: action.payload
      }
    case 'setLoadingPlaces':
      return {
        ...state,
        places: []
      }
    case 'setPlaces':
      return {
        ...state,
        places: action.payload
      }

    default:
      return state
  }
}
