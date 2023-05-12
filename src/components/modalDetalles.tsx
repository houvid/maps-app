import { useContext, useState } from 'react'
import './../assets/Modal.css'
import { ModalContext } from '../context/modal/ModalContext'
export const ModalDetalles = () => {
  const { SetStateModal, place } = useContext(ModalContext)
  const [toggleState, setToggleState] = useState(0)
  const toggleTab = (index: number) => {
    setToggleState(index)
  }
  console.log(place)
  return (
    <div className='  '>
      <div className='modal__content'>

        <div className='modal__close close-modal' title='Close' onClick={() => SetStateModal(false)}>
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
            <li className={toggleState === 0 ? 'li activo' : 'li'} onClick={() => toggleTab(0)}>Descripcion</li>
            <li className={toggleState === 1 ? 'li activo' : 'li'} onClick={() => toggleTab(1)}>Horarios</li>
            <li className={toggleState === 2 ? 'li activo' : 'li'} onClick={() => toggleTab(2)}>Recomendaciones</li>
          </ul>
          <div className='subcontenedor'>
            <div className={toggleState === 0 ? 'bloque activo' : 'bloque'}>
              <h1 className='modal__title'>{place.properties?.name}</h1>
              <p className='modal__description'>{place.properties?.descripcion}</p>
            </div>
            <div className={toggleState === 1 ? 'bloque activo' : 'bloque'}>
              <p className='modal__description '>Lunes a viernes: de 9:00 a.m. a 5:00 p.m.
                Sábados: de 10:00 a.m. a 6:00 p.m.
                Domingos: cerrado
                Nota: Los horarios pueden variar durante días festivos y eventos especiales. Por favor, consulte nuestra página web o llámenos para más información
              </p>
              .
            </div>
            <div className={toggleState === 2 ? 'bloque activo' : 'bloque'}>Sígueme en TikTok</div>
          </div>
        </div>

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
