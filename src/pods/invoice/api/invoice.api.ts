import { InvoiceApi } from './invoice.api.model';
import { invoicesMockData } from 'pods/invoices/api';

export const getInvoiceApi = async (id: number): Promise<InvoiceApi> => {
  const invoiceApi: InvoiceApi = invoicesMockData.find(inv => inv.id === id);
  return invoiceApi;
};
