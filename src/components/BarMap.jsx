/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import '../assets/bar.css'
import { React, useContext, useState, useEffect } from 'react'
import { PlacesContext } from '../context'
import { ModalContext } from '../context/modal/ModalContext'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Chip from '@mui/material/Chip'
export const BarMap = ({ mapRef }) => {
  const { eventos, SetPlaces, placesFiltered } = useContext(PlacesContext)
  const { SetEvento } = useContext(ModalContext)
  let [eventosFiltered, setEventosFiltered] = useState(eventos)
  const [fechaActual, setFechaActual] = useState('')
  const [variantChip, setVariantChip] = useState('outlined')
  useEffect(() => {
    setEventosFiltered(eventos)
    setFechaActual(obtenerFechaActualEnFormato())
  }, [eventos])
  const obtenerFechaActualEnFormato = () => {
    const fecha = new Date()
    const año = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, '0') // Añade ceros a la izquierda si es necesario
    const dia = String(fecha.getDate()).padStart(2, '0') // Añade ceros a la izquierda si es necesario
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
    flyToUserLocation(evento.coordinates)
  }
  const flyToUserLocation = (coordinates) => {
    console.log(mapRef)
    console.log(coordinates)
    if (mapRef.current) {
      mapRef.current.flyTo(coordinates, 18) // Cambia 15 al nivel de zoom deseado
    }
  }
  const changeFilterMunicipio = (event) => {
    const selectedValue = event.target.value
    if (selectedValue === '') {
      setEventosFiltered(eventos)
    } else {
      eventosFiltered = eventos.filter(evento => evento.municipio === selectedValue)
      setEventosFiltered(eventosFiltered)
      console.log(eventosFiltered)
    }
  }
  const showMenu = (toggleId, navbarId) => {
    const toggle = document.getElementById(toggleId)
    const navbar = document.getElementById(navbarId)
    if (toggle && navbar) {
      navbar.classList.toggle('show-menu')
      toggle.classList.toggle('rotate-icon')
    }
  }
  const handleClick = () => {
    if (variantChip === 'outlined') {
      setVariantChip('filled')
      eventosFiltered = eventos.filter(evento => {
        console.log(evento.date > fechaActual)
        return evento.date == fechaActual
      })
      setEventosFiltered(eventosFiltered)
    } else {
      setEventosFiltered(eventos)
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
        <div className='logo-geo' onClick={() => showMenu('bar-toggle', 'bar')}>
          <img src='isotipo-1.png' alt='img' className='' />
          <span className='bar__logo-name'>GeoGuía</span>
        </div>
        <div className='bar__list'>
          <select defaultValue='' className='custom-select bar__link' onChange={changeFilterMunicipio}>
            <option value=''>Todos</option>
            <option value='MARINILLA'>MARINILLA</option>
            <option value='LA CEJA'>LA CEJA</option>
          </select>
          <Chip className='chipBar' label='¡Hoy!' color='primary' variant={variantChip} onClick={handleClick} />
          {
      eventosFiltered
        .map((evento, index) => {
          if ((evento == '') || (evento.date < fechaActual)) { /* empty */ } else {
            return (
              <div key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea onClick={() => openModal(evento)}>
                    <CardMedia
                      component='img'
                      image={evento.urlImagen}
                      style={{ height: 'auto', width: '100%', maxWidth: '300px', maxHeiht: '100px', display: 'block', objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography color='text.secondary' style={{ padding: '1px' }}>
                        <strong> {evento.eventName ? evento.eventName.charAt(0).toUpperCase() + evento.eventName.slice(1).toLowerCase() : ''}</strong>
                      </Typography>
                      <Typography variant='' color='text.secondary'>
                        <strong>Lugar:</strong> {evento.lugar}
                        <br />
                        <strong>Fecha:</strong> {evento.date == fechaActual
                          ? (
                            <Chip label='¡Evento hoy!' color='success' size='small' />
                            )
                          : evento.date}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>

            )
          }
        })
      }
          {
          eventosFiltered.length === 0
            ? (
              <div>
                <h1>No hay eventos para mostrar</h1>
              </div>
              )
            : null
        }
          <div>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  style={{ height: 'auto', width: '100%', maxWidth: '300px', maxHeiht: '100px', display: 'block', objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography color='text.secondary' style={{ padding: '1px' }}>
                    <strong> </strong>
                  </Typography>
                  <Typography variant='' color='text.secondary'>
                    <strong> </strong>
                    <br />
                    <br />
                    <br />
                    <strong> </strong>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </div>
      </nav>
    </div>
  )
}
