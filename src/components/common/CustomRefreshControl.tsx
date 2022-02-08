import React from 'react';
import { RefreshControl } from 'react-native';
import useGlobalTheme from '/hooks/useGlobalTheme';

type ControlProps = {
  onRefresh: () => void;
  refreshing: boolean;
};

const CustomRefreshControl = ({ onRefresh, refreshing }: ControlProps) => {
  const { theme } = useGlobalTheme();

  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={{ zIndex: 999 }}
      tintColor={theme.base.text[300]}
    />
  );
};

export default CustomRefreshControl;
