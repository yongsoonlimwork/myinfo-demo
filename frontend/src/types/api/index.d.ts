export interface IBaseResponse {
  message: string;
}

export interface IApiResponse<R> extends IBaseResponse {
  result: R | null;
  status?: EHttpResponseCode;
  statusText?: string;
}

export interface IApiError extends IApiResponse<never> {}
