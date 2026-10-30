import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from "../../services/noteService";
import type { CreateNote } from "../../types/note";
import toast from "react-hot-toast";
import css from './NoteForm.module.css';

interface NoteFormProps {
    onClose: () => void;
}

const initialValues: CreateNote = {
    title: '',
    content: '', 
    tag: 'Todo' 
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string()
    .max(500, "Content is too long"),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], "Please select a valid tag")
    .required("Tag is required"),
});

export default function NoteForm ({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })

      onClose()
      toast.success("Note created successfully!")
    },

    onError: () => {
      toast.error("Failed to create note.")
    },
  })

  const isPending = createNoteMutation.isPending;

  return(
    <Formik 
      initialValues={initialValues} 
      validationSchema={validationSchema}
      onSubmit={(note: CreateNote) => createNoteMutation.mutate(note)}>
      <Form className={css.form}>

        <div className={css.formGroup}>
          <label htmlFor='title' >Title</label>
          <Field 
            id='title' 
            type="text" 
            name="title" 
            className={css.input} 
          />
          <ErrorMessage 
            name="title" 
            component="span"
            className={css.error} 
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor='content'>Content</label>
          <Field
            as="textarea"
            id='content'
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage 
            name="content"
            component="span" 
            className={css.error} 
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor='tag'>Tag</label>
          <Field 
            as="select" 
            id='tag'
            name="tag" 
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage 
            name="tag"
            component="span" 
            className={css.error} />
        </div>

        <div className={css.actions}>
          <button 
            type="button" 
            className={css.cancelButton}
            onClick={onClose}
            disabled={isPending}
        >
            Cancel
          </button>

          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create note"}
          </button>
        </div>

      </Form>
    </Formik>
  )
}