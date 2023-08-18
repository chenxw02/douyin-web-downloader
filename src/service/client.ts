import { message as Message, messageBox as MessageBox } from '@/utils/message';
import { getClient as originGetClient } from '../utils/http';
import { globalValue } from '../utils/global';
import NProgress from 'nprogress';

export function onHttpError(err: any) {
  switch (err.code) {
    case 'LOGIN_ERROR':
      MessageBox.alert('登录失败');
      break;
    default:
      Message.error(err.message);
      break;
  }

  NProgress.done();
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
