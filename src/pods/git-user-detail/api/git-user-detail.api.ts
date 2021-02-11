import { GitUserDetailApiModel } from './git-user-detail.api.model';

export const getGitUserDataApi = async (
  login: string
): Promise<GitUserDetailApiModel> => {
  const gitUserData = fetch(`https://api.github.com/users/${login}`)
    .then(response => response.json())
    .then(json => json);
  return gitUserData;
};
