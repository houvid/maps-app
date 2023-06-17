/* eslint-disable no-unused-vars */
import { React, useContext, useEffect, useState } from 'react'
import { PlacesContext, ModalContext } from '../../context'
import { MarkerLocation } from './MarkerLocation'
import { MarkersPlaces } from './MarkersPlaces'
import { Routing } from './Routing'

import 'leaflet/dist/leaflet.css'
import { Modal } from 'react-bootstrap'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import 'leaflet-routing-machine'
import '../../assets/leaflet.css'
export const MapViewLeaf = () => {
  const { isLoading, userLocation, isLoadingPlaces, SetPlacesInit } = useContext(PlacesContext)
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
    return <div className='backLoader loading-map d-flex justify-content-center aling-items-center'><img src='logo-2 Blanco.png' alt='img' style={{ height: '170px', padding: '50px' }} /><span className='loader'> </span></div>
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
  return (
    <MapContainer center={userLocation} zoom={15} scrollWheelZoom zoomControl={false}>
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      />
      <select defaultValue='' onChange={handleFilterChange} className='' style={{ display: 'hidden' }}>
        <option value=''>Todos</option>
        <option value='Interes Cultural'>Interes Cultural</option>
        <option value='museo'>Museos</option>
        {/* Agrega otras opciones de filtro según tus necesidades */}
      </select>
      <ZoomControl position='topright' />
      <MarkerLocation />
      <MarkersPlaces openModal={openModal} setPlaceToRoute={setPlaceToRoute} />
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
              <li className={toggleState === 0 ? 'li activo' : 'li'} onClick={() => toggleTab(0)}> <p className='text-center'> Info </p></li>
              <li className={toggleState === 1 ? 'li activo' : 'li'} onClick={() => toggleTab(1)}><p className='text-center'>  Horarios </p> </li>
              <li className={toggleState === 2 ? 'li activo' : 'li'} onClick={() => toggleTab(2)}><p className='text-center'>  Recomendamos </p></li>
            </ul>
            <div className='subcontenedor'>
              <div className={toggleState === 0 ? 'bloque activo' : 'bloque'}>
                <h1 className='modal__title'>{place.properties?.name}</h1>
                <p className='modal__description'>{place.properties?.descripcion}</p>
              </div>
              <div className={toggleState === 1 ? 'bloque activo' : 'bloque'}>
                <p className='modal__description '>Lunes a viernes: de 9:00 a.m. a 5:00 p.m.<br />
                  Sábados: de 10:00 a.m. a 6:00 p.m. <br />
                  Domingos: cerrado <br />
                  Nota: Los horarios pueden variar durante días festivos y eventos especiales. Por favor, consulte nuestra página web o llámenos para más información <br />
                </p>
                .
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
