import { InvoiceApi, getInvoicesApi } from './api';
import { InvoiceVm } from './invoices.vm';

import { mapInvoicesListFromApiToVM } from './invoices.mapper';

export const getInvoices = async (): Promise<InvoiceVm[]> => {
  const invoicesApi: InvoiceApi[] = await getInvoicesApi();
  const invoicesVm: InvoiceVm[] = mapInvoicesListFromApiToVM(invoicesApi);
  return invoicesVm;
};
