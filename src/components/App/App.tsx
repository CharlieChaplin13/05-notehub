import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchNotes } from '../../services/noteService'
import SearchBox from '../SearchBox/SearchBox'
import NoteList from '../NoteList/NoteList'
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Loader from '../Loader/Loader';
import EmptyState from '../EmptyState/EmptyState';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import css from "./App.module.css";


export default function App() {

  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateSearchQuery = useDebouncedCallback((value: string) => {
  setSearchQuery(value);
  setCurrentPage(1)
}, 300);

  const { data, isSuccess, isLoading, error, isError, isFetching } = useQuery({
    queryKey: [ 'notes', searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearchInput(value)
    updateSearchQuery(value)
  }

  const notesList = data?.notes ?? []
  const totalPages = data?.totalPages ?? 0;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
	    <header className={css.toolbar}>
		    <SearchBox value={searchInput} onSearch={handleSearchChange}/>
		    {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          updatePage={setCurrentPage}
        />
        )}
		    {<button 
          onClick={openModal} 
          className={css.button}>
            Create note +
          </button>}
      </header>
      <main className={css.mainContent}>
        {isLoading && !isError && <Loader variant={'global'}/>}

        {isSuccess && notesList.length > 0 && (
          <div className={css.listWrapper}>
            < NoteList notes={notesList}/> 
            {isFetching && !isLoading && <Loader variant={'fetching'}/>}
          </div> 
        )}

        {isError && <ErrorMessage message={error instanceof Error ? error.message : "Failed to load notes."}/>}
        {isSuccess && notesList.length === 0 && (<EmptyState searchQuery={searchQuery} onAction={openModal}/>)}

        {isModalOpen && 
        (<Modal onClose={closeModal}>
            <NoteForm onClose={closeModal}/>
          </Modal>
        )}
      </main>
    </div>
  );
}
