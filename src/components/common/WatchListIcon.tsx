import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { changeWatchList } from '/store/baseSetting';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppDispatch, useAppSelector } from '/hooks/useRedux';

type IconProps = {
  id: string,
  size: number,
}
const WatchListIcon = ({ id, size }: IconProps) => {

  const { watchList } = useAppSelector(state => state.baseSettingReducer);
  const { theme, scheme } = useGlobalTheme();
  const dispatch = useAppDispatch();

  const handleHeartPress = () => {
    dispatch(changeWatchList(id))
    Haptics.impactAsync();
  }

  return (
    <Ionicons
      onPress={handleHeartPress}
      name="heart-sharp"
      size={size}
      color={
        watchList.includes(id)
          ? theme.base.primaryColor
          : scheme === 'dark'
            ? theme.base.text[300]
            : theme.base.background[400]
      }
    />
  )
}

export default WatchListIcon;