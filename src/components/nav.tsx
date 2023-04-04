import { SelectMunicipios } from './'

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
      <button className='btn btn-success' data-bs-toggle='offcanvas' data-bs-target='#intro'> Abrir </button>
      <div className='offcanvas offcanvas-end' id='intro'>
        <div className='offcanvas-header'>
          <div className='offcanvas-title'>
            <button className='btn btn-warning' data-bs-dismiss='offcanvas' id='cerrar'> cerrar </button>
          </div>
        </div>
        <div className='offcanvas-body'>
          <SelectMunicipios />
        </div>
      </div>
    </div>
  )
}
