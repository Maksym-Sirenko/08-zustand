// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
import css from './not-found.module.css';
import type { Metadata } from 'next';
import { VERSEL_URL, IMAGE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: '404 - Not found - NoteHub',
  description: 'The requested page does not exist on NoteHub',
  openGraph: {
    title: '404 - Not found - NoteHub',
    description: 'The requested page does not exist on NoteHub',
    url: `${VERSEL_URL}/not-found`,
    images: [
      {
        url: IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Not found',
      },
    ],
  },
};

const NotFound = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   const timer = setTimeout(() => router.push('/'), 3000);
  //   return () => clearTimeout(timer);
  // }, [router]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
