import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface Props {
  open: boolean;
  editedProduct: string;
  price: number;
  setOpen: (boolean) => void;
  updateProductPrice: (newAmount: number) => void;
}

export const PriceUpdateComponent: React.FC<Props> = props => {
  const { open, setOpen, editedProduct, price, updateProductPrice } = props;
  const [newPrice, setNewPrice] = React.useState(0);

  const handleSave = () => {
    updateProductPrice(newPrice);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Dialog open={open} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{editedProduct}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              id="newAmount"
              label="Enter amount"
              type="number"
              defaultValue={price}
              onChange={e => {
                setNewPrice(parseFloat(e.target.value));
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
