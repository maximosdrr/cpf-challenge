export interface ApiResponse<T> {
  statusCode: number;
  data: T;
}

export interface ApiRequest {
  params: Record<string, unknown>;
  body: Record<string, unknown>;
  query: Record<string, unknown>;
}
