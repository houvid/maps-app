import { React, useContext, useEffect, useLayoutEffect } from 'react'
import { PlacesContext, ModalContext } from '../../context'
import { Markers } from './Markers'
import { iconLocation } from '../IconLocation'
import 'leaflet/dist/leaflet.css'

import { MapContainer, Marker, Popup, TileLayer, useMap, LatLngLiteral } from 'react-leaflet'
import '../../assets/leaflet.css'
export const MapViewLeaf = () => {
  const { isLoading, userLocation, places, isLoadingPlaces, SetPlacesInit } = useContext(PlacesContext)
  const { SetStateModal, SetPlace } = useContext(ModalContext)
  useEffect(() => {
    SetPlacesInit()
  }, [])
  if (isLoading || !userLocation || isLoadingPlaces) {
    // Renderiza un indicador de carga o cualquier otro contenido mientras se obtienen los datos de ubicación
    return <div>Cargando...</div>
  }
  const openDetails = (state, place) => {
    const botonCerrar = document.querySelector('.leaflet-popup-close-button')
    botonCerrar?.click()
    SetPlace(place)
    SetStateModal(state)
  }
  return (
    <MapContainer center={userLocation} zoom={13} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Markers />
      {places.map((place, index) => (
        <Marker key={index} position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]} icon={iconLocation}>
          <Popup>
            <div>
              <img src={place.properties?.urlImagen} alt='img' />
              <h2>{place.properties.name}</h2>
              <p>{place.properties.descripcion}</p>
              <button className='btn btn-primary' onClick={() => openDetails(true, place)}> Ver mas detalles</button>
            </div>
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  )
}
