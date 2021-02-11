import React from 'react';
import { ImagesVm } from '../images-list.vm';
import { ImageComponent } from './image.component';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

interface Props {
  images: ImagesVm[];
  setImagesStatus: (images: ImagesVm[]) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingLeft: '160px',
      paddingTop: '100px',
    },
  })
);

export const ImagesComponent: React.FC<Props> = props => {
  const { images, setImagesStatus } = props;
  const classes = useStyles();

  const updateImageBuyStatus = (image: ImagesVm) => {
    const updatedImages = images.map(im => {
      if (im.id === image.id) {
        return image;
      }
      return im;
    });

    setImagesStatus(updatedImages);
  };

  return (
    <>
      <Grid
        className={classes.root}
        container
        spacing={4}
        wrap={'wrap'}
        justify={'flex-start'}
      >
        {images.map(image => (
          <Grid key={image.id} item xs={3}>
            <ImageComponent
              key={image.id}
              image={image}
              updateImageBuyStatus={updateImageBuyStatus}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
