import React, { useRef, useCallback, useLayoutEffect } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import GeneralTemplate from '/components/GeneralTemplate';
import CoinHomeSkeleton from '/components/skeletonPlaceholder/CoinHomeSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';
import SettingModal from '/components/setting/SettingModal';
import Overview from '/components/portfolio/Overview';
import { PortfolioDataProvider } from '/components/portfolio/PortfolioDataContext';



const OverviewScreen = ({ navigation }: StackScreenProps<any>) => {
  const { theme } = useGlobalTheme();
  const settingModalRef = useRef<BottomSheetModal>(null);

  const handleSettingPress = useCallback(() => {
    settingModalRef.current?.present();
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
        <SettingModal ref={settingModalRef}/>
        <PortfolioDataProvider>
          <Overview/>
        </PortfolioDataProvider>
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default OverviewScreen;
