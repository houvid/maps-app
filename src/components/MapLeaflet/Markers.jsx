import { React, useContext } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { PlacesContext } from '../../context'
import { iconLocation } from '../IconLocation'
export const Markers = () => {
  const { userLocation } = useContext(PlacesContext)
  return (
    <Marker position={userLocation} icon={iconLocation}>
      <Popup>
        Tu contenido emergente aquí.
      </Popup>
    </Marker>
  )
}
