import { ModalState } from './ModalProvider'

import { Feature } from '../../interfaces/placesFireBase'

type ModalAction =
    | { type: 'setStateModal', payload: boolean }
    | { type: 'setPlace', payload: Feature }

export const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'setStateModal':
      return {
        ...state,
        stateModal: action.payload
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
