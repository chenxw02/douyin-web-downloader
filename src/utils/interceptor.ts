import type { Interceptor } from './http';
import { message as Message } from './message';
import { start as Nstart, close as NClose } from './nprogress';
import JSConfetti from 'js-confetti';

export function getAuthInterceptor(): Interceptor {
  return {
    request: {
      beforeSend: (config) => {
        // 添加鉴权头
        if (!config.headers) {
          config.headers = {};
        }
        Nstart();
        return config;
      },
    },
    response: {
      afterReceive: (res) => {
        NClose();
        if (res.status >= 200 && res.status < 400) {
          if (res.data && res.data.error) {
            return Promise.reject(res.data.error);
          }
          if (res.data && res.data.success) {
            Message.success(res.data.success);
            return Promise.resolve(res.data);
          }
          const jsConfetti = new JSConfetti();
          jsConfetti.addConfetti();
          return Promise.resolve(res.data);
        } else {
          return Promise.reject(res.data);
        }
      },
    },
  };
}


export function getSilentInterceptor(): Interceptor {
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
            return Promise.reject(res.data.error);
          }
          if (res.data && res.data.success) {
            Message.success(res.data.success);
          }
          return Promise.resolve(res.data);
        } else {
          return Promise.reject(res.data);
        }
      },
    },
  };
}