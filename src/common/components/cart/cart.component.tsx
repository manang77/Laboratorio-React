import React from 'react';
import { ApplicationContext } from 'common-app/context';
import { ImagesVm } from 'pods/images-list/images-list.vm';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(3, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'space-between',
    },
  })
);

export const Cart: React.FC = () => {
  const classes = useStyles();
  const {
    cartVisibleStatus,
    setCartVisibleStatus,
    cartItems,
    setCartItems,
  } = React.useContext(ApplicationContext);

  const handleDrawerClose = () => {
    setCartVisibleStatus(false);
  };

  const handleEmtpyCartButton = () => {
    setCartItems([]);
  };

  const handleDeleteButton = (deletedId: number) => {
    const newCart: ImagesVm[] = cartItems.reduce((newCart, item) => {
      if (item.id !== deletedId) {
        newCart = [...newCart, item];
      }
      return newCart;
    }, []);
    setCartItems(newCart);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={cartVisibleStatus}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography
          align="left"
          color="textPrimary"
          gutterBottom
          variant="body1"
        >
          Shopping Cart
        </Typography>
        <IconButton onClick={handleEmtpyCartButton}>
          <DeleteForeverIcon color={'primary'} fontSize={'large'} />
        </IconButton>
        <IconButton onClick={handleDrawerClose}>
          <DoubleArrowIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {cartItems.map((item, index) => (
          <ListItem dense key={index}>
            <ListItemAvatar>
              <Avatar src={item.picURL} />
            </ListItemAvatar>
            <ListItemText primary={item.title} />
            <ListItemIcon>
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleDeleteButton(item.id)}>
                  <DeleteIcon color={'primary'} fontSize={'small'} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
