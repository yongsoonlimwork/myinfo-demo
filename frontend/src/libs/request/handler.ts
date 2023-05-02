import axios, { AxiosError } from 'axios';
import { IApiError, IBaseResponse } from '@/types/api';

export const customErrorHandler = (error: AxiosError<IBaseResponse>): Promise<IApiError> => {
  if (error.response) {
    const status = error.response.status;
    const statusText = error.response.statusText;

    // Business Level Error
    if (typeof error.response.data === 'object') {
      const message = error.response.data.message || 'Unknown error';

      return Promise.reject({ ...error.response.data, status, statusText, message });
    }

    // Network Level Error
    const method = error.config?.method || '';
    const shortUrl = error.config?.url || '';
    const message = `${shortUrl} ${method.toUpperCase()} (${status} - ${statusText})`;

    return Promise.reject({ status, statusText, message });
  }

  if (axios.isCancel(error)) {
    return Promise.reject(null);
  }

  return Promise.reject({
    message: 'System Error',
    statusText: 'unknown_failed'
  });
};
