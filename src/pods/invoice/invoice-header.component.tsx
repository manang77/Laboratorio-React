import React, { SetStateAction } from 'react';
import { InvoiceHeader } from './invoice.vm';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import * as invoiceStyles from './invoice.styles';
import { SentDialogComponent } from './componentes/invoice.sent.dialog';

interface Props {
  invoiceHeader: InvoiceHeader;
  getItemsStatus: () => boolean;
}

const formatInvoiceDate = (dateString: string): SetStateAction<Date> => {
  const formatedDate = new Date(
    `${dateString.substring(6, 10)}-${dateString.substring(
      3,
      5
    )}-${dateString.substring(0, 2)}`
  );
  return formatedDate;
};

export const InvoiceHeaderComponent: React.FC<Props> = props => {
  const { invoiceHeader, getItemsStatus } = props;
  const [invoiceDate, setInvoiceDate] = React.useState<Date | null>();
  const [sendButtonStatus, setSendButtonStatus] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const handleDateChange = (date: Date) => {
    setInvoiceDate(date);
  };

  const handleSending = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    if (invoiceHeader.date) {
      setInvoiceDate(formatInvoiceDate(invoiceHeader.date));
    }
    setSendButtonStatus(getItemsStatus());
  }, [invoiceHeader]);

  return (
    <>
      <SentDialogComponent open={open} setOpen={setOpen} />
      <div className={invoiceStyles.invoiceHeaderContainer}>
        <div className={invoiceStyles.invoiceHeaderLine}>
          <div className={invoiceStyles.invoiceHeaderLineItem}>
            <TextField
              label="INVOICE ID"
              value={invoiceHeader.id}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className={invoiceStyles.invoiceHeaderLineItem}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="none"
                label="INVOICE DATE"
                value={invoiceDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={invoiceStyles.invoiceHeaderLineItem}>
            <TextField
              label="SUPPLIER"
              value={invoiceHeader.supplier}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className={invoiceStyles.invoiceHeaderLineItem}>
            <TextField
              label="STATUS"
              value={invoiceHeader.statusDescription}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        <div className={invoiceStyles.invoiceHeaderLine}>
          <div className={invoiceStyles.invoiceHeaderLineItem}>
            <TextField
              label="TOTAL AMOUNT"
              value={invoiceHeader.amount}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className={invoiceStyles.invoiceHeaderLineItem}>
            <TextField
              label="VALIDATED AMOUNT"
              value={invoiceHeader.validatedAmount}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className={invoiceStyles.invoiceHeaderLineItem}>
            <TextField
              label="% VALIDATED"
              value={`${invoiceHeader.percentageValidated} %`}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className={invoiceStyles.invoiceHeaderLineItem}>
            <Button
              variant="contained"
              color="primary"
              disabled={sendButtonStatus}
              onClick={handleSending}
            >
              SEND
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
