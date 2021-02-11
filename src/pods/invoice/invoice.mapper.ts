import { InvoiceVm, InvoiceLineVm, InvoiceHeader } from './invoice.vm';
import { InvoiceApi, InvoiceLineApi } from './api';
import {
  calculatePercentage,
  calculateValidatedAmount,
  actionCancel,
  actionValidate,
} from './invoice.utils';

const mapInvoiceLineFromApiToVm = ({ itemStatus, product, price }) => {
  return {
    itemStatusSel: false,
    itemStatus,
    itemStatusDescription: itemStatus ? actionValidate : actionCancel,
    product,
    price: parseFloat(price),
  };
};

export const mapInvoiceFromApiToVM = ({
  id,
  supplier,
  date,
  amount,
  status,
  items,
}): InvoiceVm => {
  const invoiceLinesVM: InvoiceLineVm[] = items.map(item =>
    mapInvoiceLineFromApiToVm(item)
  );

  const invoiceHeaderVM: InvoiceHeader = {
    id,
    supplier,
    date,
    amount: parseFloat(amount),
    validatedAmount: calculateValidatedAmount(invoiceLinesVM),
    status,
    statusDescription: status ? 'Sent' : 'Not Sent',
    percentageValidated: calculatePercentage(invoiceLinesVM),
  };

  return {
    invoiceHeader: invoiceHeaderVM,
    items: invoiceLinesVM,
  };
};
