import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import useGlobalTheme from '/hooks/useGlobalTheme';

type ControlProps = {
  onRefresh: () => void,
  refreshing: boolean,
}

const CustomRefreshControl = ({ onRefresh, refreshing }:ControlProps) => {
  const scheme = useColorScheme();
  const theme = useGlobalTheme();
  
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={
        scheme === 'dark' 
        ? theme.base.text[300] 
        : theme.base.background['200']
      }
    />
  )
}

export default CustomRefreshControl;