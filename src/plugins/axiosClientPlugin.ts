import { getClient } from '../utils/http';
import { getAuthInterceptor } from '../utils/login';
import { globalValue } from '../utils/global';
import type { App } from 'vue';

export interface Options {
  /** 后端API路径 */
  baseURL: string;
  /** 错误处理 */
  onHttpError: (err: any) => Promise<any>;
}

export const AxiosClientPlugin = {
  install(app: App, options: Options) {
    const interceptor = getAuthInterceptor();
    globalValue.client = getClient(
      {
        baseURL: options.baseURL,
      },
      [
        interceptor,
        {
          response: {
            onError: options.onHttpError,
          },
        },
      ]
    );
    globalValue.client.defaults.withCredentials = false;
  },
};
