import { ChangeEvent, useRef } from 'react'
// import { SearchResuls } from './SearchResults'

export const SearchBar = () => {
  const debounceRef = useRef<NodeJS.Timeout>()

  const onQueryChange = (event:ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      // TODO:

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

      {/* <SearchResuls /> */}
    </div>
  )
}
