import { InvoiceApi } from './api';
import { InvoiceVm } from './invoices.vm';

const mapInvoiceFromApiToVM = ({
  id,
  supplier,
  date,
  amount,
  status,
}): InvoiceVm => {
  return {
    id,
    supplier,
    date,
    amount: parseFloat(amount),
    status: status,
  };
};
export const mapInvoicesListFromApiToVM = (
  invoicesListApi: InvoiceApi[]
): InvoiceVm[] => {
  const invoicesListVM = invoicesListApi.map(invoice =>
    mapInvoiceFromApiToVM(invoice)
  );
  return invoicesListVM;
};
