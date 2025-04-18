import { useState, useMemo } from 'react'
import { debounce } from '@/utils/debounce'
import UiInput from '@/components/ui/UiInput'
import UiButton from '@/components/ui/UiButton'

interface SearchInputProps {
  onSearch: (query: string) => void
  placeholder: string
}

export default function SearchInput({ onSearch, placeholder }: SearchInputProps) {
  const [query, setQuery] = useState('')

  const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value.trim() === '') {
      onSearch('')
    } else {
      debouncedSearch(value)
    }
  }

  const handleSearch = () => {
    onSearch(query)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <>
      <UiInput
        value={query}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleSearch}
      />
      <UiButton buttonText="Очистить" onClick={handleClear} />
    </>
  )
}
