import { BtnMyLocation, MapViewLeaf, ReactLogo } from '../components'
import { BarMap } from '../components/BarMap'
import { useRef, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'
export const HomeScreen = () => {
  const [state, setState] = useState({
    open: true,
    Transition: Slide
  })
  const mapRef = useRef(null)
  const handleClose = () => {
    setState({
      ...state,
      open: false
    })
  }
  const action = (
    <Button color='primary' size='small' variant='contained' style={{ backgroundColor: '#2667FF' }}>
      Registra tu Evento
    </Button>
  )
  return (
    <div>
      <BarMap mapRef={mapRef} />
      <MapViewLeaf mapRef={mapRef} />
      <BtnMyLocation />
      <ReactLogo />
      <a
        href='https://forms.gle/DDAc9hyc34xxXKRm7'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Snackbar
          open={state.open}
          onClose={handleClose}
          TransitionComponent={state.Transition}
          message='Únete'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          key={state.Transition.name}
          action={action}
        />
      </a>
    </div>
  )
}
