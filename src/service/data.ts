import { getClient, getSilentClient } from './client';
import type { DouyinData, DownloadData } from '@/utils/interface';

interface GetSingleURLParams {
  link: string;
}

interface DownloadToAliDriveParams {
  link: string;
  email: string;
}

export const getData = async (
  params: GetSingleURLParams
): Promise<DouyinData> => {
  return getClient().post('/getone', params);
};

export const download = async (
  params: GetSingleURLParams
): Promise<DownloadData> => {
  return getClient().post('/download', params);
};

export const downloadToAliDrive = async (params: DownloadToAliDriveParams) => {
  return getSilentClient().post('/downloadToAliDrive', params);
};
