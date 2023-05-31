import { PlacesProvider } from './context'
import { HomeScreen } from './screens'
import { ModalProvider } from './context/modal/ModalProvider'

export const MapsApps = () => {
  return (
    <ModalProvider>
      <PlacesProvider>
        <HomeScreen />
      </PlacesProvider>
    </ModalProvider>
  )
}
