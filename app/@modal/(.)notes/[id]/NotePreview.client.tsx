'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

const NotePreview = () => {
  const router = useRouter();
  const params = useParams();
  const noteId = params.id as string;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.container}>
          <p>Loading note details...</p>
        </div>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.container}>
          <p>Something went wrong.</p>
          <button onClick={handleClose} className={css.button}>
            Close
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <div className={css.footer}>
          <span className={css.tag}>Tag: {note.tag}</span>
          <span className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </div>
        <button onClick={handleClose} className={css.backBtn}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default NotePreview;
