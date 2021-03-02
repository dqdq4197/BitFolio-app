import React, { useState } from 'react';
import { RefreshControl } from 'react-native';


type ControlProps = {}

const wait = (timeout:number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const CustomRefreshControl = ({}:ControlProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  
  return (
    <RefreshControl
      colors={["#9Bd35A", "#689F38"]}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  )
}

export default CustomRefreshControl;