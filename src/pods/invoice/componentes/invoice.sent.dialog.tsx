import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { routes } from 'core/router';

interface Props {
  open: boolean;
  setOpen: (boolean) => void;
}

export const SentDialogComponent: React.FC<Props> = props => {
  const { open, setOpen } = props;
  const history = useHistory();

  const handleContinue = () => {
    setOpen(false);
    history.push(routes.invoices);
  };

  return (
    <>
      <div>
        <Dialog open={open} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Invoice Approval</DialogTitle>
          <DialogContent>
            <Typography variant="h6">
              The invoice has been sent correctly
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleContinue} color="primary">
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
