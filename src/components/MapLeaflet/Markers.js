import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { iconLocation } from '../IconLocation'
export const Markers = () => {
  return (
    <Marker position={[6.169578, -75.3295456]} icon={iconLocation}>
      <Popup>
        Tu contenido emergente aquí.
      </Popup>
    </Marker>
  )
}
