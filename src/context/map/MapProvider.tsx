import { useContext, useEffect, useReducer } from 'react'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from '!mapbox-gl'

import { MapContext } from './MapContext'
import { mapReducer } from './mapReducer'
import { PlacesContext } from '../'
import { directionsApi } from '../../apis'
import { DirectionsResponse } from '../../interfaces/directions'

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
  const { places } = useContext(PlacesContext)
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)

  useEffect(() => {
    state.markers.forEach(marker => marker.remove())

    const newMarkers: Marker[] = []

    for (const place of places) {
      const [lng, lat]: any = place.center
      const popup = new Popup()
        .setHTML(`
                    <h6>${place.text_es}</h6>
                    <p>${place.place_name}</p>
                `)
      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!)

      newMarkers.push(newMarker)
    }

    dispatch({ type: 'setMarkers', payload: newMarkers })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places])

  const setMap = (map: Map) => {
    const customMarker = document.createElement('div')
    customMarker.style.backgroundImage = 'url(https://cdn-icons-png.flaticon.com/512/10133/10133906.png)'
    customMarker.style.backgroundSize = 'cover'
    customMarker.style.backgroundPosition = 'center'
    customMarker.style.width = '32px'
    customMarker.style.height = '32px'

    const myLocationPopup = new Popup()
      .setHTML(
            `<h4> Ésta es tu ubicación actual </h4>
            <center> <img src="https://cdn-icons-png.flaticon.com/512/10133/10133906.png" style="width: 50px; align: center "></center>
            <p style="margin-top:15px;" > Acá podemos poner una descripción: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quos delectus iusto suscipit pariatur iste vel magnam optio quo? Ea porro quisquam voluptatum quas numquam itaque similique aspernatur voluptates rem. </p>`)

    // new Marker({
    //   color: '#61DAFB',
    //   element: customMarker
    // })
    //   .setLngLat(map.getCenter())
    //   .setPopup(myLocationPopup)
    //   .addTo(map)
    // console.log(map.getCenter())

    dispatch({ type: 'setMap', payload: map })
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
      { padding: 50 }
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
        'line-color': 'black',
        'line-width': 3
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
