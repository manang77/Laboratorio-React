import React from 'react';
import { hot } from 'react-hot-loader/root';
import { RouterComponent } from 'core/router';
import { ThemeProviderComponent } from 'core/theme';
import { ApplicationContextProvider } from 'common-app/context';
import { Cart } from './common/components';

const App: React.FunctionComponent = () => {
  return (
    <ThemeProviderComponent>
      <ApplicationContextProvider>
        <RouterComponent />
        <Cart />
      </ApplicationContextProvider>
    </ThemeProviderComponent>
  );
};

export default hot(App);
