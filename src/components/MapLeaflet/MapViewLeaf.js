import { React, useContext, useEffect, useState } from 'react'
import { PlacesContext, ModalContext } from '../../context'
import { Markers } from './Markers'
import { iconMarkerGreen } from '../IconLocation'
import { Routing } from './Routing'

import 'leaflet/dist/leaflet.css'
import { Modal } from 'react-bootstrap'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet-routing-machine'
import '../../assets/leaflet.css'
export const MapViewLeaf = () => {
  const { isLoading, userLocation, places, isLoadingPlaces, SetPlacesInit } = useContext(PlacesContext)
  const { SetPlace, SetPlaceRoute, place, placeRoute } = useContext(ModalContext)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [toggleState, setToggleState] = useState(0)
  useEffect(() => {
    SetPlacesInit()
    console.log(place)
  }, [])
  if (isLoading || !userLocation || isLoadingPlaces) {
    // Renderiza un indicador de carga o cualquier otro contenido mientras se obtienen los datos de ubicación
    return <div>Cargando...</div>
  }
  const openModal = (place) => {
    setModalIsOpen(true)
    SetPlace(place)
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }
  const toggleTab = (index) => {
    setToggleState(index)
  }
  const setPlaceToRoute = (place) => {
    SetPlaceRoute(place)
  }
  return (
    <MapContainer center={userLocation} zoom={13} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">'
        url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
      />
      <Markers />
      {places.map((place, index) => (
        <Marker key={index} position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]} icon={iconMarkerGreen}>
          <Popup className='custom-popup'>
            <div>
              <img src={place.properties?.urlImagen} alt='img' />
              <p>{place.properties.name}</p>
              <p>{place.properties.descripcion}</p>
              <button className='btn btn-primary' onClick={() => openModal(place)}> Ver mas detalles</button>
              <button className='btn btn-primary' onClick={() => setPlaceToRoute(place)}> Ir</button>
            </div>
          </Popup>
        </Marker>
      ))}
      <section style={styles.modal}>
        <Modal show={modalIsOpen} onHide={closeModal} className='contenedorPrincipalModal' style={styles.modalContainer} dialogClassName='modal-right'>
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
              <li className={toggleState === 0 ? 'li activo' : 'li'} onClick={() => toggleTab(0)}>Info</li>
              <li className={toggleState === 1 ? 'li activo' : 'li'} onClick={() => toggleTab(1)}>Horarios</li>
              <li className={toggleState === 2 ? 'li activo' : 'li'} onClick={() => toggleTab(2)}>Recomendamos</li>
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
              <div className={toggleState === 2 ? 'bloque activo' : 'bloque'}>por ahora nada xd</div>
            </div>
          </div>
          <Modal.Footer>
            <button className='modal__button-link close-modal' onClick={closeModal}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </section>
      {Object.keys(placeRoute).length > 0 && <Routing />}
    </MapContainer>
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
