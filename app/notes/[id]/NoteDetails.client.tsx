'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';
import css from './NoteDetails.module.css';

const NoteDetailsClient = ({ noteId }: { noteId: string }) => {
  const isValidId = !!noteId;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
    enabled: isValidId,
  });

  if (!isValidId) {
    return <p>Invalid note ID</p>;
  }

  if (isLoading) return <p>Loading note details...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;
  if (!note) return <p>Note not found</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
