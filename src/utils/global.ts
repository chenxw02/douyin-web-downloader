/**
 * 存储一些全局变量
 */

import type { AppContext } from 'vue';
import type { Pinia } from 'pinia';
import type { AxiosInstance } from 'axios';

class GlobalValue {
  /** Vue 的 appContext */
  vueContext?: AppContext;
  /** Axios Client */
  client?: AxiosInstance;

  silentClient?: AxiosInstance;
  /** Pinia Instance */
  pinia?: Pinia;
}

export const globalValue = new GlobalValue();
