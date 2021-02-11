import { getGitUserDataApi, GitUserDetailApiModel } from './api';
import { mapGitUserDetailFromApiToVM } from './git-user-detail.mapper';
import { GitUserVmModel } from './git-user-detail.vm';

export const getGitUserData = async (
  login: string
): Promise<GitUserVmModel> => {
  const apiGitUserData: GitUserDetailApiModel = await getGitUserDataApi(login);
  const vmGitUserData: GitUserVmModel = mapGitUserDetailFromApiToVM(
    apiGitUserData
  );
  return vmGitUserData;
};
