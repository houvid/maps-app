/* eslint-disable jsx-a11y/anchor-is-valid */
import '../assets/bar.css'
import { useNavigate } from 'react-router-dom'
import { React, useContext } from 'react'
import { PlacesContext } from '../context'
export const BarMap = () => {
  const { places } = useContext(PlacesContext)
  const navigate = useNavigate()
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

  const goLink = (route) => {
    navigate(route)
  }

  return (

    <div className='bar' id='bar'>
      <nav className='bar__content' id='barbar'>
        <div className='bar__toggle' id='bar-toggle' onClick={() => showMenu('bar-toggle', 'bar')}>
          <i className='bx bx-chevron-right' />
        </div>
        <a href='/' className='bar__logo' target='_blank'>
          <i className='bx bxs-compass' />
          <span className='bar__logo-name'>GeoGuía</span>
        </a>
        <div className='bar__list'>
          <select defaultValue='' className='custom-select'>
            <option value=''>Todos</option>
            <option value='Interes Cultural'>Interes Cultural</option>
            <option value='museo'>Museos</option>
            {/* Agrega otras opciones de filtro según tus necesidades */}
          </select>
          {
      places
        .map((place, index) => {
          return (
            <div key={index}>
              <a href='#' className='bar__link' onClick={() => goLink('/administration')}>
                <i className='bx bx-grid-alt' />
                <img src={place.properties?.urlImagen} alt='img' className='' style={{ width: '50px', height: '50px' }} />

                <span className='bar__name'>{place.properties.name}</span>
              </a>
            </div>

          )
        })
        }
          <a href='#' className='bar__link active-link' onClick={() => goLink('/administration')}>
            <i className='bx bx-grid-alt' />
            <span className='bar__name'>Inicioaaaaaaaa</span>
          </a>
        </div>
      </nav>
    </div>
  )
}
