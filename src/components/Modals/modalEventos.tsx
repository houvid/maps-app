import { useContext, useState } from 'react'
import '../../assets/Modal.css'
import { ModalContext } from '../../context/modal/ModalContext'
import { Modal } from 'react-bootstrap'
import Box from '@mui/material/Box'
import { FaStopwatch, FaInfoCircle, FaIdCard } from 'react-icons/fa'
export const ModalEventos = () => {
  const { SetStateModalEvent, evento, stateModalEvent } = useContext(ModalContext)
  const [toggleState, setToggleState] = useState(1)
  const programacionEvento: any = evento.horarioEvento?.split(',')
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
      <h1 className='modal__title' style={{ textAlign: 'center' }}>{evento.eventName}</h1>
      <div className='contenedor'>
        <ul className='ul'>
          <li className={toggleState === 1 ? 'li activo' : 'li'} onClick={() => toggleTab(1)}><p className='text-center'><FaStopwatch /> <br />Programación </p> </li>
          <li className={toggleState === 0 ? 'li activo' : 'li'} onClick={() => toggleTab(0)}> <p className='text-center'><FaInfoCircle /><br /> Información </p></li>
          <li className={toggleState === 2 ? 'li activo' : 'li'} onClick={() => toggleTab(2)}><p className='text-center'><FaIdCard /> <br />  Contacto </p></li>
        </ul>
        <div className='subcontenedor'>
          <div className={toggleState === 0 ? 'bloque activo' : 'bloque'}>
            <p className='modal__description'>{evento.description}</p>
          </div>
          {/* // progranmación */}
          <div className={toggleState === 1 ? 'bloque activo' : 'bloque'}>
            {programacionEvento !== undefined && programacionEvento.length > 0
              ? (
                  programacionEvento.map((row: any) => (
                    <div key={row} className='stackEventos'>
                      <span className='modal__description'><FaIdCard style={{ margin: 15 }} />{row} </span>
                    </div>
                  ))
                )
              : (
                <Box>
                  No hay datos disponibles.
                </Box>

                )}
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
