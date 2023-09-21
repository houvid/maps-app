import { BtnMyLocation, MapViewLeaf, ReactLogo } from '../components'
import { BarMap } from '../components/BarMap'
import { useRef } from 'react'
export const HomeScreen = () => {
  const mapRef = useRef(null)
  return (
    <div>
      <BarMap mapRef={mapRef} />
      <MapViewLeaf mapRef={mapRef} />
      <BtnMyLocation />
      <ReactLogo />
    </div>
  )
}
