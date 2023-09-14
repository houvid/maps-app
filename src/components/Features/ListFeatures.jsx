/* eslint-disable no-unused-vars */
import { NavBar } from '../NavBar'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlacesProvider, PlacesContext } from '../../context'
import { ModalContext } from '../../context/modal/ModalContext'
import { ModalAddEvent } from '../Modals/modalAddEvent'

export const ListFeatures = () => {
  const { isLoading, userLocation, isLoadingPlaces, SetPlacesInit, places } = useContext(PlacesContext)
  const { SetStateModalEvent, SetStateModalAddEvent, SetPlace } = useContext(ModalContext)
  useEffect(() => {
    console.log(isLoading, userLocation, isLoadingPlaces)
    SetPlacesInit()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (isLoading || !userLocation || isLoadingPlaces) {
    return (
      <div className='backLoader loading-map d-flex justify-content-center aling-items-center'>
        <img src='logo-2 Blanco.png' alt='img' style={{ height: '170px', padding: '50px' }} />
        <span className='loader'> </span>
      </div>
    )
  }
  const openModal = (place) => {
    SetPlace(place)
    SetStateModalAddEvent(true)
  }
  console.log(places)
  return (
    <div>
      <div className='container section'>
        <h2 className='text-center'>(MODULO EN CONSTRUCCIÓN) ¡Estos son los registros que tenemos actualmente!</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Img</th>
                <th scope='col'>Nombre</th>
                <th scope='col'>Categoría</th>
                <th scope='col'>Img</th>
                <th scope='col'>Eventos</th>
              </tr>
            </thead>
            <tbody>
              {places.map((place, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{place.id}</td>
                  <td>{place.properties.name}</td>
                  <td>{place.properties.categoria}</td>
                  <td><img src={place.properties.urlImagen} alt='img' style={{ width: '100px' }} /> </td>
                  <td>
                    <button className='modal__button-link close-modal' onClick={() => openModal(place)}>
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <section style={styles.modal}>
            <ModalAddEvent />
          </section>
        </div>
      </div>
    </div>
  )
}
const styles = {
  modalContainer: {
    borderRadius: '1rem 1rem 0 0',
    position: 'absolute',
    top: '0',
    left: '0',
    buttom: '0',
    backgroundcolor: 'hsla(var(--hue), 18%, 75%, .8)',
    width: '100%',
    display: 'grid',
    alignitems: 'flex-end',
    transition: 'all .3s',
    zindex: 'var(--z-modal)',
    float: 'right'
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  '@media (max-width: 767px)': {
    modal: {
      height: '85%',
      bottom: 0,
      top: 'auto'
    }
  }
}
