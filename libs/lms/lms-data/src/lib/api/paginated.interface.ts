export interface Paginated<R> {
  count: number;
  page_number: number;
  next: string | null;
  previous: string | null;
  results: R[];
}
