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
