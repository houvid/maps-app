import React, { useEffect, useContext, useRef } from 'react'
import { PlacesContext, ModalContext } from '../../context'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

export const Routing = () => {
  const { userLocation } = useContext(PlacesContext)
  const { placeRoute } = useContext(ModalContext)
  const map = useMap()
  const routingControlRef = useRef(null)

  useEffect(() => {
    if (!placeRoute) {
      console.log('No place', placeRoute)
    } else {
      const customIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/5632/5632722.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      })

      const routingControl = routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(userLocation),
          L.latLng(placeRoute.geometry.coordinates[1], placeRoute.geometry.coordinates[0])
        ],
        waypointIcon: customIcon
      }).addTo(map)
      routingControlRef.current = routingControl
      console.log(routingControl)

      const onRoutesFound = (event) => {
        const routes = event.routes
        // Aquí puedes acceder a los datos de la ruta, como la distancia, la duración, las instrucciones, etc.
        console.log(routes)
      }
      return () => {
        if (routingControlRef.current) {
          routingControlRef.current.getPlan().setWaypoints([])
          routingControlRef.current.remove()
        }
      }
    }
  }, [map, placeRoute])

  return null
}
