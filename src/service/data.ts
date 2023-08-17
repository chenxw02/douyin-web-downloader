import { getClient, getSilentClient } from './client';

interface ParseURLParams {
  link: string;
}

export interface DouyinData {
  type: string;
  urls: string[];
  desc: string;
}

export const getData = async (
  params: ParseURLParams
): Promise<DouyinData> => {
  return getClient().post('/getone', params);
};

interface DownloadParams {
  link: string[];
}

export interface DownloadData {
  fileName: string;
  filename: string;
  data: string;
}

export const download = async (
  params: DownloadParams
): Promise<DownloadData> => {
  return getClient().post('/download', params);
};

interface DownloadToAliDriveParams {
  link: string[];
  email: string;
}

export const downloadToAliDrive = async (params: DownloadToAliDriveParams) => {
  return getSilentClient().post('/downloadToAliDrive', params);
}
