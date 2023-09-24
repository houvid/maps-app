import { React, useContext, useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { PlacesContext, ModalContext } from '../../context'
import { iconMarkerMuseo, iconMarkerArbelaez, iconMarkerBlue, iconMarkerCapilla, iconMarkerCruces, iconMarkerArqueologia, iconMarkerIndepende, iconMarkerGreen } from '../IconLocation'
import { FaArrowRight } from 'react-icons/fa'
export const MarkersPlaces = ({ openModal, setPlaceToRoute, openModalEvento }) => {
  const { places } = useContext(PlacesContext)
  const { evento } = useContext(ModalContext)
  useEffect(() => {

  }, [places])
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
        return iconMarkerBlue
    }
  }

  return (
    places
      .map((place, index) => {
        const icon = homologarIcon(place.properties?.name)
        const idMarker = index + 'marker'
        console.log('length' + places.length)
        if (places.length === 1) {
          return (
            <Marker key={index} id={idMarker} position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]} icon={iconMarkerGreen}>
              <Popup className='custom-popup leaflet-popup-content-wrapper'>
                <div>
                  <img src={evento.urlImagen} alt='img' className='' />
                  <h5 className='popup-title'>{evento.eventName} </h5>
                  <p className='popup-text'>{place.properties.descripcion.slice(0, 160)} <strong onClick={() => openModal(place)}>  Ver más...  </strong></p>
                  <button className=' boton-pop' onClick={() => openModalEvento(evento)}> Ver mas detalles</button>
                  <button className='btn btn-primary boton-pop' onClick={() => setPlaceToRoute(place)}> Ir <FaArrowRight /></button>
                </div>
              </Popup>
            </Marker>
          )
        } else {
          return (
            <Marker key={index} id={idMarker} position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]} icon={icon}>
              <Popup className='custom-popup leaflet-popup-content-wrapper'>
                <div>
                  <img src={place.properties?.urlImagen} alt='img' className='' />
                  <h5 className='popup-title'>
                    <strong>{place.properties.name} </strong>
                  </h5>
                  <p>{place.properties.descripcion.slice(0, 60)} <strong onClick={() => openModal(place)}>  Ver más...  </strong></p>
                  <button className=' boton-pop' onClick={() => openModal(place)}> Ver mas detalles</button>
                  <button className='btn btn-primary boton-pop' onClick={() => setPlaceToRoute(place)}> Ir <FaArrowRight /></button>
                </div>
              </Popup>
            </Marker>
          )
        }
      })
  )
}
