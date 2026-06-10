export interface Meta {
  asOf: string;
  cached: boolean;
  ttlSec: number;
}

export interface ApiResponse<T> {
  data: T;
  meta: Meta;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
  };
}
