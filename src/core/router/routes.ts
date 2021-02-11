import { generatePath } from 'react-router-dom';

type NavigateByParam = (id: string) => string;

interface SwitchRoutes {
  root: string;
  exercises: string;
  gitUsers: string;
  gitUserDetail: string;
  rickyMortyCharacters: string;
  rickAndMortyCharacterDetail: string;
  imagesList: string;
  invoices: string;
  invoice: string;
}

export const switchRoutes: SwitchRoutes = {
  root: '/',
  exercises: '/exercises',
  gitUsers: '/git-users',
  gitUserDetail: '/git-user-detail/:id',
  rickyMortyCharacters: '/ricky-and-morthy-characters',
  rickAndMortyCharacterDetail: '/ricky-and-morthy-detail/:id',
  imagesList: '/images-list',
  invoices: '/invoices',
  invoice: '/invoice/:id',
};

interface Routes
  extends Omit<
    SwitchRoutes,
    'gitUserDetail' | 'rickAndMortyCharacterDetail' | 'invoice'
  > {
  gitUserDetail: NavigateByParam;
  rickAndMortyCharacterDetail: NavigateByParam;
  invoice: NavigateByParam;
}

export const routes: Routes = {
  ...switchRoutes,
  gitUserDetail: id => generatePath(switchRoutes.gitUserDetail, { id }),
  rickAndMortyCharacterDetail: id =>
    generatePath(switchRoutes.rickAndMortyCharacterDetail, { id }),
  invoice: id => generatePath(switchRoutes.invoice, { id }),
};
