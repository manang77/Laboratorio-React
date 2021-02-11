import React from 'react';
import { ApplicationContext } from 'common-app/context';
import { ImagesListComponent } from './images-list.component';
import { ImagesVm } from './images-list.vm';
import { getImages } from './images-list.api.vm';

export const ImagesListContainer: React.FC = () => {
  const [images, setImages] = React.useState([]);
  const { cartItems } = React.useContext(ApplicationContext);

  const initialImagesLoad = async () => {
    const imagesList = await getImages();
    imagesList.map(image => {
      const imageInCart = cartItems.filter(item => item.id === image.id);
      if (imageInCart.length > 0) {
        image.selected = true;
      }
      return image;
    });
    setImages(imagesList);
  };

  const updateImagesSelectedStatus = () => {
    const imagesList = images.reduce((newList, image) => {
      const imageInCart = cartItems.filter(item => item.id === image.id);
      if (imageInCart.length === 0 && image.selected) {
        const newImage = {
          ...image,
          selected: imageInCart.length === 0 ? false : true,
        };
        newList = [...newList, { ...newImage, selected: false }];
      } else {
        newList = [...newList, image];
      }
      return newList;
    }, []);
    setImages(imagesList);
  };

  const setImagesList = (imagesList: ImagesVm[]) => {
    const newImagesList = [...imagesList];
    setImages(newImagesList);
  };

  React.useEffect(() => {
    initialImagesLoad();
  }, []);

  React.useEffect(() => {
    updateImagesSelectedStatus();
  }, [cartItems]);

  return (
    <ImagesListComponent imagesList={images} setImagesList={setImagesList} />
  );
};
