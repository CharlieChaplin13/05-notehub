import css from "./EmptyState.module.css"

interface EmptyStateProps {
  searchQuery: string,
  onAction: () => void;
}

export default function EmptyState ({ searchQuery, onAction }: EmptyStateProps) {
  return (
    <div className={css.container}>
        <h2 className={css.heading}>
            {searchQuery ? "No results found" : "No notes yet"}
        </h2>

        {searchQuery ? (
            <p className={css.text}>No search results for "{searchQuery}".</p>
        ) : (
            <>
                <p className={css.text}>You don't have any notes yet.</p>
                <button onClick={onAction} className={css.actionButton}>
                    Create Your First Note
                </button>
            </>
        )}
    </div>
  )
}