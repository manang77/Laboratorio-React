import { imagesListMockData } from './images-list.mock.data';
import { ImagesApi } from './images-list.api.model';

export const getImagesApi = async (): Promise<ImagesApi[]> => {
  return imagesListMockData;
}
