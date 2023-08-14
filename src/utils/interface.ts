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
  // 可以根据需要添加更多类型
}
