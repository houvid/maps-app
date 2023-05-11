import { MapProvider, PlacesProvider } from './context'
import { HomeScreen } from './screens'
import { ModalProvider } from './context/modal/ModalProvider'

export const MapsApps = () => {
  return (
    <ModalProvider>
      <PlacesProvider>
        <MapProvider>
          <HomeScreen />
        </MapProvider>
      </PlacesProvider>
    </ModalProvider>
  )
}
