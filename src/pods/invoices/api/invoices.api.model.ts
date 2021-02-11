export interface InvoiceLineApi {
  itemStatus: boolean;
  product: string;
  price: string;
}

export interface InvoiceApi {
  id: number;
  supplier: string;
  date: string;
  amount: string;
  status: boolean;
  items: InvoiceLineApi[];
}
