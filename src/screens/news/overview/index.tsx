import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useLayoutEffect, useRef } from 'react';

import useGlobalTheme from '/hooks/useGlobalTheme';

import AsyncBoundary from '/components/common/AsyncBoundary';
import GeneralTemplate from '/components/GeneralTemplate';
import Overview from '/components/news/Overview';
import SettingModal from '/components/setting/SettingModal';

const OverviewScreen = ({ navigation }: StackScreenProps<any>) => {
  const { theme } = useGlobalTheme();
  const settingModalRef = useRef<BottomSheetModal>(null);

  const handleSettingPress = useCallback(() => {
    settingModalRef.current?.present();
  }, [settingModalRef]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="md-settings-outline"
          size={24}
          color={theme.base.text[200]}
          onPress={handleSettingPress}
        />
      ),
    });
  }, [handleSettingPress, navigation, theme]);

  return (
    <GeneralTemplate>
      <AsyncBoundary>
        <SettingModal ref={settingModalRef} />
        <Overview />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default OverviewScreen;
