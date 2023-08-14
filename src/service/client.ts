import { message as Message } from '@/utils/message';
import { getClient as originGetClient } from '../utils/http';
import { globalValue } from '../utils/global';

export function onHttpError(err: any) {
  const { status } = err;
  if (status !== 200) {
    Message.error('解析失败');
  }
  return Promise.reject(err);
}

export function getClient(): ReturnType<typeof originGetClient> {
  if (!globalValue.client) {
    throw new Error('globalValue.client is not initialized');
  }
  return globalValue.client;
}
