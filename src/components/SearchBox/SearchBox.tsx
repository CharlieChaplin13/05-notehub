import css from './SearchBox.module.css'

interface SearchBoxProps {
    value: string
    onSearch: (value: string) => void
}

export default function SearchBox ({value, onSearch}: SearchBoxProps) {
    return(
      <input 
        className={css.input}
        type="text"
        onChange={(event) => onSearch(event.target.value)}
        autoComplete="off"
        value={value}
        placeholder="Search notes"
        autoFocus
      />
    )
}


