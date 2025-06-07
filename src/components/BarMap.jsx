/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import '../assets/bar.css'
import { React, useContext, useState, useEffect } from 'react'
import { PlacesContext } from '../context'
import { ModalContext } from '../context/modal/ModalContext'
import { EventCard } from './EventCard'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const BarMap = ({ mapRef }) => {
  const { eventos, SetPlaces, placesFiltered } = useContext(PlacesContext)
  const { SetEvento } = useContext(ModalContext)
  const [eventosFiltered, setEventosFiltered] = useState(eventos)
  const [fechaActual, setFechaActual] = useState('')
  const [variantChip, setVariantChip] = useState('outlined')
  const [selectedMunicipio, setSelectedMunicipio] = useState({ label: 'Todos', value: '' })

  const municipios = [
    { label: 'Todos', value: '' },
    { label: 'Marinilla', value: 'MARINILLA' },
    { label: 'La Ceja', value: 'LA CEJA' },
    { label: 'El Santuario', value: 'EL SANTUARIO' },
    { label: 'El Carmen de Víboral', value: 'EL CARMEN' },
    { label: 'El Peñol', value: 'EL PEÑOL' },
    { label: 'Rionegro', value: 'RIONEGRO' }
  ]
  
  useEffect(() => {
    const fechaHoy = obtenerFechaActualEnFormato()
    setFechaActual(fechaHoy)
    
    // Apply default filter (today onwards) when events change
    const filtered = eventos.filter(evento => {
      const eventoDate = new Date(evento.date)
      const today = new Date(fechaHoy)
      return eventoDate >= today
    })
    setEventosFiltered(filtered)
  }, [eventos])

  const obtenerFechaActualEnFormato = () => {
    const fecha = new Date()
    const año = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, '0') // Añade ceros a la izquierda si es necesario
    const dia = String(fecha.getDate()).padStart(2, '0')
    const fechaEnFormato = `${año}-${mes}-${dia}`
    console.log(fechaEnFormato)
    return fechaEnFormato
  }

  const openModal = (evento) => {
    SetEvento(evento)
    const placesFiltrado = placesFiltered.filter(place => {
      const filtrado = place.geometry.coordinates[0] == evento.coordinates[1]
      console.log('place ' + place.geometry.coordinates[0])
      console.log('evento ' + evento.coordinates[1])
      console.log(filtrado)
      return filtrado
    })
    showMenu('bar-toggle', 'bar')
    console.log(placesFiltrado)
    SetPlaces(placesFiltrado)
    flyToUserLocation(evento.coordinates, 18)
  }

  const flyToUserLocation = (coordinates, zoom) => {
    console.log(mapRef)
    console.log(coordinates)
    if (mapRef.current) {
      mapRef.current.flyTo(coordinates, zoom) // Cambia 15 al nivel de zoom deseado
    }
  }

  const changeFilterMunicipio = (event, newValue) => {
    setSelectedMunicipio(newValue)
    const selectedValue = newValue ? newValue.value : ''

    // Always filter events from today onwards first
    let filtered = eventos.filter(evento => {
      const eventoDate = new Date(evento.date)
      const today = new Date(fechaActual)
      return eventoDate >= today
    })

    // Then filter by municipality if selected
    if (selectedValue !== '') {
      filtered = filtered.filter(evento => evento.municipio === selectedValue)
    }
    
    setEventosFiltered(filtered)
    
    switch (selectedValue) {
      case 'MARINILLA':
        flyToUserLocation([6.17382554743092, -75.33465274285228], 15)
        break
      case 'RIONEGRO':
        flyToUserLocation([6.155522715779031, -75.3735477840812], 15)
        break
      case 'LA CEJA':
        flyToUserLocation([6.031335433247932, -75.43162073585653], 15)
        break
      case 'EL PEÑOL':
        flyToUserLocation([6.216673196136062, -75.24352972448737], 15)
        break
      case 'EL CARMEN':
        flyToUserLocation([6.08379451501892, -75.33540014448175], 15)
        break
      case 'EL SANTUARIO':
        flyToUserLocation([6.139423131774998, -75.26560039189918], 15)
        break
      default:
        break
    }
    console.log(filtered)
  }

  const showMenu = (toggleId, navbarId) => {
    const toggle = document.getElementById(toggleId)
    const navbar = document.getElementById(navbarId)
    const barbar = document.getElementById('logo-geo')
    barbar.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    })
    console.log('scroll')
    if (toggle && navbar) {
      navbar.classList.toggle('show-menu')
      toggle.classList.toggle('rotate-icon')
    }
  }

  const handleClick = () => {
    if (variantChip === 'outlined') {
      setVariantChip('filled')
      // Filter only today's events (from events that are today onwards)
      const todayFiltered = eventos.filter(evento => {
        const eventoDate = new Date(evento.date)
        const today = new Date(fechaActual)
        return eventoDate >= today && evento.date === fechaActual
      })
      setEventosFiltered(todayFiltered)
    } else {
      // Reset to show all events from today onwards
      const filtered = eventos.filter(evento => {
        const eventoDate = new Date(evento.date)
        const today = new Date(fechaActual)
        return eventoDate >= today
      })
      setEventosFiltered(filtered)
      SetPlaces(placesFiltered)
      setVariantChip('outlined')
    }
    console.info('You clicked the Chip.')
  }

  return (
    <div className='bar' id='bar'>
      <nav className='bar__content' id='barbar'>
        <div className='bar__toggle' id='bar-toggle' onClick={() => showMenu('bar-toggle', 'bar')}>
          <i className='bx bx-chevron-right' width='60' />
        </div>
        <div className='logo-geo' id='logo-geo' onClick={() => showMenu('bar-toggle', 'bar')}>
          <img src='isotipo-1.png' alt='img' className='' />
          <span className='bar__logo-name'>GeoGuía</span>
        </div>
        <div className='bar__list'>
          <Autocomplete
            value={selectedMunicipio}
            onChange={changeFilterMunicipio}
            options={municipios}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Selecciona un municipio...'
                variant='outlined'
                size='small'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e0e0e0'
                    },
                    '&:hover fieldset': {
                      borderColor: '#2667FF'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2667FF'
                    }
                  },
                  '& .MuiInputBase-input': {
                    '&::placeholder': {
                      color: '#999',
                      opacity: 1
                    }
                  }
                }}
              />
            )}
            sx={{
              width: '100%',
              marginBottom: 2,
              '& .MuiAutocomplete-popupIndicator': {
                color: '#2667FF'
              }
            }}
            clearOnEscape
            clearText='Limpiar'
            noOptionsText='No hay opciones'
            openText='Abrir'
          />
          
          <Chip 
            className='chipBar' 
            label='¡Hoy!' 
            color='primary' 
            variant={variantChip} 
            onClick={handleClick}
            sx={{ marginBottom: 2 }}
          />

          {/* Events List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {eventosFiltered.length > 0 ? (
              eventosFiltered.map((evento, index) => {
                if (evento && evento.eventName) {
                  const isToday = evento.date === fechaActual
                  return (
                    <EventCard
                      key={index}
                      evento={evento}
                      onClick={() => openModal(evento)}
                      isToday={isToday}
                    />
                  )
                }
                return null
              })
            ) : (
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 4,
                  px: 2
                }}
              >
                <Typography 
                  variant="h6" 
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  No hay eventos disponibles
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.disabled"
                >
                  Por ahora no tenemos agenda con estos parámetros
                </Typography>
              </Box>
            )}
          </Box>
        </div>
      </nav>
    </div>
  )
}
