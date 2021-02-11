import { GitUsersApiModel } from './git-users.api.model';
import Axios, { AxiosResponse } from 'axios';
import { pageSize } from 'common/components/pagination';

export const companyInitialLoad = async (
  company: string,
  page: number
): Promise<AxiosResponse> => {
  try {
    const requestResponse = await Axios.get(
      `https://api.github.com/orgs/${company}/members?per_page=${pageSize}&page=${page}`
    ).then(response => response);
    return requestResponse;
  } catch {
    return null;
  }
};

export const getCompanyGitUsersApi = async (
  company: string,
  page: number
): Promise<GitUsersApiModel[]> => {
  try {
    const companyGitUserList = await Axios.get<GitUsersApiModel[]>(
      `https://api.github.com/orgs/${company}/members?per_page=${pageSize}&page=${page}`
    )
      .then(response => response.data)
      .then(data => data);

    return companyGitUserList;
  } catch {
    return [];
  }
};
