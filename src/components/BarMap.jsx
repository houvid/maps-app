/* eslint-disable jsx-a11y/anchor-is-valid */
import '../assets/bar.css'
import { React, useContext } from 'react'
import { PlacesContext } from '../context'
import { ModalContext } from '../context/modal/ModalContext'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
export const BarMap = () => {
  const { eventos } = useContext(PlacesContext)
  const { SetStateModalEvent, SetEvento } = useContext(ModalContext)

  const linkColor = document.querySelectorAll('.nav__link')

  function colorLink () {
    linkColor.forEach(l => l.classList.remove('active-link'))
    this.classList.add('active-link')
  }
  const openModal = (evento) => {
    SetEvento(evento)
    SetStateModalEvent(true)
  }

  linkColor.forEach(l => l.addEventListener('click', colorLink))
  const showMenu = (toggleId, navbarId) => {
    const toggle = document.getElementById(toggleId)
    const navbar = document.getElementById(navbarId)
    if (toggle && navbar) {
      navbar.classList.toggle('show-menu')
      toggle.classList.toggle('rotate-icon')
    }
  }
  return (

    <div className='bar' id='bar'>
      <nav className='bar__content' id='barbar'>
        <div className='bar__toggle' id='bar-toggle' onClick={() => showMenu('bar-toggle', 'bar')}>
          <i className='bx bx-chevron-right' />
        </div>
        <div className='logo-geo' onClick={() => showMenu('bar-toggle', 'bar')}>
          <img src='isotipo-1.png' alt='img' className='' />
          <span className='bar__logo-name'>GeoGuía</span>
        </div>
        <div className='bar__list'>
          <select defaultValue='' className='custom-select bar__link'>
            <option value=''>Todos</option>
            <option value='Interes Cultural'>Interes Cultural</option>
            <option value='museo'>Museos</option>
            {/* Agrega otras opciones de filtro según tus necesidades */}
          </select>

          {
      eventos
        // eslint-disable-next-line array-callback-return
        .map((evento, index) => {
          // eslint-disable-next-line eqeqeq
          if (evento == '') { /* empty */ } else {
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
                        <h5> <strong>{evento.eventName.charAt(0).toUpperCase() + evento.eventName.slice(1).toLowerCase()}</strong> </h5>
                      </Typography>
                      <Typography variant='' color='text.secondary'>
                        <strong>Lugar:</strong> Teatro principal
                        <br />
                        <strong>Fecha:</strong> {evento.date}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>

            )
          }
        })
        }
        </div>
      </nav>
    </div>
  )
}
