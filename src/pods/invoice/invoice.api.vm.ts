import { InvoiceApi, getInvoiceApi } from './api';
import { InvoiceVm } from './invoice.vm';

import { mapInvoiceFromApiToVM } from './invoice.mapper';

export const getInvoice = async (id: number): Promise<InvoiceVm> => {
  const invoiceApi: InvoiceApi = await getInvoiceApi(id);
  const invoiceVm: InvoiceVm = mapInvoiceFromApiToVM(invoiceApi);
  return invoiceVm;
};
