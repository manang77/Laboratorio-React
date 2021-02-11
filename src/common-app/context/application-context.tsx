import React from 'react';
import { ImagesVm } from 'pods/images-list/images-list.vm';

interface ApplicationContext {
  gitUsersCompany: string;
  setGitUsersCompany: (value: string) => void;
  gitUsersNavigationPage: number;
  setGitUsersNavigationPage: (value: number) => void;
  rickAndMortySearchText: string;
  setRickAndMortySearchText: (value: string) => void;
  rickAndMortyNavigationPage: number;
  setRickAndMortyNavigationPage: (value: number) => void;
  cartVisibleStatus: boolean;
  setCartVisibleStatus: (value: boolean) => void;
  cartItems: ImagesVm[];
  setCartItems: (imagesVm: ImagesVm[]) => void;
}

export const ApplicationContext = React.createContext<ApplicationContext>({
  gitUsersCompany: '',
  setGitUsersCompany: value => {},
  gitUsersNavigationPage: 0,
  setGitUsersNavigationPage: value => {},
  rickAndMortySearchText: '',
  setRickAndMortySearchText: value => {},
  rickAndMortyNavigationPage: 0,
  setRickAndMortyNavigationPage: value => {},
  cartVisibleStatus: false,
  setCartVisibleStatus: value => {},
  cartItems: [],
  setCartItems: imagesVm => {},
});

export const ApplicationContextProvider = props => {
  const [gitUsersCompany, setGitUsersCompany] = React.useState('Lemoncode');
  const [gitUsersNavigationPage, setGitUsersNavigationPage] = React.useState(0);
  const [rickAndMortySearchText, setRickAndMortySearchText] = React.useState(
    ''
  );
  const [
    rickAndMortyNavigationPage,
    setRickAndMortyNavigationPage,
  ] = React.useState(0);

  const [cartVisibleStatus, setCartVisibleStatus] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);

  return (
    <ApplicationContext.Provider
      value={{
        gitUsersCompany,
        setGitUsersCompany,
        gitUsersNavigationPage,
        setGitUsersNavigationPage,
        rickAndMortySearchText,
        setRickAndMortySearchText,
        rickAndMortyNavigationPage,
        setRickAndMortyNavigationPage,
        cartVisibleStatus,
        setCartVisibleStatus,
        cartItems,
        setCartItems,
      }}
    >
      {props.children}
    </ApplicationContext.Provider>
  );
};
