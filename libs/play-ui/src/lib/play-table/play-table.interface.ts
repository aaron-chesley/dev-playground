export interface PlayTableRow {
  rows: PlayTableRow[];
  [key: string]: any;
}

export interface PlayTableColumn {
  key: string;
  label: string;
  sortable: boolean;
}
