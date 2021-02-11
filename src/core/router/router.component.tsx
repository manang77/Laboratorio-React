import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { switchRoutes } from './routes';
import {
  ExercisesScene,
  GitUsersScene,
  GitUserDetailScene,
  RickAndMortyScene,
  RickAndMortyDetailScene,
  ImagesListScene,
  InvoicesScene,
  InvoiceScene,
} from 'scenes';

export const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact={true}
          path={[switchRoutes.root, switchRoutes.exercises]}
          component={ExercisesScene}
        />
        <Route
          exact={true}
          path={[switchRoutes.gitUsers]}
          component={GitUsersScene}
        />
        <Route
          exact={true}
          path={[switchRoutes.gitUserDetail]}
          component={GitUserDetailScene}
        />
        <Route
          exact={true}
          path={[switchRoutes.rickyMortyCharacters]}
          component={RickAndMortyScene}
        />
        <Route
          exact={true}
          path={[switchRoutes.imagesList]}
          component={ImagesListScene}
        />
        <Route
          exact={true}
          path={[switchRoutes.rickAndMortyCharacterDetail]}
          component={RickAndMortyDetailScene}
        />
        <Route
          exact={true}
          path={[switchRoutes.invoices]}
          component={InvoicesScene}
        />
        <Route
          exact={true}
          path={[switchRoutes.invoice]}
          component={InvoiceScene}
        />
      </Switch>
    </Router>
  );
};
