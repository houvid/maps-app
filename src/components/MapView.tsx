
import { useContext, useLayoutEffect } from 'react'
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Map } from '!mapbox-gl'
import { PlacesContext, MapContext } from '../context'
import { Loading } from './Loading'
import Clusters from './clusters'
import { getFeatures } from '../firebase/firebase'

async function miMetodo () {
  const featuresList = await getFeatures()
  return featuresList
  // Aquí puedes hacer lo que quieras con la lista de features que has obtenido
}
export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext)
  const { setMap } = useContext(MapContext)
  useLayoutEffect(() => {
    miMetodo()
    if (!isLoading) {
      const map = new Map({
        container: 'map', // container ID
        style: 'mapbox://styles/houvid/clfydo7yt002501k6fyhxwoj9', // style URL
        center: [-75.573553, 6.2443382], // starting position [lng, lat]
        zoom: 6 // starting zoom
      })
      const mapWithClusters = Clusters(map)
      setMap(mapWithClusters)
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
