import React from 'react';
import { GitUsersContainer } from 'pods/git-users';
import { AppLayout } from 'layouts';
import { CenteredLayout } from 'layouts';

export const GitUsersScene: React.FC = () => {
  return (
    <>
      <AppLayout>
        <CenteredLayout>
          <GitUsersContainer />
        </CenteredLayout>
      </AppLayout>
    </>
  );
};
