import { message as Message } from '@/utils/message';

export const checkEmail = (email: string): boolean => {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
  !reg.test(email) && Message.warn('请输入正确的邮箱');
  return reg.test(email);
};

export const parseURL = (text: string): string[] => {
  const urlReg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
  !text.match(urlReg) && Message.warn('请输入正确的链接');
  return [...new Set(text.match(urlReg) || [])];
}



export const downloadFromBase64 = (
  base64Data: string,
  filename: string
): void => {
  // 解码Base64数据并创建Blob对象
  const blob = new Blob(
    [
      new Uint8Array(
        atob(base64Data)
          .split('')
          .map((char) => char.charCodeAt(0))
      ),
    ],
    { type: 'application/zip' } // 使用适当的MIME类型，如application/zip
  );

  // 创建一个临时的下载链接
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename; // 下载的文件名
  link.style.display = 'none';

  // 将链接添加到页面并模拟点击
  document.body.appendChild(link);
  link.click();

  // 移除链接
  document.body.removeChild(link);
};
