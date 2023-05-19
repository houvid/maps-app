import { React, useContext, useLayoutEffect } from 'react'
import { PlacesContext } from '../context'
import { Markers } from './Markers'
import 'leaflet/dist/leaflet.css'

import { MapContainer, Marker, Popup, TileLayer, useMap, LatLngLiteral } from 'react-leaflet'
import '../assets/leaflet.css'
export const MapViewLeaf = () => {
  const { isLoading, userLocation } = useContext(PlacesContext)
  console.log(userLocation)
  if (isLoading || !userLocation) {
    // Renderiza un indicador de carga o cualquier otro contenido mientras se obtienen los datos de ubicación
    return <div>Cargando...</div>
  }
  return (
    <MapContainer center={userLocation} zoom={13} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Markers />
    </MapContainer>
  )
}
