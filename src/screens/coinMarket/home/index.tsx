import React, { useRef, useCallback, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import GeneralTemplate from '/components/GeneralTemplate';
import Layout from '/components/coinMarket/Layout';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Modal from '/components/common/BottomSheetModal';
import MainSetting from '/components/setting/MainSetting';
import Language from '/components/setting/Language';
import Currency from '/components/setting/Currency';
 

const HomeScreen = ({ navigation }: any) => {

  const { theme } = useGlobalTheme();
  const mainModalRef = useRef<BottomSheetModal>(null);
  const languageModalRef = useRef<BottomSheetModal>(null);
  const currencyModalRef = useRef<BottomSheetModal>(null);

  const handleSettingPress = useCallback(() => {
    mainModalRef.current?.present();
  }, []);

  const handleLanguagePress = useCallback(() => {
    languageModalRef.current?.present();
  }, [])

  const handleCurrencyPress = useCallback(() => {
    currencyModalRef.current?.present();
  }, [])

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
            // onPress={handleSearchPress}
          />
          <Ionicons 
            name="md-settings-outline" 
            size={24} 
            color={theme.base.text[200]} 
            onPress={handleSettingPress}
          />
        </IconWrap>
      )
    })
  }, [theme])

  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<MarketListSkeleton />}>
        <Layout />
        <Modal
          key="main"
          ref={mainModalRef}
          snapPoints={['50%', '75%']}
        >
          <MainSetting 
            onLanguagePress={handleLanguagePress}
            onCurrencyPress={handleCurrencyPress}
          />
        </Modal>
        <Modal
          key="language"
          ref={languageModalRef}
          snapPoints={['25%', '25%']}
        >
          <Language/>
        </Modal>
        <Modal
          key="currency"
          ref={currencyModalRef}
          snapPoints={['35%', '35%']}
        >
          <Currency/>
        </Modal>
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default HomeScreen;

const IconWrap = styled.View`
  flex-direction: row;
  align-items: center;
`