import { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { IMAGE_URL, VERSEL_URL } from '@/lib/constants';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const title = `Note: ${note.title}`;

  return {
    title,
    description: note.content.slice(0, 30),
    openGraph: {
      title,
      description: note.content.slice(0, 100),
      url: `${VERSEL_URL}/notes/filter/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: IMAGE_URL,
          width: 1200,
          height: 630,
          alt: 'Note Details Image',
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: note.title,
      description: note.content.slice(0, 100),
      images: [IMAGE_URL],
    },
  };
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
};

export default NoteDetails;
