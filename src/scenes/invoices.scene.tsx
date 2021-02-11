import React from 'react';
import { InvoicesContainer } from '../pods/invoices';
import { AppLayout } from 'layouts';
import { CenteredLayout } from 'layouts';

export const InvoicesScene: React.FC = () => {
  return (
    <>
      <AppLayout>
        <CenteredLayout>
          <InvoicesContainer />
        </CenteredLayout>
      </AppLayout>
    </>
  );
};
