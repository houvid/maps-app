/* eslint-disable no-unused-vars */
import { React, useContext, useEffect, useState } from 'react'
import { PlacesContext, ModalContext } from '../../context'
import { MarkerLocation } from './MarkerLocation'
import { MarkersPlaces } from './MarkersPlaces'
import { Routing } from './Routing'

import 'leaflet/dist/leaflet.css'
import { ModalDetalles } from '../modalDetalles'
import { ModalEventos } from '../modalEventos'
import { Modal } from 'react-bootstrap'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import 'leaflet-routing-machine'
import '../../assets/leaflet.css'
export const MapViewLeaf = () => {
  const { isLoading, userLocation, isLoadingPlaces, SetPlacesInit } = useContext(PlacesContext)
  const { SetPlace, SetPlaceRoute, place, placeRoute, SetStateModal } = useContext(ModalContext)
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
