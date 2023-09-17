import { useContext, useState } from 'react'
import '../../assets/Modal.css'
import { ModalContext } from '../../context/modal/ModalContext'
import { Modal } from 'react-bootstrap'
export const ModalEventos = () => {
  const { SetStateModalEvent, place, stateModalEvent } = useContext(ModalContext)
  const [toggleState, setToggleState] = useState(0)
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
        <img src={place.properties?.urlImagen} alt='' className='modal__img' />
        <img src={place.properties?.urlImagen} alt='' className='modal__img' />
        <img src={place.properties?.urlImagen} alt='' className='modal__img' />
        <img src={place.properties?.urlImagen} alt='' className='modal__img' />
      </div>
      <div className='contenedor'>
        <ul className='ul'>
          <li className={toggleState === 0 ? 'li activo' : 'li'} onClick={() => toggleTab(0)}> <p className='text-center'> Info </p></li>
          <li className={toggleState === 1 ? 'li activo' : 'li'} onClick={() => toggleTab(1)}><p className='text-center'>  Eventos </p> </li>
          <li className={toggleState === 2 ? 'li activo' : 'li'} onClick={() => toggleTab(2)}><p className='text-center'>  Recomendamos </p></li>
        </ul>
        <div className='subcontenedor'>
          <div className={toggleState === 0 ? 'bloque activo' : 'bloque'}>
            <h1 className='modal__title'>{place.properties?.name} LOOOOOOOOOOOL</h1>
            <p className='modal__description'>{place.properties?.descripcion}</p>
          </div>
          <div className={toggleState === 1 ? 'bloque activo' : 'bloque'}>
            {place.properties && place.properties.Eventos && (
              <div>
                {place.properties.Eventos.map((evento, index) => (
                  <p key={index} className='modal__description'>
                    {evento.eventName} {evento.description}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className={toggleState === 2 ? 'bloque activo' : 'bloque'}>
            <p className='modal__description'>
              Investiga sobre el sitio turístico que deseas visitar. Averigua su ubicación, horarios de apertura, tarifas, atracciones principales y cualquier requisito especial que debas tener en cuenta.
              <br />
              Verifica la información de transporte para llegar al sitio turístico. Puedes investigar las opciones de transporte público, alquilar un vehículo o considerar contratar servicios de transporte turístico.<br />

              Comprueba si se requiere algún tipo de reserva o boleto de entrada anticipada para evitar esperas o decepciones.

              Consulta opiniones y reseñas de otros turistas sobre el sitio turístico. Esto puede darte una idea de qué esperar y ayudarte a planificar tu visita de manera más efectiva.<br />

              Prepárate para el clima y las condiciones locales. Asegúrate de llevar ropa adecuada, calzado cómodo y otros elementos necesarios según las características del lugar que visitarás.<br />
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
