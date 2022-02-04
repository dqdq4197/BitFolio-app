import React, { useLayoutEffect, useRef, useCallback } from 'react';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

import useGlobalTheme from '/hooks/useGlobalTheme';

import GeneralTemplate from '/components/GeneralTemplate';
import Layout from '/components/coinMarket/Layout';
import CoinHomeSkeleton from '/components/skeletonPlaceholder/CoinHomeSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';
import SettingModal from '/components/setting/SettingModal';


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
    })
  }, [theme]);

  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<CoinHomeSkeleton />}>
        <SettingModal ref={settingModalRef} />
        <Layout />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  );
};

export default HomeScreen;

const IconWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;
