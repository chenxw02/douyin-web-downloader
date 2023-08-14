import { message as Message, message } from '@/utils/message';

export const checkURL = (url: string): void => {
  url.includes('http://') ||
    (url.includes('https://') && message.warn('请输入正确的链接'));
};
