/* eslint-disable jsx-a11y/anchor-is-valid */
import '../assets/bar.css'
import { React, useContext } from 'react'
import { PlacesContext } from '../context'

export const BarMap = () => {
  const { placesFiltered } = useContext(PlacesContext)
  const linkColor = document.querySelectorAll('.nav__link')

  function colorLink () {
    linkColor.forEach(l => l.classList.remove('active-link'))
    this.classList.add('active-link')
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
      placesFiltered
        .map((place, index) => {
          return (
            <div key={index} className='bar__link'>
              <img src={place.properties?.urlImagen} alt='img' className='' style={{ borderRadius: '10px', height: '90px', width: 'auto', maxWidth: '70px', display: 'block', objectFit: 'cover' }} />
              <span className='bar__name'>{place.properties.name.charAt(0).toUpperCase() + place.properties.name.slice(1).toLowerCase()}</span>

            </div>

          )
        })
        }
        </div>
      </nav>
    </div>
  )
}
