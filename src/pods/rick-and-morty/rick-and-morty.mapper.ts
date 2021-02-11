import { RickAndMortyApiModel, Character } from './api';
import {
  RickAndMortyVm,
  RickAndMortyDataVm,
  getNewRickAndMortyVm,
  getNewRickAndMortyDataVm,
} from './rick-and-morty.vm';

const mapRickAndMortyCharacterDataFromApiToVM = (
  apiCharacterData: Character
): RickAndMortyDataVm => {
  const rickAndMortyDataVm: RickAndMortyDataVm = getNewRickAndMortyDataVm();
  rickAndMortyDataVm.image = apiCharacterData.image;
  rickAndMortyDataVm.name = apiCharacterData.name;
  rickAndMortyDataVm.id = apiCharacterData.id.toString();
  return rickAndMortyDataVm;
};

export const mapRickAndMortyDataFromApiToVM = (
  rickAndMortyApiData: RickAndMortyApiModel
): RickAndMortyVm => {
  const rickAndMortyVM: RickAndMortyVm = getNewRickAndMortyVm();
  rickAndMortyVM.config.pages = rickAndMortyApiData.info.pages;
  rickAndMortyVM.config.count = rickAndMortyApiData.info.count;
  rickAndMortyVM.rickAndMortyCharactersData = rickAndMortyApiData.results.map(
    character => mapRickAndMortyCharacterDataFromApiToVM(character)
  );
  return rickAndMortyVM;
};
