import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { NavBar } from '../components/NavBar'
import { addFeature } from '../firebase/firebase'

export const FormNewFeature = () => {
  const auth = useAuth()
  const userEmail = auth.user.email
  const [formData, setFormData] = useState({
    properties: {
      name: '',
      urlImagen: ''
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

  const handleInputChangeName = (event: any) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      properties: { ...formData.properties, [name]: value }
    })
    console.log(formData)
  }
  const handleInputChangeUrlImagen = (event: any) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      properties: { ...formData.properties, [name]: value }
    })
    console.log(formData)
  }
  const handleInputChangeDescripcion = (event: any) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      properties: { ...formData.properties, [name]: value }
    })
    console.log(formData)
  }
  const handleInputChangeCategoria = (event: any) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      properties: { ...formData.properties, [name]: value }
    })
    console.log(formData)
  }
  const handleCoordinatesChange = (event: any) => {
    const { name, value } = event.target
    const newCoordinates = formData.geometry.coordinates.slice()
    newCoordinates[name] = parseFloat(value)
    setFormData({
      ...formData,
      geometry: { ...formData.geometry, coordinates: newCoordinates }
    })
    console.log(formData)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log(formData)
    addFeature(formData)
    // Aquí puedes enviar los  datos del formulario a un servidor
    // TODO: esperar respuesta, toast y borrar contenido del formulario
  }

  if (!userEmail) {
    return (<div> <span className='loader' /> </div>)
  }
  return (

    <div>
      <NavBar />
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
