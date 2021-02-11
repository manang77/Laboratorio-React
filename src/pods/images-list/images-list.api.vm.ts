import { getImagesApi, ImagesApi } from './api';
import { ImagesVm } from './images-list.vm';
import { mapImagesListFromApiToVM } from './images-list.mapper';

export const getImages = async (): Promise<ImagesVm[]> => {
  const imagesListApi: ImagesApi[] = await getImagesApi();
  const imagesListVm: ImagesVm[] = mapImagesListFromApiToVM(imagesListApi);
  return imagesListVm;
};
