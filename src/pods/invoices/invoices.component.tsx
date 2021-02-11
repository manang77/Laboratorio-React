import React from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from 'core/router';
import { InvoiceVm } from './invoices.vm';
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
import * as invoicesStyles from './invoices.styles';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

interface Props {
  invoicesList: InvoiceVm[];
}

interface Column {
  id: 'id' | 'supplier' | 'date' | 'amount' | 'status';
  label: string;
  minWidth?: number;
  align?: 'center' | 'right' | 'left';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'id', label: 'ID', minWidth: 100, align: 'center' },
  { id: 'supplier', label: 'SUPPLIER', minWidth: 250, align: 'left' },
  { id: 'date', label: 'DATE', minWidth: 50, align: 'center' },
  {
    id: 'amount',
    label: 'TOTAL AMOUNT',
    minWidth: 50,
    align: 'right',
    format: (value: number) =>
      value.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR',
      }),
  },
  {
    id: 'status',
    label: 'VALIDATED',
    minWidth: 20,
    align: 'center',
  },
];
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

export const InvoicesComponent: React.FC<Props> = props => {
  const { invoicesList } = props;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(8);
  const history = useHistory();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleEditClickButton = (id: number) => {
    history.push(routes.invoice(id.toString()));
  };

  return (
    <>
      <div className={invoicesStyles.invoicesListContainer}>
        <TableContainer className={classes.container}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <StyledTableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
                <StyledTableCell width={15}>EDIT</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoicesList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(invoice => {
                  return (
                    <TableRow
                      className={invoicesStyles.invoiceRowSelect}
                      hover
                      tabIndex={-1}
                      key={invoice.id}
                    >
                      {columns.map(column => {
                        const value = invoice[column.id];
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? (
                              column.format(value)
                            ) : typeof value === 'boolean' ? (
                              <Checkbox
                                color="primary"
                                checked={Boolean(value)}
                              />
                            ) : (
                              value
                            )}
                          </StyledTableCell>
                        );
                      })}
                      <TableCell>
                        <IconButton
                          onClick={() => handleEditClickButton(invoice.id)}
                        >
                          <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[8]}
          component="div"
          count={invoicesList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      </div>
    </>
  );
};
