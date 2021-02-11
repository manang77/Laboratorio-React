import { RickAndMortyCharacterDataApi } from './api';
import { RickAndMortyDetailVm } from './rick-and-morty-detail.vm';

export const mapRickAndMortyCharacterDataFromApiToVM = (
  rickAndMortyCharacterDataApi: RickAndMortyCharacterDataApi
): RickAndMortyDetailVm => {
  const rickAndMortyDetailVm: RickAndMortyDetailVm = {
    id: rickAndMortyCharacterDataApi.id.toString(),
    name: rickAndMortyCharacterDataApi.name,
    status: rickAndMortyCharacterDataApi.status,
    species: rickAndMortyCharacterDataApi.species,
    gender: rickAndMortyCharacterDataApi.gender,
    origin: rickAndMortyCharacterDataApi.origin.name,
    location: rickAndMortyCharacterDataApi.location.name,
    image: rickAndMortyCharacterDataApi.image,
  };
  return rickAndMortyDetailVm;
};
