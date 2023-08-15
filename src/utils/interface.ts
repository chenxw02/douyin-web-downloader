export interface DouyinData {
  type: string;
  urls: string[];
  desc: string;
}

export interface DownloadData {
  fileName: string;
  filename: string;
  data: string;
}

export enum Mode {
  Normal = 'Normal',
  DownloadOnly = 'DownloadOnly',
}
