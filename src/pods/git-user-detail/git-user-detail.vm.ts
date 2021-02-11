export interface GitUserVmModel {
  avatarUrl: string;
  name: string;
  id: string;
  login: string;
  followers: string;
  following: string;
  twitterUser: string;
  bio: string;
}

export const createGitUser = (): GitUserVmModel => ({
  avatarUrl: '',
  name: '',
  id: '',
  login: '',
  followers: '',
  following: '',
  twitterUser: '',
  bio: '',
});
