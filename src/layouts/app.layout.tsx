import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import * as classes from './app.layout.styles';
import { routes } from 'core/router';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { ApplicationContext } from 'common-app/context';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';

export const AppLayout: React.FC = ({ children }) => {
  const history = useHistory();
  const { cartItems, setCartVisibleStatus } = React.useContext(
    ApplicationContext
  );

  const handleCartStatusButton = () => {
    setCartVisibleStatus(true);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button
            onClick={() => history.push(routes.exercises)}
            color="secondary"
          >
            Back to Exercises List
          </Button>
          <IconButton
            className={classes.cartIcon}
            onClick={() => handleCartStatusButton()}
          >
            <Badge badgeContent={cartItems.length} color="primary">
              <ShoppingCartIcon fontSize="large" color="secondary" />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};
