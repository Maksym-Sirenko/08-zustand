import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes, PER_PAGE } from '@/lib/api';
import NotesClient from './Notes.client';
import { ALL_NOTES } from '@/lib/constants';
import type { Metadata } from 'next';
import { IMAGE_URL, VERSEL_URL } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const slug = params.slug?.[0] ?? 'all';
  return {
    title: `Notes - ${slug}`,
    description: `Notes filtered by ${slug}`,
    openGraph: {
      title: `Notes - ${slug}`,
      description: `Notes filtered by ${slug}`,
      url: `${VERSEL_URL}/notes/filter/${slug}`,
      images: [
        {
          url: IMAGE_URL,
          width: 1200,
          height: 630,
          alt: 'Notes',
        },
      ],
    },
  };
}

interface Props {
  params: Promise<{ slug: string[] }>;
}

const NotesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const tag = slug[0] === ALL_NOTES ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', { search: '', tag, page: 1, perPage: PER_PAGE }],
    queryFn: () =>
      fetchNotes({
        search: '',
        tag: tag || '',
        page: 1,
        perPage: PER_PAGE,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
