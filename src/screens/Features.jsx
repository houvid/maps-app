/* eslint-disable no-unused-vars */
import { useAuth } from '../context/authContext'
import { NavBar } from '../components/NavBar'
import { PlacesProvider, PlacesContext } from '../context'
import { ModalProvider } from '../context/modal/ModalProvider'
import { ListFeatures } from '../components/Features/ListFeatures'

export const Features = () => {
  const auth = useAuth()
  const userEmail = auth.user.email
  console.log(userEmail)
  return (
    <ModalProvider>
      <PlacesProvider>
        <NavBar />
        <ListFeatures />
      </PlacesProvider>
    </ModalProvider>
  )
}
