import React, { useState } from 'react';
import { RefreshControl } from 'react-native';


type ControlProps = {
  todo: () => void;
}

const wait = (timeout:number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const CustomRefreshControl = ({todo}:ControlProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      todo();
      setRefreshing(false);
    });
  }, []);
  
  return (
    <RefreshControl
      colors={["#9Bd35A", "white"]}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  )
}

export default CustomRefreshControl;