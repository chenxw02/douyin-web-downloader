import { getClient, getSilentClient } from './client';
import type { DouyinData, DownloadData } from '@/utils/interface';

interface ParseURLParams {
  link: string;
}

interface DownloadParams {
  link: string[];
}

interface DownloadToAliDriveParams {
  link: string[];
  email: string;
}

export const getData = async (
  params: ParseURLParams
): Promise<DouyinData> => {
  return getClient().post('/getone', params);
};

export const download = async (
  params: DownloadParams
): Promise<DownloadData> => {
  return getClient().post('/download', params);
};

export const downloadToAliDrive = async (params: DownloadToAliDriveParams) => {
  return getClient().post('/downloadToAliDrive', params);
}
