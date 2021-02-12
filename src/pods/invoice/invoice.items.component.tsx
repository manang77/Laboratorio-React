import React from 'react';
import { InvoiceLineVm } from './invoice.vm';
import { actionCancel, actionValidate } from './invoice.utils';
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import { routes } from 'core/router';
import * as invoiceStyles from './invoice.styles';
import EditIcon from '@material-ui/icons/Edit';
import { PriceUpdateComponent } from './componentes';

interface Props {
  invoiceItemsList: InvoiceLineVm[];
  updateInvoiceItemsList: (items: InvoiceLineVm[]) => void;
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 18,
    },
  })
)(TableCell);

const useStyles = makeStyles({
  root: {
    width: '75%',
  },
  container: {
    minHeight: 100,
  },
});

export const InvoiceItemsComponent: React.FC<Props> = props => {
  const { invoiceItemsList, updateInvoiceItemsList } = props;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);
  const [selStatus, setSelStatus] = React.useState([]);
  const [cancelButtonStatus, setCancelButtonStatus] = React.useState(true);
  const [validatelButtonStatus, setValidatelButtonStatus] = React.useState(
    true
  );
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [editedProduct, setEditedProduct] = React.useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleExitClickButton = () => {
    history.push(routes.invoices);
  };

  const handleEditClickButton = (index: number) => {
    setIndex(index);
    setPrice(invoiceItemsList[index].price);
    setEditedProduct(invoiceItemsList[index].product);
    setOpen(true);
  };

  const updateProductPrice = (newPrice: number) => {
    const itemsList = invoiceItemsList.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, price: newPrice };
        return updatedItem;
      } else {
        return item;
      }
    });
    updateInvoiceItemsList(itemsList);
  };

  const updateItemsStatus = (action: string) => {
    const itemsList = invoiceItemsList.map((item: InvoiceLineVm, itemIndex) => {
      if (selStatus[itemIndex]) {
        const newStatus = action === actionValidate ? true : false;
        const newStatusDescription =
          action === actionValidate ? actionValidate : actionCancel;
        const updatedItem: InvoiceLineVm = {
          ...item,
          itemStatus: newStatus,
          itemStatusDescription: newStatusDescription,
        };
        return updatedItem;
      } else {
        return item;
      }
    });
    updateInvoiceItemsList(itemsList);
  };

  const handleChangeStatus = (index: number) => {
    const newStatus = [...selStatus];
    newStatus[index] = !newStatus[index];
    const itemsToCancel = newStatus.reduce((counter, sel, i) => {
      if (sel && invoiceItemsList[i].itemStatus) {
        ++counter;
      }
      return counter;
    }, 0);
    setCancelButtonStatus(itemsToCancel > 0 ? false : true);

    const itemsToValidate = newStatus.reduce((counter, sel, i) => {
      if (sel && !invoiceItemsList[i].itemStatus) {
        ++counter;
      }
      return counter;
    }, 0);
    setValidatelButtonStatus(itemsToValidate > 0 ? false : true);
    setSelStatus(newStatus);
  };

  React.useEffect(() => {
    const initStatus: boolean[] = new Array(invoiceItemsList.length).fill(
      false
    );
    setSelStatus(initStatus);
    setValidatelButtonStatus(true);
    setCancelButtonStatus(true);
  }, [invoiceItemsList]);

  return (
    <>
      <PriceUpdateComponent
        open={open}
        editedProduct={editedProduct}
        price={price}
        setOpen={setOpen}
        updateProductPrice={updateProductPrice}
      />
      <div className={invoiceStyles.invoiceItemsButtonsContainer}>
        <Button
          variant="contained"
          color="primary"
          disabled={validatelButtonStatus}
          onClick={() => updateItemsStatus(actionValidate)}
        >
          Validate
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={cancelButtonStatus}
          onClick={() => updateItemsStatus(actionCancel)}
        >
          Cancel
        </Button>
      </div>
      <div>
        <TableContainer className={classes.container}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" width={50}>
                  SEL
                </StyledTableCell>
                <StyledTableCell align="center" width={150}>
                  STATUS
                </StyledTableCell>
                <StyledTableCell align="center" width={400}>
                  PRODUCT
                </StyledTableCell>
                <StyledTableCell align="center" width={70}>
                  PRICE
                </StyledTableCell>
                <StyledTableCell align="center" width={5}>
                  EDIT
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceItemsList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <StyledTableCell align={'center'}>
                        <Checkbox
                          color="primary"
                          checked={Boolean(
                            selStatus[page * rowsPerPage + index]
                          )}
                          onChange={() =>
                            handleChangeStatus(page * rowsPerPage + index)
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell align={'center'}>
                        {item.itemStatusDescription}
                      </StyledTableCell>
                      <StyledTableCell align={'left'}>
                        {item.product}
                      </StyledTableCell>
                      <StyledTableCell align={'right'}>
                        {item.price.toLocaleString('es-ES', {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      </StyledTableCell>
                      <StyledTableCell align={'center'}>
                        <IconButton
                          onClick={() => handleEditClickButton(index)}
                        >
                          <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={invoiceItemsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      </div>
      <div className={invoiceStyles.invoiceExitButtonContainer}>
        <IconButton onClick={handleExitClickButton}>
          <ExitToAppIcon fontSize="large" color="primary" />
        </IconButton>
      </div>
    </>
  );
};
