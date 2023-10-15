/* eslint-disable no-unused-vars */
import { React, useContext, useEffect, useState, useRef } from 'react'
import { PlacesContext, ModalContext } from '../../context'
import { MarkerLocation } from './MarkerLocation'
import { MarkersPlaces } from './MarkersPlaces'
import { Routing } from './Routing'
import { getUserLocation } from '../../helpers'

import 'leaflet/dist/leaflet.css'
import { ModalDetalles } from '../Modals/modalDetalles'
import { ModalEventos } from '../Modals/modalEventos'
import { MapContainer, TileLayer, ZoomControl, Popup } from 'react-leaflet'
import 'leaflet-routing-machine'
import '../../assets/leaflet.css'
export const MapViewLeaf = ({ mapRef }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const { isLoading, userLocation, isLoadingPlaces, SetPlacesInit, SetUserLocation } = useContext(PlacesContext)
  const { SetPlace, SetPlaceRoute, placeRoute, SetStateModal, SetEvento, SetStateModalEvent } = useContext(ModalContext)
  const [filter, setFilter] = useState('')
  useEffect(() => {
    SetPlacesInit()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (isLoading || !userLocation || isLoadingPlaces) {
    // Renderiza un indicador de carga o cualquier otro contenido mientras se obtienen los datos de ubicación
    return (
      <div className='backLoader loading-map d-flex justify-content-center aling-items-center'>
        <img src='logo-2 Blanco.png' alt='img' style={{ height: '170px', padding: '50px' }} />
        <span className='loader'> </span>
      </div>
    )
  }
  const openModal = (place) => {
    SetPlace(place)
    SetStateModal(true)
  }
  const openModalEvento = (evento) => {
    SetEvento(evento)
    SetStateModalEvent(true)
  }
  const setPlaceToRoute = async (place) => {
    const lnLat = await getUserLocation()
    SetUserLocation(lnLat)
    SetPlaceRoute(place)
    const botonCerrar = document.querySelector('.leaflet-popup-close-button')
    botonCerrar?.click()
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  return (
    <MapContainer center={userLocation} zoom={12} scrollWheelZoom zoomControl={false} ref={mapRef}>
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      />
      <select defaultValue='' onChange={handleFilterChange} className='' style={{ display: 'hidden' }}>
        <option value=''>Todos</option>
        <option value='Interes Cultural'>Interes Cultural</option>
        <option value='museo'>Museos</option>
        {/* Agrega otras opciones de filtro según tus necesidades */}
      </select>
      <MarkerLocation onClick={() => setIsPopupOpen(false)} />
      <ZoomControl position='topright' />
      <MarkersPlaces openModal={openModal} setPlaceToRoute={setPlaceToRoute} openModalEvento={openModalEvento} />
      <section style={styles.modal}>
        <ModalDetalles />
        <ModalEventos />
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
