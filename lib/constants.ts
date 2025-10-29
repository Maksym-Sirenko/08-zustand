export const ALL_NOTES = 'all';

export const TAGS = [
  'Work',
  'Personal',
  'Ideas',
  'Important',
  'Tasks',
] as const;

export type Tag = (typeof TAGS)[number];
