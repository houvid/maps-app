import { ChangeEvent, useContext } from 'react'
import datosMunicipios from '../apis/MunicipiosAntioquia.json'
import { Municipio } from '../interfaces/municipio'
import { MapContext } from '../context'

export const SelectMunicipios = () => {
  const { map } = useContext(MapContext)
  const nuevosDatos: Municipio[] = datosMunicipios

  const onQueryChange = (event:ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value)
    const numerosArrayString = event.target.value.split(',')
    console.log(numerosArrayString)
    const numberArray = numerosArrayString.map(parseFloat)
    const centerValue = numberArray
    console.log(centerValue)
    map?.flyTo({
      zoom: 15,
      center: centerValue
    })
    const boton = document.getElementById('cerrar')
    boton?.click()

    return event.target.value
  }
  return (
    <select className='form-select' aria-label='Default select example' onChange={onQueryChange}>
      <option> Selecciona un municipio </option>
      {nuevosDatos.map((dato) => (
        <option key={dato.id} value={dato.LONGITUD + ',' + dato.LATITUD}>{dato.Nombre}</option>
      ))}
    </select>
  )
}
