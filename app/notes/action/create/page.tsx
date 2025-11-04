import NoteForm from '@/components/NoteForm/NoteForm';
import css from './page.module.css';
import type { Metadata } from 'next';
import { VERSEL_URL, IMAGE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Create note - NoteHub',
  description: 'Create a new note in NoteHub',
  openGraph: {
    title: 'Create note - NoteHub',
    description: 'Create a new note in NoteHub',
    url: `${VERSEL_URL}/notes/action/create`,
    siteName: 'NoteHub',
    images: [
      {
        url: IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Create note - NoteHub',
      },
    ],
  },
};

const CreateNotePage = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNotePage;
