import { SearchResuls } from './SearchResults'

export const SearchBar = () => {
  return (
    <div className='search-container'>
      <select defaultValue='' className='custom-select'>
        <option value=''>Todos</option>
        <option value='Interes Cultural'>Interes Cultural</option>
        <option value='museo'>Museos</option>
        {/* Agrega otras opciones de filtro según tus necesidades */}
      </select>

      <SearchResuls />
    </div>
  )
}
