import React, { useRef, useCallback, useLayoutEffect } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import GeneralTemplate from '/components/GeneralTemplate';
import CoinHomeSkeleton from '/components/skeletonPlaceholder/CoinHomeSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';
import SettingModal from '/components/setting/SettingModal';
import OverView from '/components/portfolio/OverView';



const OverviewScreen = ({ navigation }: StackScreenProps<any>) => {
  const { theme } = useGlobalTheme();
  const mainModalRef = useRef<BottomSheetModal>(null);

  const handleSettingPress = useCallback(() => {
    mainModalRef.current?.present();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons 
          name="md-settings-outline" 
          size={24} 
          color={theme.base.text[200]} 
          onPress={handleSettingPress}
        />
      )
    })
  }, [theme])

  
  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<CoinHomeSkeleton />}>
        <SettingModal ref={mainModalRef}/>
        <OverView/>
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default OverviewScreen;
