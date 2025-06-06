import { BtnMyLocation, MapViewLeaf, ReactLogo, MobileBarMap } from '../components'
import { BarMap } from '../components/BarMap'
import { useRef, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'
import { useMediaQuery, useTheme } from '@mui/material'

export const HomeScreen = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

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
      {/* Mobile version */}
      {isMobile
        ? <MobileBarMap mapRef={mapRef} />
        : <BarMap mapRef={mapRef} />}

      <MapViewLeaf mapRef={mapRef} />
      <BtnMyLocation />
      <ReactLogo />

      {/* Only show original snackbar on desktop */}
      {!isMobile && (
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
      )}
    </div>
  )
}
