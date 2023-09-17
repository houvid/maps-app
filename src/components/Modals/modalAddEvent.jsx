import { useContext, useState } from 'react'
import '../../assets/Modal.css'
import { ModalContext } from '../../context/modal/ModalContext'
import { Modal } from 'react-bootstrap'
import { uploadImage, updateFeature } from '../../firebase/firebase'
export const ModalAddEvent = () => {
  const { SetStateModalAddEvent, place, stateModalAddEvent } = useContext(ModalContext)
  const [toggleState, setToggleState] = useState(0)
  const [event, setEvent] = useState({
    date: '',
    eventName: '',
    description: '',
    horarioEvento: '',
    municipio: '',
    urlImagen: '',
    organizador: '',
    telefonoOrg: '',
    emailOrg: '',
    instagram: '',
    facebook: '',
    twitter: '',
    linkWeb: ''
  })
  const [eventName, setEventName] = useState('') // Nuevo estado para el nombre del evento

  const toggleTab = (index) => {
    setToggleState(index)
  }
  const [file, setFile] = useState(null)
  const subirArchivo = async () => {
    try {
      const result = await uploadImage(file)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  const closeModal = () => {
    SetStateModalAddEvent(false)
  }
  const handleNameChange = (e) => {
    setEventName(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    event.eventName = eventName
    const eventos = [...place.properties.Eventos]
    eventos.push(event)
    place.properties.Eventos = eventos
    updateFeature(place.idCollection, place)
  }
  return (
    <Modal show={stateModalAddEvent} onHide={closeModal} className='contenedorPrincipalModal' styles={styles.modalContainer} dialogClassName='modal-right'>
      <div className='modal__close close-modal' title='Close' onClick={closeModal}>
        <i className='bx bx-x' />
      </div>
      <div className='contenedor'>
        <ul className='ul'>
          <li className={toggleState === 0 ? 'li activo' : 'li'} onClick={() => toggleTab(0)}> <p className='text-center'> Add </p></li>
          <li className={toggleState === 1 ? 'li activo' : 'li'} onClick={() => toggleTab(1)}><p className='text-center'>  Eventos </p> </li>
          <li className={toggleState === 2 ? 'li activo' : 'li'} onClick={() => toggleTab(2)}><p className='text-center'>  Recomendamos </p></li>
        </ul>
        <div className='subcontenedor'>
          <div className={toggleState === 0 ? 'bloque activo' : 'bloque'}>
            <h1 className='modal__title'>{place.properties?.name}</h1>
            <h2> Agregar nuevo evento </h2>
            <div className='contentModal'>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='name'>Nombre:</label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    className='form-control'
                    value={eventName} // Asignar el valor del estado al input
                    onChange={handleNameChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='name'>Link Imagen:</label>
                  <input
                    type='text'
                    id='urlImagen'
                    name='urlImagen'
                    className='form-control'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='name'>Imagen: </label>
                  <input
                    type='file'
                    id='imagen'
                    name='imagen'
                    className='form-control'
                    onChange={e => {
                      const selectedFile = e.target.files?.[0]
                      if (selectedFile) {
                        setFile(selectedFile)
                      }
                    }}
                  />
                  <span className='btn btn-primary' onClick={e => { e.preventDefault(); return subirArchivo() }}>
                    Subir
                  </span>
                </div>
                <div className='form-group'>
                  <label htmlFor='categoria'>Categoria:</label>
                  <select name='categoria' id='categoria' className='form-control'>
                    <option value='museo'> Museo</option>
                    <option value='Interes Cultural'> Interes Cultural</option>
                    <option value='Restaurante'> Restaurante</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='descripcion'>Descripcion:</label>
                  <input
                    type='text'
                    id='descripcion'
                    name='descripcion'
                    className='form-control'
                  />
                </div>

                <button type='submit' className='btn btn-primary'>
                  Enviar
                </button>
              </form>
            </div>
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
