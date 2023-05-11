import { useReducer } from 'react'
import { Feature } from '../../interfaces/places'
import { ModalContext } from './ModalContext'
import { modalReducer } from './modalReducer'

export interface ModalState {
    stateModal: boolean;
    places: Feature[];
}

export interface Props {
    children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: ModalState = {
  stateModal: false,
  places: []
}

export const ModalProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(modalReducer, INITIAL_STATE)

  const SetStateModal = async (state: boolean):Promise<any> => {
    dispatch({ type: 'setStateModal', payload: state })
  }

  return (
    <ModalContext.Provider value={{
      ...state,

      // Methods
      SetStateModal

    }}
    >
      {children}
    </ModalContext.Provider>
  )
}
