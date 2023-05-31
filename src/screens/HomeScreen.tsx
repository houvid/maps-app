import { useState, useContext, useEffect } from 'react'
import { BtnMyLocation, MapViewLeaf, ReactLogo, SearchBar } from '../components'
import { Modal } from '../components/Modal'
import { ModalContext } from '../context/modal/ModalContext'
import { ModalDetalles } from '../components/modalDetalles'

export const HomeScreen = () => {
  const { stateModal, SetStateModal } = useContext(ModalContext)
  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(stateModal)
  }, [stateModal])
  console.log(stateModal, active)
  const toggle = () => {
    SetStateModal(!stateModal)
  }
  return (
    <div>
      <MapViewLeaf />
      <BtnMyLocation />
      <ReactLogo />
      <SearchBar />
      <Modal active={active} toggle={toggle}>
        <ModalDetalles />
      </Modal>
    </div>
  )
}
