import { useContext } from 'react'
import './../assets/Modal.css'
import { ModalContext } from '../context/modal/ModalContext'
export const ModalDetalles = () => {
  const { SetStateModal, place } = useContext(ModalContext)
  console.log(place)
  return (
    <div className=''>
      <div className='modal__content'>
        <div className='modal__close close-modal' title='Close' onClick={() => SetStateModal(false)}>
          <i className='bx bx-x' />
        </div>
        <img src={place.properties?.urlImagen} alt='' className='modal__img' />
        <h1 className='modal__title'>{place.properties?.name}</h1>
        <p className='modal__description'>{place.properties?.descripcion}</p>
        {/* <button className='modal__button modal__button-width'>
          View status
        </button> */}
        <button className='modal__button-link close-modal' onClick={() => SetStateModal(false)}>
          Close
        </button>
      </div>
    </div>
  )
}
