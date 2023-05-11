import { useContext, useEffect, useReducer } from 'react'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from '!mapbox-gl'

import { MapContext } from './MapContext'
import { mapReducer } from './mapReducer'
import { PlacesContext } from '../'
import { directionsApi } from '../../apis'
import { DirectionsResponse } from '../../interfaces/directions'
import { Feature } from '../../interfaces/placesFireBase'
import { ModalContext } from '../modal/ModalContext'

export interface MapState {
    isMapReady: boolean;
    map?: Map,
    markers: Marker[];

}

interface Props {
    children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: []

}

export const MapProvider = ({ children }: Props) => {
  const { places, userLocation } = useContext(PlacesContext)
  const { SetStateModal, SetPlace } = useContext(ModalContext)
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)

  useEffect(() => {
    state.markers.forEach(marker => marker.remove())

    const newMarkers: Marker[] = []

    for (const place of places) {
      const [lng, lat]: any = place.geometry?.coordinates
      const popup = new Popup()
        .setDOMContent(createPopupContent(place))
      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!)

      newMarkers.push(newMarker)
    }

    dispatch({ type: 'setMarkers', payload: newMarkers })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places])

  const getRoute = (place: Feature) => {
    if (!userLocation) return
    const [lng, lat]: any = place.geometry?.coordinates
    getRouteBetweenPoints(userLocation, [lng, lat])
    const botonCerrar = document.querySelector('.mapboxgl-popup-close-button') as HTMLElement
    botonCerrar?.click()
  }
  function openDetails (state:boolean, place: Feature) {
    const botonCerrar = document.querySelector('.mapboxgl-popup-close-button') as HTMLElement
    botonCerrar?.click()
    SetPlace(place)
    SetStateModal(state)
  }

  const setMap = (map: Map) => {
    const customMarker = document.createElement('div')
    customMarker.style.backgroundImage = 'url(https://cdn-icons-png.flaticon.com/512/5632/5632722.png)'
    customMarker.style.backgroundSize = 'cover'
    customMarker.style.backgroundPosition = 'center'
    customMarker.style.width = '40px'
    customMarker.style.height = '40px'

    const myLocationPopup = new Popup()
      .setHTML(
        '<h6> Estás aquí</h6>')

    new Marker({
      color: '#61DAFB',
      element: customMarker
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map)
    console.log(map.getCenter())

    dispatch({ type: 'setMap', payload: map })
  }
  function createPopupContent (place: any) {
    let textodescripcion = place.properties.descripcion
    if (typeof textodescripcion !== 'undefined') {
      const textoRecortado = textodescripcion.slice(0, 110) // llama a slice solo si texto está definido
      textodescripcion = textoRecortado + '... (ver más)'
    }
    const image = document.createElement('img')
    image.src = place.properties?.urlImagen
    image.style.width = '100%'
    image.style.height = '120px'
    image.style.objectFit = 'cover'
    image.style.marginTop = '5px'
    image.style.marginBottom = '5px'
    image.style.borderRadius = '.5rem'

    const container = document.createElement('div')
    container.style.fontFamily = 'Poppins'
    container.style.placeItems = 'center'
    container.style.margin = '0 auto'
    const name = document.createElement('h6')
    container.style.fontWeight = '500'
    name.textContent = place.properties?.name

    const description = document.createElement('p')
    description.textContent = textodescripcion

    const btn = document.createElement('button')
    btn.className = 'btn'
    btn.onclick = () => openDetails(true, place)
    btn.textContent = 'Ver más detalles'

    const btnModal = document.createElement('button')
    btnModal.id = 'btnModal'
    btnModal.className = 'btn btn-primary'
    btnModal.textContent = 'Ir'
    btnModal.style.position = 'absolute'
    btnModal.style.marginLeft = '10px'
    btnModal.onclick = () => getRoute(place)

    container.appendChild(image)
    container.appendChild(name)
    container.appendChild(description)
    container.appendChild(btn)
    container.appendChild(btnModal)

    return container
  }

  const getRouteBetweenPoints = async (start: [ number, number ], end: [number, number ]) => {
    const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(',')} ; ${end.join(',')}`)
    const { distance, duration, geometry } = resp.data.routes[0]
    const { coordinates: coords } = geometry

    let kms = distance / 1000
    kms = Math.round(kms * 100)
    kms /= 100
    const minutes = Math.floor(duration / 60)

    console.log(kms, minutes, resp.data)

    const bounds = new LngLatBounds(
      start,
      start
    )

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]]
      bounds.extend(newCoord)
    }

    state.map?.fitBounds(bounds,
      { padding: 80 }
    )

    // Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    // Remueve polyline

    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString')
      state.map.removeSource('RouteString')
    }

    state.map?.addSource('RouteString', sourceData)

    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'

      },
      paint: {
        'line-color': '#4ecca3',
        'line-width': 6,
        'line-blur': 1
      }
    })
  }

  return (
    <MapContext.Provider value={{
      ...state,

      // Methods
      setMap,
      getRouteBetweenPoints
    }}
    >
      {children}
    </MapContext.Provider>
  )
}
