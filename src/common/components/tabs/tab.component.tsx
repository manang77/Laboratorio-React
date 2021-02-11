import React from 'react';
import Tab, { TabProps } from '@material-ui/core/Tab';

type Props = TabProps;

export const TabComponent: React.FC<Props> = props => {
  const { ...otherProps } = props;

  return <Tab {...otherProps} />;
};
