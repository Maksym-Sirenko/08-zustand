import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NoteTag } from '@/types/note';

type NewNoteData = {
  title: string;
  content: string;
  tag: NoteTag;
};

type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (note: Partial<NewNoteData>) => void;
  clearDraft: () => void;
};

const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({ draft: { ...state.draft, ...note } })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
