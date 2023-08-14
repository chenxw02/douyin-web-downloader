import type { AxiosRequestHeaders } from 'axios';
import type { Interceptor } from './http';
export function getAuthInterceptor(): Interceptor {
  return {
    request: {
      beforeSend: (config) => {
        // 添加鉴权头
        if (!config.headers) {
          config.headers = {};
        }
        return config;
      },
    },
    response: {
      afterReceive: (res) => {
        if (res.status >= 200 && res.status < 400) {
          if (res.data && res.data.error) {
            return Promise.reject(res.data);
          }
          return Promise.resolve(res.data);
        } else {
          return Promise.reject(res.data);
        }
      },
    },
  };
}
