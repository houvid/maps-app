import { React, useContext, useEffect, useState } from 'react'
import { PlacesContext, ModalContext } from '../../context'
import { Markers } from './Markers'
import { iconMarkerMuseo, iconMarkerArbelaez, iconMarkerCapilla, iconMarkerCruces, iconMarkerArqueologia, iconMarkerIndepende } from '../IconLocation'
import { Routing } from './Routing'

import 'leaflet/dist/leaflet.css'
import { Modal } from 'react-bootstrap'
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'
import 'leaflet-routing-machine'
import '../../assets/leaflet.css'
export const MapViewLeaf = () => {
  const { isLoading, userLocation, places, isLoadingPlaces, SetPlacesInit } = useContext(PlacesContext)
  const { SetPlace, SetPlaceRoute, place, placeRoute } = useContext(ModalContext)
  const [filter, setFilter] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [toggleState, setToggleState] = useState(0)
  useEffect(() => {
    SetPlacesInit()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (isLoading || !userLocation || isLoadingPlaces) {
    // Renderiza un indicador de carga o cualquier otro contenido mientras se obtienen los datos de ubicación
    return <div className='backLoader loading-map d-flex justify-content-center aling-items-center'> <p> GeoGuía</p><span className='loader'> </span></div>
  }
  const homologarIcon = (placeName) => {
    switch (placeName) {
      case 'Museo':
        return iconMarkerMuseo
      case 'FÁBRICA DE GUITARRAS LOS ARBELÁEZ':
        return iconMarkerArbelaez
      case 'CAPILLA DE JESÚS NAZARENO':
        return iconMarkerCapilla
      case 'COLECCIÓN DE CRUCES, CRISTOS Y CRUCIFIJOS,':
        return iconMarkerCruces
      case 'SALA DE ARQUEOLOGÍA':
        return iconMarkerArqueologia
      case 'SALA DE HISTORIA E INDEPENDENCIA':
        return iconMarkerIndepende
      default:
        return iconMarkerArbelaez
    }
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
    const botonCerrar = document.querySelector('.leaflet-popup-close-button')
    botonCerrar?.click()
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const placesFiltered = places.filter(place => filter === '' || place.properties?.categoria === filter)
  return (
    <MapContainer center={userLocation} zoom={15} scrollWheelZoom zoomControl={false}>
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        attribution='&copy; <a href="https://carto.com/attributions">Carto</a>'
      />
      <select defaultValue='' onChange={handleFilterChange} className='' style={{ display: 'hidden' }}>
        <option value=''>Todos</option>
        <option value='Interes Cultural'>Interes Cultural</option>
        <option value='museo'>Museos</option>
        {/* Agrega otras opciones de filtro según tus necesidades */}
      </select>
      <ZoomControl position='topright' />
      <Markers />
      {
      placesFiltered
        .map((place, index) => {
          const icon = homologarIcon(place.properties?.name)
          return (
            <Marker key={index} id={index} position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]} icon={icon}>
              <Popup className='custom-popup'>
                <div>
                  <img src={place.properties?.urlImagen} alt='img' className='' />
                  <p className='title'>
                    <strong>{place.properties.name} </strong>
                  </p>
                  <p>{place.properties.descripcion.slice(0, 60)} <strong onClick={() => openModal(place)}>  Ver más...  </strong></p>
                  <button className='btn' onClick={() => openModal(place)}> Ver mas detalles</button>
                  <button className='btn btn-primary' onClick={() => setPlaceToRoute(place)}> Ir</button>
                </div>
              </Popup>
            </Marker>
          )
        })
        }
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
