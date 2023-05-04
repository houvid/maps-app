export const NavBar = () => {
  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          <i className='bi bi-flower1' />
          <span className='text-warning'>Mapa</span>
        </a>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#menu' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='menu'>
          <ul className='navbar-nav me-auto'>
            <li className='nav-item'>
              <a className='nav-link active' aria-current='page' href='#'>Inicio</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>Precios</a>
            </li>
            <li className='nav-item dropdown'>
              <a className='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                Servicios
              </a>
              <ul className='dropdown-menu bg-secondary' aria-labelledby='navbarDropdown'>
                <li><a className='dropdown-item' href='#'>Renta</a></li>
                <li><a className='dropdown-item' href='#'>Equipos</a></li><li /><li><a className='dropdown-item' href='#'>Networking</a></li>
              </ul>
            </li>
          </ul>
          <hr className='d-md-none text-white-50' />
          <ul className='navbar-nav  flex-row flex-wrap text-light'>
            <li className='nav-item col-6 col-md-auto p-3'>
              <i className='bi bi-twitter' />
              <small className='d-md-none ms-2'>Twitter</small>
            </li>
            <li className='nav-item col-6 col-md-auto p-3'>
              <i className='bi bi-github' />
              <small className='d-md-none ms-2'>GitHub</small>
            </li>
            <li className='nav-item col-6 col-md-auto p-3'>
              <i className='bi bi-whatsapp' />
              <small className='d-md-none ms-2'>WhatsApp</small>
            </li>
            <li className='nav-item col-6 col-md-auto p-3'>
              <i className='bi bi-facebook' />
              <small className='d-md-none ms-2'>Facebook</small>
            </li>
          </ul>
          {/* boton Informacion */}
          <form className='d-flex'>
            <button className='btn btn-outline-warning d-none d-md-inline-block ' type='submit'>Informacion</button>
            <button className='btn btn-outline-warning d-none d-md-inline-block ' type='submit'>Informacion</button>
          </form>
        </div>
      </div>
    </nav>
  )
}
