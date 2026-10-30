import axios from "axios";
import type { Note, CreateNote } from '../types/note'


interface Response {
    notes: Note[]
    totalPages: number
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` 
  },
})

export const fetchNotes = async (
    search: string = "", 
    page: number = 1
): Promise<Response> => { 
    const { data } = await api.get<Response>('/notes', {
        params: {
            search,
            page,
            perPage: 12
        }});
     return data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
      const { data } = await api.post<Note>('/notes', newNote);
      return data;
    };

export const deleteNote = async (noteId: string): Promise<Note> => {
      const { data } = await api.delete<Note>(`/notes/${noteId}`);
      return data;
    };    