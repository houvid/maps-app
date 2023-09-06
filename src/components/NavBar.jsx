/* eslint-disable jsx-a11y/anchor-is-valid */
import '../assets/nav.css'
import { useNavigate } from 'react-router-dom'

export const NavBar = () => {
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
    <div className='nav' id='nav'>
      <nav className='nav__content' id='navbar'>
        <div className='nav__toggle' id='nav-toggle' onClick={() => showMenu('nav-toggle', 'nav')}>
          <i className='bx bx-chevron-right' />
        </div>
        <a href='/' className='nav__logo' target='_blank'>
          <img src='isotipo-1.png' alt='img' className='' />
          <span className='nav__logo-name'>GeoGuía</span>
        </a>
        <div className='nav__list'>
          <a href='#' className='nav__link active-link' onClick={() => goLink('/administration')}>
            <i className='bx bx-grid-alt' />
            <span className='nav__name'>Inicio</span>
          </a>
          <a href='#' className='nav__link' onClick={() => goLink('/formNewFeature')}>
            <i className='bx bx-location-plus' />
            <span className='nav__name'>Nuevo Punto</span>
          </a>
          <a href='#' className='nav__link' onClick={() => goLink('/features')}>
            <i className='bx bx-current-location' />
            <span className='nav__name'>Puntos</span>
          </a>
          <a href='#' className='nav__link' onClick={() => goLink('/charts')}>
            <i className='bx bx-bar-chart-square' />
            <span className='nav__name'>Estadisticas</span>
          </a>
        </div>
      </nav>
    </div>
  )
}
