import { InvoiceApi } from './invoices.api.model';
import { invoicesMockData } from './invoices.mock.data';

export const getInvoicesApi = async (): Promise<InvoiceApi[]> => {
  return invoicesMockData;
};
