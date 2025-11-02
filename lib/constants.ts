export const ALL_NOTES = 'all';

export const TAGS = [
  'Work',
  'Personal',
  'Ideas',
  'Important',
  'Tasks',
] as const;

export type Tag = (typeof TAGS)[number];

export const VERSEL_URL = 'https://08-zustand-livid-one.vercel.app/';
export const IMAGE_URL =
  'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';
