import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes, PER_PAGE } from '@/lib/api';
import NotesClient from './Notes.client';
import { ALL_NOTES } from '@/lib/constants';

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
      <NotesClient category={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
