import React, { useLayoutEffect, useRef, useState } from 'react';
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
import FormModal from '/components/portfolio/FormModal';

 

const HomeScreen = ({ navigation }: StackScreenProps<any>) => {
  const mainModalRef = useRef<BottomSheetModal>(null);
  const { theme } = useGlobalTheme();
  const [visible, setVisible] = useState(false);

  const handleSettingPress = () => {
    mainModalRef.current?.present();
  }

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
      )
    })
  }, [theme])

  const setModalVisible = () => {
    setVisible(false)
  }

  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<CoinHomeSkeleton />}>
        <Layout />
        <SettingModal ref={mainModalRef}/>
        <FormModal visible={visible} setModalVisible={setModalVisible}/>
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default HomeScreen;

const IconWrap = styled.View`
  flex-direction: row;
  align-items: center;
`