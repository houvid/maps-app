import { BtnMyLocation, MapViewLeaf, ReactLogo } from '../components'
import { BarMap } from '../components/BarMap'

export const HomeScreen = () => {
  return (
    <div>
      <BarMap />
      <MapViewLeaf />
      <BtnMyLocation />
      <ReactLogo />
    </div>
  )
}
