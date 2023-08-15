import { message as Message } from '@/utils/message';
import { getClient as originGetClient } from '../utils/http';
import { globalValue } from '../utils/global';
import NProgress from 'nprogress';

export function onHttpError(err: any) {
  Message.error(err.message || '请求失败');
  NProgress.done();
  return Promise.reject(err);
}

export function getClient(): ReturnType<typeof originGetClient> {
  if (!globalValue.client) {
    throw new Error('globalValue.client is not initialized');
  }
  return globalValue.client;
}

export function getSilentClient(): ReturnType<typeof originGetClient> {
  if (!globalValue.silentClient) {
    throw new Error('globalValue.silentClient is not initialized');
  }
  return globalValue.silentClient;
}
