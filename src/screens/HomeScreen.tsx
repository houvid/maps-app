import { useState, useContext, useEffect } from 'react'
import { BtnMyLocation, MapViewLeaf, ReactLogo } from '../components'
import { ModalContext } from '../context/modal/ModalContext'
import { BarMap } from '../components/BarMap'

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
      <BarMap />
      <MapViewLeaf />
      <BtnMyLocation />
      <ReactLogo />
    </div>
  )
}
