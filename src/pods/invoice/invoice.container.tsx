import React from 'react';
import { useParams } from 'react-router-dom';
import {
  InvoiceHeader,
  InvoiceVm,
  InvoiceLineVm,
  getNewInvoiceHeader,
} from './invoice.vm';
import { getInvoice } from './invoice.api.vm';
import { InvoiceHeaderComponent } from './invoice-header.component';
import { InvoiceItemsComponent } from './invoice.items.component';
import * as invoiceStyles from './invoice.styles';
import {
  calculatePercentage,
  calculateValidatedAmount,
  calculateTotalAmount,
} from './invoice.utils';

interface InvoiceParams {
  id: string;
}

export const InvoiceContainer: React.FC = () => {
  const { id } = useParams<InvoiceParams>();
  const [invoiceHeader, setInvoiceHeader] = React.useState(
    getNewInvoiceHeader()
  );
  const [invoiceItems, setInvoiceItems] = React.useState([]);

  const loadInvoiceData = async () => {
    const invoiceId = parseInt(id);
    const invoice: InvoiceVm = await getInvoice(invoiceId);
    setInvoiceHeader(invoice.invoiceHeader);
    setInvoiceItems(invoice.items);
  };

  const updateInvoiceItemsList = (items: InvoiceLineVm[]) => {
    setInvoiceItems(items);
    const newHeader: InvoiceHeader = {
      ...invoiceHeader,
      amount: calculateTotalAmount(items),
      percentageValidated: calculatePercentage(items),
      validatedAmount: calculateValidatedAmount(items),
    };
    setInvoiceHeader(newHeader);
  };

  const getItemStatus = (): boolean => {
    if (invoiceItems.length === 0) {
      return true;
    } else {
      const itemStatus: boolean = invoiceItems.reduce((status, item) => {
        return status || !item.itemStatus;
      }, false);
      return itemStatus;
    }
  };

  React.useEffect(() => {
    loadInvoiceData();
  }, []);

  return (
    <>
      <div className={invoiceStyles.invoiceContainer}>
        <InvoiceHeaderComponent
          invoiceHeader={invoiceHeader}
          getItemsStatus={getItemStatus}
        />
        <InvoiceItemsComponent
          invoiceItemsList={invoiceItems}
          updateInvoiceItemsList={updateInvoiceItemsList}
        />
      </div>
    </>
  );
};
