import { GitUsersApiModel } from './api';
import { GitUserVmModel } from './git-user.vm';

const mapCompanyGitUserFromApiToVM = (
  apiCompanyGitUser: GitUsersApiModel
): GitUserVmModel => ({
  avatarUrl: apiCompanyGitUser.avatar_url,
  login: apiCompanyGitUser.login,
});

export const mapCompanyGitUsersFromApiToVM = (
  companyGitUsers: GitUsersApiModel[]
): GitUserVmModel[] =>
  companyGitUsers.map(gitUser => mapCompanyGitUserFromApiToVM(gitUser));
