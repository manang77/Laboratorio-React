import React from 'react';
import { AppLayout, CenteredLayout } from 'layouts';
import { GitUserDetailContainer } from '../pods/git-user-detail';

export const GitUserDetailScene: React.FC = () => {
  return (
    <>
      <AppLayout>
        <CenteredLayout>
          <GitUserDetailContainer />
        </CenteredLayout>
      </AppLayout>
    </>
  );
};
