export type ActionResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};
