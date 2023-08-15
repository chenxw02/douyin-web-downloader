import { getClient } from './client';
import type { DouyinData, DownloadData } from '@/utils/interface';

interface getSingleURLParams {
  link: string;
}

interface downloadToAliDriveParams {
  link: string;
  email: string;
}

export const getData = async (
  params: getSingleURLParams
): Promise<DouyinData> => {
  return getClient().post('/getone', params);
};

export const download = async (
  params: getSingleURLParams
): Promise<DownloadData> => {
  return getClient().post('/download', params);
};

export const downloadToAliDrive = async (params: downloadToAliDriveParams) => {
  return getClient().post('/downloadToAliDrive', params);
};
