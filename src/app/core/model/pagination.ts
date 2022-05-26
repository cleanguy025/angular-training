export type PagingMode = 'paging' | 'scroll';
export interface PagingOptions {
  length: number;
  pageSize: number;
  pageSizeOptions: number[];
  pageIndex: number;
}
export interface Paging {
  previousPageIndex: number;
  pageIndex: number;
  pageSize: number;
  length: number;
}

export const DEFAULT_PAGING: PagingOptions = {
  pageIndex: 0,
  pageSize: 10,
  pageSizeOptions: [5, 10, 25, 50],
  length: 1000
}


