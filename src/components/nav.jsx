/* eslint-disable jsx-a11y/anchor-is-valid */
export const Nav = () => {
  const linkColor = document.querySelectorAll('.nav__link')

  function colorLink () {
    linkColor.forEach(l => l.classList.remove('active-link'))
    this.classList.add('active-link')
  }

  linkColor.forEach(l => l.addEventListener('click', colorLink))

  /* =============== SHOW HIDDEN MENU =============== */
  const showMenu = (toggleId, navbarId) => {
    const toggle = document.getElementById(toggleId)
    const navbar = document.getElementById(navbarId)

    if (toggle && navbar) {
      toggle.addEventListener('click', () => {
        /* Show menu */
        navbar.classList.toggle('show-menu')
        /* Rotate toggle icon */
        toggle.classList.toggle('rotate-icon')
      })
    }
  }
  showMenu('nav-toggle', 'nav')

  return (
    <div className='nav' id='nav'>
      <nav className='nav__content'>
        <div className='nav__toggle' id='nav-toggle'>
          <i className='bx bx-chevron-right' />
        </div>
        <a href='#' className='nav__logo'>
          <i className='bx bxs-heart' />
          <span className='nav__logo-name'>Healthy</span>
        </a>
        <div className='nav__list'>
          <a href='#' className='nav__link active-link'>
            <i className='bx bx-grid-alt' />
            <span className='nav__name'>Dashboard</span>
          </a>
          <a href='#' className='nav__link'>
            <i className='bx bx-file' />
            <span className='nav__name'>Appointments</span>
          </a>
          <a href='#' className='nav__link'>
            <i className='bx bx-envelope' />
            <span className='nav__name'>Messages</span>
          </a>
          <a href='#' className='nav__link'>
            <i className='bx bx-bar-chart-square' />
            <span className='nav__name'>Statistic</span>
          </a>
          <a href='#' className='nav__link'>
            <i className='bx bx-cog' />
            <span className='nav__name'>Settings</span>
          </a>
        </div>
      </nav>
    </div>
  )
}
