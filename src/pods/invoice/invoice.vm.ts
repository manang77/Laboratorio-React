export interface InvoiceLineVm {
  itemStatusSel: boolean;
  itemStatus: boolean;
  itemStatusDescription: string;
  product: string;
  price: number;
}

export interface InvoiceHeader {
  id: number;
  supplier: string;
  date: string;
  amount: number;
  validatedAmount: number;
  status: boolean;
  statusDescription: string;
  percentageValidated: number;
}

export interface InvoiceVm {
  invoiceHeader: InvoiceHeader;
  items: InvoiceLineVm[];
}

export const getNewInvoiceHeader = () => {
  return {
    id: 0,
    supplier: '',
    date: '',
    amount: 0,
    validatedAmount: 0,
    status: false,
    statusDescription: '',
    percentageValidated: 0,
  };
}
