import { InvoiceLineVm } from './invoice.vm';
export const actionValidate = 'Validated';
export const actionCancel = 'Pending';

export const calculatePercentage = (items: InvoiceLineVm[]): number => {
  const validatedLines = items.reduce((acum, item) => {
    if (item.itemStatus) {
      ++acum;
    }
    return acum;
  }, 0);
  return Math.ceil((validatedLines / items.length) * 100);
};

export const calculateValidatedAmount = (items: InvoiceLineVm[]): number => {
  const validatedAmount = items.reduce((acum, item): number => {
    if (item.itemStatus) {
      acum = acum + item.price;
    }
    return Number(acum.toFixed(2));
  }, 0);
  return validatedAmount;
};

export const calculateTotalAmount = (items: InvoiceLineVm[]): number => {
  const totalAmount = Number(
    items.reduce((acum, item) => acum + item.price, 0).toFixed(2)
  );
  return totalAmount;
};
