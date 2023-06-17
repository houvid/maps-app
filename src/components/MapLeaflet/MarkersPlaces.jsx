import { React, useContext, useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { PlacesContext } from '../../context'
import { iconMarkerMuseo, iconMarkerArbelaez, iconMarkerCapilla, iconMarkerCruces, iconMarkerArqueologia, iconMarkerIndepende } from '../IconLocation'

export const MarkersPlaces = ({ openModal, setPlaceToRoute }) => {
  const { placesFiltered } = useContext(PlacesContext)

  useEffect(() => {

  }, [placesFiltered])
  const homologarIcon = (placeName) => {
    switch (placeName) {
      case 'Museo':
        return iconMarkerMuseo
      case 'FÁBRICA DE GUITARRAS LOS ARBELÁEZ':
        return iconMarkerArbelaez
      case 'CAPILLA DE JESÚS NAZARENO':
        return iconMarkerCapilla
      case 'COLECCIÓN DE CRUCES, CRISTOS Y CRUCIFIJOS,':
        return iconMarkerCruces
      case 'SALA DE ARQUEOLOGÍA':
        return iconMarkerArqueologia
      case 'SALA DE HISTORIA E INDEPENDENCIA':
        return iconMarkerIndepende
      default:
        return iconMarkerArbelaez
    }
  }

  return (
    placesFiltered
      .map((place, index) => {
        const icon = homologarIcon(place.properties?.name)
        return (
          <Marker key={index} id={index} position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]} icon={icon}>
            <Popup className='custom-popup'>
              <div>
                <img src={place.properties?.urlImagen} alt='img' className='' />
                <p className='title'>
                  <strong>{place.properties.name} </strong>
                </p>
                <p>{place.properties.descripcion.slice(0, 60)} <strong onClick={() => openModal(place)}>  Ver más...  </strong></p>
                <button className='btn' onClick={() => openModal(place)}> Ver mas detalles</button>
                <button className='btn btn-primary' onClick={() => setPlaceToRoute(place)}> Ir</button>
              </div>
            </Popup>
          </Marker>
        )
      })
  )
}
