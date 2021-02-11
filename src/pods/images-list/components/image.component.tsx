import React from 'react';
import { ApplicationContext } from 'common-app/context';
import { ImagesVm } from '../images-list.vm';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import * as imagesClasses from '../images-list.styles';

interface Props {
  image: ImagesVm;
  updateImageBuyStatus: (image: ImagesVm) => void;
}

export const ImageComponent: React.FC<Props> = props => {
  const { image, updateImageBuyStatus } = props;
  const [buyStatus, setBuyStatus] = React.useState(image.selected);
  const { cartItems, setCartItems } = React.useContext(ApplicationContext);

  const handleBuyCheckChange = () => {
    const newImage: ImagesVm = {
      ...image,
      selected: !buyStatus,
    };
    updateImageBuyStatus(newImage);
    setBuyStatus(!buyStatus);

    if (!buyStatus) {
      const updatedCart = [...cartItems, image];
      setCartItems(updatedCart);
    } else {
      const updatedCart = cartItems.reduce((newCart, item) => {
        if (item.id != image.id) {
          return [...newCart, item];
        } else {
          return newCart;
        }
      }, []);
      setCartItems(updatedCart);
    }
  };

  React.useEffect(() => {
    setBuyStatus(image.selected);
  }, [image]);

  return (
    <>
      <div>
        <img src={image.picURL} width={200} height={200}></img>
      </div>
      <div className={imagesClasses.imageLine}>
        <Typography color="textSecondary" gutterBottom variant="body1">
          {image.title}
        </Typography>
      </div>
      <div className={imagesClasses.imageLine}>
        <FormControlLabel
          control={
            <Checkbox
              color={'primary'}
              checked={buyStatus}
              onChange={handleBuyCheckChange}
            />
          }
          label="Buy"
        />
      </div>
    </>
  );
};
