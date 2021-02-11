import React from 'react';
import { ApplicationContext } from 'common-app/context';
import { ExercisesComponent } from './exercises.component';
import { DashboardItemProps } from 'common/components';
import GitHubIcon from '@material-ui/icons/GitHub';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';
import { routes } from 'core/router';

export const ExercisesContainer: React.FC = () => {
  const {
    setGitUsersCompany,
    setGitUsersNavigationPage,
    setRickAndMortySearchText,
    setRickAndMortyNavigationPage,
  } = React.useContext(ApplicationContext);

  const items: DashboardItemProps[] = React.useMemo(
    (): DashboardItemProps[] => [
      {
        title: 'GIT Users',
        linkTo: routes.gitUsers,
        icon: GitHubIcon,
      },
      {
        title: 'Ricky and Morthy Characters',
        linkTo: routes.rickyMortyCharacters,
        icon: PersonalVideoIcon,
      },
      {
        title: 'Images List',
        linkTo: routes.imagesList,
        icon: WallpaperIcon,
      },
      {
        title: 'Invoices',
        linkTo: routes.invoices,
        icon: ReceiptIcon,
      },
    ],
    []
  );
  React.useEffect(() => {
    setGitUsersCompany('Lemoncode');
    setGitUsersNavigationPage(0);
    setRickAndMortySearchText('');
    setRickAndMortyNavigationPage(0);
  }, []);
  return <ExercisesComponent items={items} />;
};
