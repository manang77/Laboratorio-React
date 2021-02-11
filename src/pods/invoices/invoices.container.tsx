import React from 'react';
import { getInvoices } from './invoices.api.vm';
import { InvoiceVm } from './invoices.vm';
import { InvoicesComponent } from './invoices.component';

export const InvoicesContainer: React.FC = () => {
  const [invoices, setInvoices] = React.useState([]);

  const initialInvoicesLoad = async () => {
    const initialInvoices: InvoiceVm[] = await getInvoices();
    setInvoices(initialInvoices);
  };

  React.useEffect(() => {
    initialInvoicesLoad();
  }, []);

  return (
    <>
      <InvoicesComponent invoicesList={invoices} />
    </>
  );
};
