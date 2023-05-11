import { useContext } from 'react'
import './../assets/Modal.css'
import { ModalContext } from '../context/modal/ModalContext'
export const ModalDetalles = () => {
  const { SetStateModal } = useContext(ModalContext)
  return (
    <div className=''>
      <div className='modal__content'>
        <div className='modal__close close-modal' title='Close' onClick={() => SetStateModal(false)}>
          <i className='bx bx-x' />
        </div>
        <img src='assets/img/star-trophy.png' alt='' className='modal__img' />
        <h1 className='modal__title'>Good Job!</h1>
        <p className='modal__description'>Click the button to close</p>
        <button className='modal__button modal__button-width'>
          View status
        </button>
        <button className='modal__button-link close-modal' onClick={() => SetStateModal(false)}>
          Close
        </button>
      </div>
    </div>
  )
}
