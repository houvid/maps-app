
import { useContext, useLayoutEffect } from 'react'
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Map } from '!mapbox-gl'
import { PlacesContext, MapContext } from '../context'
import { Loading } from './Loading'

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext)
  const { setMap } = useContext(MapContext)
  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14 // starting zoom
      })
      setMap(map)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  if (isLoading) {
    return (<Loading />)
  }

  return (
    <div
      id='map'
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      {userLocation?.join(',')}
    </div>
  )
}
