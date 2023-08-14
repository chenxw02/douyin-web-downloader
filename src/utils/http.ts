import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Interceptor {
  request?: {
    beforeSend?: (
      value: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    onError?: (error: any) => any;
  };
  response?: {
    afterReceive?: (
      value: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>;
    onError?: (error: any) => any;
  };
}

export function getClient(
  config: AxiosRequestConfig,
  interceptors: Interceptor[] = []
) {
  const client = axios.create(config);
  interceptors.forEach((interceptor) => {
    if (interceptor.request) {
      client.interceptors.request.use(
        interceptor.request.beforeSend,
        interceptor.request.onError
      );
    }
    if (interceptor.response) {
      client.interceptors.response.use(
        interceptor.response.afterReceive,
        interceptor.response.onError
      );
    }
  });
  return client;
}
