import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useColorScheme } from 'react-native-appearance';


type ControlProps = {
  onRefresh: () => void,
  refreshing: boolean,
}

const wait = (timeout:number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const CustomRefreshControl = ({onRefresh, refreshing}:ControlProps) => {
  
  const scheme = useColorScheme();
  
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={scheme === 'dark' ? 'rgb(233, 236, 239)' : '#1B1B1B'}
    />
  )
}

export default CustomRefreshControl;