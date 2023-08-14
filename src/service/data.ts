import { getClient } from './client';
import axios from 'axios';
import type { DouyinData, DownloadData } from '@/utils/interface';

interface getSingleURLParams {
  link: string;
}

export const getData = async (
  data: getSingleURLParams
): Promise<DouyinData> => {
  return getClient().post('/getone', data);
};

export const download = async (
  data: getSingleURLParams
): Promise<DownloadData> => {
  return getClient().post('/download', data);
};

export const singleRequest = async (url: string) => {
  const data = { link: url };

  // 按照换行符分割字符串

  try {
    const res = await axios.post('http://localhost:8088/getone', data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const download_one = async (url: string) => {
  const data = { link: url };
  try {
    const res = await axios({
      method: 'post',
      url: 'http://localhost:8080/download_one',
      responseType: 'blob',
      data: data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const muti_url = async (url: string) => {
  const data = { link: url };
  try {
    const res = await axios({
      method: 'post',
      url: 'http://localhost:8080/download_all',
      responseType: 'blob',
      data: data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const downloadFile = async (url: string) => {
  try {
    const data = await axios.get(url, {
      responseType: 'blob',
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
