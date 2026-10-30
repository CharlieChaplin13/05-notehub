import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import type { Note } from '../../types/note'
import { deleteNote } from "../../services/noteService"
import css from "./NoteList.module.css"


interface NoteListProps {
  notes: Note[];
}

export default function NoteList ({ notes }: NoteListProps) {
  const queryClient = useQueryClient()

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })

      toast.success("Note deleted successfully!")
    },

    onError: () => {
      toast.error("Failed to delete note.")
    },
  })

  return (
    <ul className={css.list}>
    	{notes.map((note) => (
        <li key={note.id} className={css.listItem}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <div className={css.footer}>
          <span className={css.tag}>{note.tag}</span>
          <button 
          type='button'
          className={css.button}
          onClick={() => deleteNoteMutation.mutate(note.id)}>Delete</button>
        </div>
        </li>
      ))}
    </ul>
  )
}