import React from 'react';
import { GitUserDetailComponent } from './git-user-detail.component';
import { useParams } from 'react-router-dom';
import { getGitUserData } from './git-user-detail.api.vm';
import { GitUserVmModel, createGitUser } from './git-user-detail.vm';

interface DetailGitUserParams {
  id: string;
}

export const GitUserDetailContainer: React.FC = () => {
  const { id } = useParams<DetailGitUserParams>();
  const [gitUser, setGitUser] = React.useState<GitUserVmModel>(createGitUser());

  const loadGitUser = async () => {
    const viewModelGitUserData: GitUserVmModel = await getGitUserData(id);
    setGitUser(viewModelGitUserData);
  };

  React.useEffect(() => {
    loadGitUser();
  }, []);

  return (
    <>
      <GitUserDetailComponent gitUser={gitUser} />
    </>
  );
};
