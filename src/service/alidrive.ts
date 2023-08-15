import { getClient } from './client';

interface linkToAliDriveParams {
  email: string;
}

export const linkToAliDrive = (params: linkToAliDriveParams) => {
  return getClient().post('/link', params);
};
