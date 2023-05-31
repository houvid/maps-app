import { useEffect, useContext, useRef } from 'react'
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
      const routingControl = routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(userLocation),
          L.latLng(placeRoute.geometry.coordinates[1], placeRoute.geometry.coordinates[0])
        ],
        createMarker: () => null,
        lineOptions: {
          styles: [{ color: '#828ff8', opacity: 0.8, weight: 5, dashArray: '5, 10' }] // Cambiar el color de la polyline aquí
        }
      }).addTo(map)
      routingControlRef.current = routingControl
      const waypoints = routingControl.getWaypoints()
      console.log(waypoints[0])

      console.log(routingControl)
      return () => {
        if (routingControlRef.current) {
          routingControlRef.current.getPlan().setWaypoints([])
          routingControlRef.current.remove()
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, placeRoute])

  return null
}
