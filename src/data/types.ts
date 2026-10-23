export type Preview =
  | { kind: 'tag' }
  | { kind: 'files' }
  | { kind: 'skeleton' }
  | { kind: 'page'; src: string; title: string };

export type Line = { code: string; says: string };

export type Step = {
  slug: string;
  title: string;
  summary: string;
  /** Lecturer's sentence, when this piece comes from the brief. */
  brief?: string;
  briefFrom?: string;
  /** Three tellings of the same point: plain, on the page, what gets the mark. */
  tellings: [string, string, string];
  preview: Preview;
  html?: string;
  css?: string;
  lines: Line[];
  /** A friend's attempt, shown after the right version. */
  friend?: { code: string; why: string };
};
