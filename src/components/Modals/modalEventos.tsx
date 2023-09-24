import { useContext, useState } from 'react'
import '../../assets/Modal.css'
import { ModalContext } from '../../context/modal/ModalContext'
import { Modal } from 'react-bootstrap'
export const ModalEventos = () => {
  const { SetStateModalEvent, evento, stateModalEvent } = useContext(ModalContext)
  const [toggleState, setToggleState] = useState(1)
  const toggleTab = (index: number) => {
    setToggleState(index)
  }
  const closeModal = () => {
    SetStateModalEvent(false)
  }
  return (
    <Modal show={stateModalEvent} onHide={closeModal} className='contenedorPrincipalModal' styles={styles.modalContainer} dialogClassName='modal-right'>
      <div className='modal__close close-modal' title='Close' onClick={closeModal}>
        <i className='bx bx-x' />
      </div>
      <div className='slider'>
        <img src={evento.urlImagen} alt='' className='modal__img' />
        <img src={evento.urlImagen} alt='' className='modal__img' />
      </div>
      <div className='contenedor'>
        <ul className='ul'>
          <li className={toggleState === 1 ? 'li activo' : 'li'} onClick={() => toggleTab(1)}><p className='text-center'>  Programación </p> </li>
          <li className={toggleState === 0 ? 'li activo' : 'li'} onClick={() => toggleTab(0)}> <p className='text-center'> Info </p></li>
          <li className={toggleState === 2 ? 'li activo' : 'li'} onClick={() => toggleTab(2)}><p className='text-center'>  contacto </p></li>
        </ul>
        <div className='subcontenedor'>
          <div className={toggleState === 0 ? 'bloque activo' : 'bloque'}>
            <h1 className='modal__title'>{evento.eventName} </h1>
            <p className='modal__description'>{evento.description}</p>
          </div>
          {/* // progranmación */}
          <div className={toggleState === 1 ? 'bloque activo' : 'bloque'}>
            <h1 className='modal__title'>{evento.horarioEvento} </h1>
          </div>
          <div className={toggleState === 2 ? 'bloque activo' : 'bloque'}>
            <p className='modal__description'>
              {evento.emailOrg}
              {evento.facebook}
            </p>
          </div>
        </div>
      </div>
      <Modal.Footer>
        <button className='modal__button-link close-modal' onClick={closeModal}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}
const styles = {
  modalContainer: {
    borderRadius: '1rem 1rem 0 0',
    position: 'absolute',
    top: '0',
    left: '0',
    buttom: '0',
    backgroundcolor: 'hsla(var(--hue), 18%, 75%, .8)',
    width: '100%',
    display: 'grid',
    alignitems: 'flex-end',
    transition: 'all .3s',
    zindex: 'var(--z-modal)',
    float: 'right'
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  '@media (max-width: 767px)': {
    modal: {
      height: '85%',
      bottom: 0,
      top: 'auto'
    }
  }
}
