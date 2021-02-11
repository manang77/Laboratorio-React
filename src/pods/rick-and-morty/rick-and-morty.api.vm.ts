import { RickAndMortyVm } from './rick-and-morty.vm';
import { RickAndMortyApiModel } from './api';
import { getRickAndMorthyCharacters } from './api';
import { mapRickAndMortyDataFromApiToVM } from './rick-and-morty.mapper';

export const getRickAndMortyData = async (
  page: number,
  name: string
): Promise<RickAndMortyVm> => {
  const rickAndMortyApi: RickAndMortyApiModel = await getRickAndMorthyCharacters(
    page,
    name
  );
  const rickAndMortyVm: RickAndMortyVm = mapRickAndMortyDataFromApiToVM(
    rickAndMortyApi
  );
  return rickAndMortyVm;
};
