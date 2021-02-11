import { AxiosResponse } from 'axios';
import {
  companyInitialLoad,
  getCompanyGitUsersApi,
  GitUsersApiModel,
  GitUsersApiModelWithHeader,
  getNewGitUsersApiModelWithHeader,
} from './api';

export const loadServerInformation = async (
  company: string,
  page: number
): Promise<GitUsersApiModelWithHeader> => {
  const initialData: AxiosResponse = await companyInitialLoad(company, page);
  if (initialData !== null) {
    const initialDataWithHeader: GitUsersApiModelWithHeader = {
      header: initialData.headers,
      gitUsersData: initialData.data,
    };
    return initialDataWithHeader;
  } else {
    return getNewGitUsersApiModelWithHeader();
  }
};

export const loadNewDataPage = (
  company: string,
  page: number
): Promise<GitUsersApiModel[]> => {
  const newDataPage = getCompanyGitUsersApi(company, page);
  return newDataPage;
};
