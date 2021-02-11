import React from 'react';
import { ImagesListContainer } from 'pods/images-list';
import { AppLayout } from 'layouts';
import { CenteredLayout } from 'layouts';

export const ImagesListScene: React.FC = () => {
  return (
    <>
      <AppLayout>
        <CenteredLayout>
          <ImagesListContainer />
        </CenteredLayout>
      </AppLayout>
    </>
  );
};
