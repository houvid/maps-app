import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { NavBar } from '../components/NavBar'
import { addFeature, uploadImage } from '../firebase/firebase'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

export const FormNewFeature = () => {
  const auth = useAuth()
  const userEmail = auth.user.email
  const [formData, setFormData] = useState({
    properties: {
      name: '',
      urlImagen: '',
      Eventos: ''
    },
    dataAdicional: {
      descripcion: '',
      categoria: ''
    },
    geometry: {
      type: 'Point',
      coordinates: [0, 0]
    },
    type: 'Feature'
  })
  const [show, setShow] = useState(false)
  const [file, setFile] = useState(null)

  const handleInputChangeName = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      properties: { ...formData.properties, [name]: value }
    })
  }
  const handleInputChangeUrlImagen = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      properties: { ...formData.properties, [name]: value }
    })
  }
  const handleInputChangeDescripcion = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      properties: { ...formData.properties, [name]: value }
    })
  }
  const handleInputChangeCategoria = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      properties: { ...formData.properties, [name]: value }
    })
  }
  const handleCoordinatesChange = (event) => {
    const { name, value } = event.target
    const newCoordinates = formData.geometry.coordinates.slice()
    newCoordinates[name] = parseFloat(value)
    setFormData({
      ...formData,
      geometry: { ...formData.geometry, coordinates: newCoordinates }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const responseAdd = await addFeature(formData)
    if (responseAdd === 'ok') {
      setShow(true)
      setFormData({
        properties: {
          name: '',
          urlImagen: '',
          Eventos: ''
        },
        dataAdicional: {
          descripcion: '',
          categoria: ''
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      })
      setFile(null)
    } else {
      console.log('error')
    }

    // TODO: esperar respuesta, toast y borrar contenido del formulario
  }
  const subirArchivo = async () => {
    try {
      const result = await uploadImage(file, 'lugares')
      formData.properties.urlImagen = result
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  if (!userEmail) {
    return (<div> <span className='loader' /> </div>)
  }
  return (

    <div>
      <NavBar />
      <ToastContainer
        bg='success'
        className='p-3'
        position='top-end'
        style={{ zIndex: 1 }}
      >
        <Toast onClose={() => setShow(false)} show={show} delay={7000} autohide>
          <Toast.Header style={{ backgroundColor: '#79c15a', color: '#fff' }}>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded me-2 success'
              alt=''
            />
            <strong className='me-auto'>¡Registro Exitoso!</strong>
            <small>0 secs ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, acabas de realizar un registro de un nuevo punto dentro del mapa!</Toast.Body>
        </Toast>
      </ToastContainer>
      <h1 className='text-center'>Nuevo Registro</h1>
      <div className='container section'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Nombre:</label>
            <input
              type='text'
              id='name'
              name='name'
              className='form-control'
              value={formData.properties.name}
              onChange={handleInputChangeName}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Link Imagen:</label>
            <input
              type='text'
              id='urlImagen'
              name='urlImagen'
              className='form-control'
              value={formData.properties.urlImagen}
              onChange={handleInputChangeUrlImagen}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Imagen: </label>
            <input
              type='file'
              id='imagen'
              name='imagen'
              className='form-control'
              onChange={e => {
                const selectedFile = e.target.files?.[0]
                if (selectedFile) {
                  setFile(selectedFile)
                }
              }}
            />
            <span className='btn btn-primary' onClick={e => { e.preventDefault(); return subirArchivo() }}>
              Subir
            </span>
          </div>
          <div className='form-group'>
            <label htmlFor='categoria'>Categoria:</label>
            <select name='categoria' id='categoria' className='form-control' onChange={handleInputChangeCategoria}>
              <option value='museo'> Museo</option>
              <option value='Interes Cultural'> Interes Cultural</option>
              <option value='Restaurante'> Restaurante</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='descripcion'>Descripcion:</label>
            <input
              type='text'
              id='descripcion'
              name='descripcion'
              className='form-control'
              onChange={handleInputChangeDescripcion}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='lat'>Latitud:</label>
            <input
              type='text'
              id='lat'
              name='1'
              className='form-control'
              value={formData.geometry.coordinates[1]}
              onChange={handleCoordinatesChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='lng'>Longitud:</label>
            <input
              type='text'
              id='lng'
              name='0'
              className='form-control'
              value={formData.geometry.coordinates[0]}
              onChange={handleCoordinatesChange}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}
