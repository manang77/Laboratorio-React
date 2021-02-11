import React from 'react';
import { InvoiceContainer } from '../pods/invoice';
import { AppLayout } from 'layouts';
import { CenteredLayout } from 'layouts';

export const InvoiceScene: React.FC = () => {
  return (
    <>
      <AppLayout>
        <CenteredLayout>
          <InvoiceContainer />
        </CenteredLayout>
      </AppLayout>
    </>
  );
};
