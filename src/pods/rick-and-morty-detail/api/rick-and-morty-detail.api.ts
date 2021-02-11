import Axios from 'axios';
import { RickAndMortyCharacterDataApi } from './rick-and-morty-detail.api.model';

export const getRickAndMorthyCharacterDetail = async (
  id: string
): Promise<RickAndMortyCharacterDataApi> => {
  const urlBase = `https://rickandmortyapi.com/api/character/${id}`;
  try {
    const rickAndMortyCharacterDetail = await Axios.get<
      RickAndMortyCharacterDataApi
    >(urlBase)
      .then(response => response.data)
      .then(data => data);
    return rickAndMortyCharacterDetail;
  } catch {
    console.log('Not such character');
  }
};
