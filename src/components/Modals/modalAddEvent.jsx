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
    municipio: place.properties?.municipio,
    coordinates: [],
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
  console.log(place)
  const toggleTab = (index) => {
    setToggleState(index)
  }
  const [file, setFile] = useState(null)
  const subirArchivo = async () => {
    try {
      const result = await uploadImage(file, 'eventos')
      setEvent({ ...event, urlImagen: result })
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
    setEvent({ ...event, coordinates: [place.geometry?.coordinates[1], place.geometry?.coordinates[0]] })
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
                  <label htmlFor='description'>Descripcion:</label>
                  <input
                    type='text'
                    id='description'
                    name='description'
                    className='form-control'
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
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
                  <label htmlFor='date'>Fecha:</label>
                  <input
                    type='date'
                    id='date'
                    name='date'
                    className='form-control'
                    value={event.date}
                    onChange={(e) => setEvent({ ...event, date: e.target.value })}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='horarioEvento'>Horario del Evento:</label>
                  <input
                    type='text'
                    id='horarioEvento'
                    name='horarioEvento'
                    className='form-control'
                    value={event.horarioEvento}
                    onChange={(e) => setEvent({ ...event, horarioEvento: e.target.value })}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='municipio'>Municipio:</label>
                  <input
                    type='text'
                    id='municipio'
                    name='municipio'
                    className='form-control'
                    value={event.municipio}
                    onChange={(e) => setEvent({ ...event, municipio: e.target.value })}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='organizador'>Organizador:</label>
                  <input
                    type='text'
                    id='organizador'
                    name='organizador'
                    className='form-control'
                    value={event.organizador}
                    onChange={(e) => setEvent({ ...event, organizador: e.target.value })}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='telefonoOrg'>Teléfono del Organizador:</label>
                  <input
                    type='text'
                    id='telefonoOrg'
                    name='telefonoOrg'
                    className='form-control'
                    value={event.telefonoOrg}
                    onChange={(e) => setEvent({ ...event, telefonoOrg: e.target.value })}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='emailOrg'>Email del Organizador:</label>
                  <input
                    type='email'
                    id='emailOrg'
                    name='emailOrg'
                    className='form-control'
                    value={event.emailOrg}
                    onChange={(e) => setEvent({ ...event, emailOrg: e.target.value })}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='instagram'>Instagram:</label>
                  <input
                    type='text'
                    id='instagram'
                    name='instagram'
                    className='form-control'
                    value={event.instagram}
                    onChange={(e) => setEvent({ ...event, instagram: e.target.value })}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='facebook'>Facebook:</label>
                  <input
                    type='text'
                    id='facebook'
                    name='facebook'
                    className='form-control'
                    value={event.facebook}
                    onChange={(e) => setEvent({ ...event, facebook: e.target.value })}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='twitter'>Twitter:</label>
                  <input
                    type='text'
                    id='twitter'
                    name='twitter'
                    className='form-control'
                    value={event.twitter}
                    onChange={(e) => setEvent({ ...event, twitter: e.target.value })}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='linkWeb'>Enlace Web:</label>
                  <input
                    type='text'
                    id='linkWeb'
                    name='linkWeb'
                    className='form-control'
                    value={event.linkWeb}
                    onChange={(e) => setEvent({ ...event, linkWeb: e.target.value })}
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
    height: '85%',
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
