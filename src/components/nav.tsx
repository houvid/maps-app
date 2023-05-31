import { FaRegTimesCircle, FaSearch } from 'react-icons/fa'

export const Nav = () => {
  //     const onClick = () => {
  //     if (!isMapReady) throw new Error('Mapa no está listo')

  //     map?.flyTo({
  //       zoom: 14,
  //       center: userLocation
  //     })
  //   }

  return (
    <div className='nav'>
      <button className='btn btn-Ligth btnTopLeft' data-bs-toggle='offcanvas' data-bs-target='#intro'> <FaSearch /> </button>
      <div className='offcanvas offcanvas-start' id='intro'>
        <div className='offcanvas-header'>
          <div className='offcanvas-title'>
            <button
              className='btn btn-Light btnTopLeft' data-bs-dismiss='offcanvas'
              id='cerrar'
            >
              <FaRegTimesCircle />
            </button>
          </div>
        </div>
        <div className='offcanvas-body panel__header'>
          <h3> Selecciona un municipio</h3>
        </div>
      </div>
    </div>
  )
}
