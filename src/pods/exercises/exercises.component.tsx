import React from 'react';
import { DashboardComponent, DashboardItemProps } from 'common/components';

interface Props {
  items: DashboardItemProps[];
}

export const ExercisesComponent: React.FC<Props> = props => {
  const { items } = props;
  return <DashboardComponent items={items} />;
};
