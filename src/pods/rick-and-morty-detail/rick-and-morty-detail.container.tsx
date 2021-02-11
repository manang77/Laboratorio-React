import React from 'react';
import { useParams } from 'react-router-dom';
import { getRickAndMortyDetailData } from './rick-and-morty-detail.api.vm';
import { RickAndMortyDetailComponent } from './rick-and-morty-detail.component';
import {
  RickAndMortyDetailVm,
  getNewRickAndMortyDetailVm,
} from './rick-and-morty-detail.vm';

interface RickAndMortyDetailParams {
  id: string;
}

export const RickAndMortyDetailContainer: React.FC = () => {
  const { id } = useParams<RickAndMortyDetailParams>();
  const [
    rickAndMortyDetailCharacter,
    setRickAndMortyDetailCharacter,
  ] = React.useState<RickAndMortyDetailVm>(getNewRickAndMortyDetailVm());

  const loadGitUser = async () => {
    const viewModelGitUserData: RickAndMortyDetailVm = await getRickAndMortyDetailData(
      id
    );
    setRickAndMortyDetailCharacter(viewModelGitUserData);
  };

  React.useEffect(() => {
    loadGitUser();
  }, []);

  return (
    <>
      <RickAndMortyDetailComponent
        rickAndMortyCharacter={rickAndMortyDetailCharacter}
      />
    </>
  );
};
