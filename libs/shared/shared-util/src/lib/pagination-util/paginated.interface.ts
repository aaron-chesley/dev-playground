export interface Paginated<R> {
  count: number;
  page_number: number;
  next: string | null;
  previous: string | null;
  results: R[];
}

export const getDefaultPaginated = (): Paginated<never> => ({
  count: 0,
  page_number: 1,
  next: null,
  previous: null,
  results: [],
});
