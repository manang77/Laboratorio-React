import React from 'react';
import {
  TabComponent,
  TabListComponent,
  TabPanelComponent,
} from 'common/components';
import AppBar from '@material-ui/core/AppBar';
import { ImagesVm } from './images-list.vm';
import { ImagesComponent } from './components';

interface Props {
  imagesList: ImagesVm[];
  setImagesList: (imagesList: ImagesVm[]) => void;
}

export const ImagesListComponent: React.FC<Props> = props => {
  const [tab, setTab] = React.useState(0);
  const { imagesList, setImagesList } = props;
  const [catsList, setCatsList] = React.useState([]);
  const [dogsList, setDogsList] = React.useState([]);

  const setImagesStatusCats = (imagesList: ImagesVm[]) => {
    const allImages = [...dogsList, ...imagesList];
    setCatsList(imagesList);
    setImagesList(allImages);
  };

  const setImagesStatusDogs = (imagesList: ImagesVm[]) => {
    const allImages = [...catsList, ...imagesList];
    setDogsList(imagesList);
    setImagesList(allImages);
  };
  React.useEffect(() => {
    const catsImages = imagesList.filter(image => image.specie === 'cat');
    const dogsImages = imagesList.filter(image => image.specie === 'dog');
    setCatsList(catsImages);
    setDogsList(dogsImages);
  }, [imagesList]);

  return (
    <>
      <AppBar position="static">
        <TabListComponent value={tab} onChange={setTab}>
          <TabComponent label="Cats" />
          <TabComponent label="Dogs" />
        </TabListComponent>
      </AppBar>
      <TabPanelComponent value={tab} index={0}>
        <ImagesComponent
          images={catsList}
          setImagesStatus={setImagesStatusCats}
        />
      </TabPanelComponent>
      <TabPanelComponent value={tab} index={1}>
        <ImagesComponent
          images={dogsList}
          setImagesStatus={setImagesStatusDogs}
        />{' '}
      </TabPanelComponent>
    </>
  );
};
