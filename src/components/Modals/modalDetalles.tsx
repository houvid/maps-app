import { useContext, useState } from 'react'
import '../../assets/Modal.css'
import { ModalContext } from '../../context/modal/ModalContext'
import { Modal } from 'react-bootstrap'
import { FaStopwatch, FaInfoCircle, FaIdCard, FaArrowRight } from 'react-icons/fa'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
export const ModalDetalles = () => {
  const { SetStateModal, SetStateModalEvent, place, stateModal, SetEvento } = useContext(ModalContext)
  const [toggleState, setToggleState] = useState(0)
  const toggleTab = (index: number) => {
    setToggleState(index)
  }
  const closeModal = () => {
    SetStateModal(false)
  }
  const openModalEvento = (evento: any) => {
    SetEvento(evento)
    SetStateModalEvent(true)
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }))
  return (
    <Modal show={stateModal} onHide={closeModal} className='contenedorPrincipalModal' styles={styles.modalContainer} dialogClassName='modal-right'>
      <div className='modal__close close-modal' title='Close' onClick={closeModal}>
        <i className='bx bx-x' />
      </div>
      <div className='slider'>
        <img src={place.properties?.urlImagen} alt='' className='modal__img' />
        <img src={place.properties?.urlImagen} alt='' className='modal__img' />
        <img src={place.properties?.urlImagen} alt='' className='modal__img' />
        <img src={place.properties?.urlImagen} alt='' className='modal__img' />
      </div>
      <span className='modal__title'>{place.properties?.name}</span>
      <div className='contenedor'>
        <ul className='ul'>
          <li className={toggleState === 0 ? 'li activo' : 'li'} onClick={() => toggleTab(0)}> <p className='text-center'><FaInfoCircle /><br /> Información </p></li>
          <li className={toggleState === 1 ? 'li activo' : 'li'} onClick={() => toggleTab(1)}><p className='text-center'><FaStopwatch /> <br />  Eventos </p> </li>
          <li className={toggleState === 2 ? 'li activo' : 'li'} onClick={() => toggleTab(2)}><p className='text-center'><FaIdCard /> <br />  Recomendaciones </p></li>
        </ul>
        <div className='subcontenedor'>
          <div className={toggleState === 0 ? 'bloque activo' : 'bloque'}>
            <p className='modal__description'>{place.properties?.descripcion}</p>
          </div>
          {/* EVENTOS */}
          <div className={toggleState === 1 ? 'bloque activo' : 'bloque'}>
            {place.properties && place.properties.Eventos && (
              <div>
                {place.properties.Eventos.map((evento, index) => (
                  <Box key={index} sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }} className='stackEventos'>
                    <Item
                      sx={{
                        my: 1,
                        mx: 'auto',
                        p: 2
                      }}
                    >
                      <Stack spacing={2} direction='row' alignItems='center'>
                        <Typography noWrap>{evento.eventName}</Typography>
                        <Typography noWrap>{evento.date?.toString()}</Typography>
                        <Avatar style={{ backgroundColor: '#286cff', paddingRight: '0.1rem' }} onClick={() => openModalEvento(evento)}><FaArrowRight /></Avatar>
                      </Stack>
                    </Item>
                  </Box>
                ))}
              </div>
            )}
          </div>
          <div className={toggleState === 2 ? 'bloque activo' : 'bloque'}>
            <p className='modal__description'>
              Investiga sobre el sitio turístico que deseas visitar. Averigua su ubicación, horarios de apertura, tarifas, atracciones principales y cualquier requisito especial que debas tener en cuenta.
              <br />
              Verifica la información de transporte para llegar al sitio turístico. Puedes investigar las opciones de transporte público, alquilar un vehículo o considerar contratar servicios de transporte turístico.<br />

              Comprueba si se requiere algún tipo de reserva o boleto de entrada anticipada para evitar esperas o decepciones.

              Consulta opiniones y reseñas de otros turistas sobre el sitio turístico. Esto puede darte una idea de qué esperar y ayudarte a planificar tu visita de manera más efectiva.<br />

              Prepárate para el clima y las condiciones locales. Asegúrate de llevar ropa adecuada, calzado cómodo y otros elementos necesarios según las características del lugar que visitarás.<br />
            </p>
          </div>
        </div>
      </div>
      <Modal.Footer>
        <button className='modal__button-link close-modal' onClick={closeModal}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
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
