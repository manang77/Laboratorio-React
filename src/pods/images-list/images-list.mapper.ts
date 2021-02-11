import { ImagesApi } from './api';
import { ImagesVm } from './images-list.vm';

const mapImageFromApiToVM = ({ id, specie, title, picURL }): ImagesVm => {
  return {
    id,
    specie,
    title,
    picURL,
    selected: false,
  };
};

export const mapImagesListFromApiToVM = (
  imagesListApi: ImagesApi[]
): ImagesVm[] => {
  const imagesListVM = imagesListApi.map(image => mapImageFromApiToVM(image));
  return imagesListVM;
};
