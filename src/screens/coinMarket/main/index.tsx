import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components/native';

import useGlobalTheme from '/hooks/useGlobalTheme';

import Layout from '/components/coinMarket/Layout';
import AsyncBoundary from '/components/common/AsyncBoundary';
import GeneralTemplate from '/components/GeneralTemplate';
import SettingModal from '/components/setting/SettingModal';
import { CoinHomeSkeleton } from '/components/skeletonPlaceholder/coinMarketHome';

const HomeScreen = ({ navigation }: StackScreenProps<any>) => {
  const settingModalRef = useRef<BottomSheetModal>(null);
  const { theme } = useGlobalTheme();

  const handleSettingPress = useCallback(() => {
    settingModalRef.current?.present();
  }, [settingModalRef]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconWrap>
          <Ionicons
            name="search-sharp"
            size={28}
            color={theme.base.text[200]}
            style={{
              marginRight: 20,
            }}
            onPress={() => navigation.navigate('CoinSearch')}
          />
          <Ionicons
            name="md-settings-outline"
            size={24}
            color={theme.base.text[200]}
            onPress={handleSettingPress}
          />
        </IconWrap>
      ),
    });
  }, [handleSettingPress, navigation, theme]);

  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<CoinHomeSkeleton />}>
        <SettingModal ref={settingModalRef} />
        <Layout />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default HomeScreen;

const IconWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;
