import Axios from 'axios';
import {
  RickAndMortyApiModel,
  getNewRickAndMortyApiModel,
} from './rick-and-morty.api.model';

export const getRickAndMorthyCharacters = async (
  page: number,
  name: string
): Promise<RickAndMortyApiModel> => {
  const urlBase = `https://rickandmortyapi.com/api/character/?page=${page.toString()}`;
  try {
    const rickAndMortyCharacters = await Axios.get<RickAndMortyApiModel>(
      urlBase + (name ? `&name=${name}` : '')
    )
      .then(response => response.data)
      .then(data => data);
    return rickAndMortyCharacters;
  } catch {
    return getNewRickAndMortyApiModel();
  }
};
