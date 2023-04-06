import { SearchResuls } from './SearchResults'
import { SelectMunicipios } from '.'

export const SearchBar = () => {
  return (
    <div className='search-container'>
      <SelectMunicipios />

      <SearchResuls />
    </div>
  )
}
