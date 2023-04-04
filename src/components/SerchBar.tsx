import { ChangeEvent, useContext, useRef } from 'react'
import { PlacesContext } from '../context'
import { SearchResuls } from './SearchResults'

export const SearchBar = () => {
  const { searchPlacesByTerm, SetPlacesInit } = useContext(PlacesContext)
  const debounceRef = useRef<NodeJS.Timeout>()

  const onQueryChange = (event:ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      // TODO:
      searchPlacesByTerm(event.target.value)
      SetPlacesInit()
      console.log('debunced value ' + event.target.value)
    }, 350)
  }

  return (
    <div className='search-container'>
      <input
        type='text'
        className='form-control'
        placeholder='Buscar lugar...'
        onChange={onQueryChange}
      />

      <SearchResuls />
    </div>
  )
}
