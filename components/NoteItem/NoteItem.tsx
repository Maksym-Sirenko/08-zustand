import { Note } from '@/types/note';
import Link from 'next/link';
import styles from './NoteItem.module.css';

type Props = {
  item: Note;
};

const NoteItem = ({ item }: Props) => {
  return (
    <li className={styles.card}>
      <Link href={`/notes/${item.id}`} className={styles.title}>
        {item.title}
      </Link>
    </li>
  );
};

export default NoteItem;
