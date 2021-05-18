import React from 'react';
import styled from 'styled-components/native';
import useGlobalTheme from '/hooks/useGlobalTheme';
import GeneralTemplate from '/components/GeneralTemplate';
import Layout from '/components/coinMarket/Layout';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';
import { Ionicons } from '@expo/vector-icons';
import {
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import Modal from '/components/common/BottomSheetModal';
 

const HomeScreen = ({ navigation }: any) => {

  const { theme } = useGlobalTheme();
  const [visible , setVisible] = React.useState(false);
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const handlePresentModalPress = React.useCallback(() => {
    console.log('눌렀다')
    setVisible(!visible);
    bottomSheetModalRef.current?.present();
  }, []);

  React.useLayoutEffect(() => {
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
            onPress={handlePresentModalPress}
          />
        </IconWrap>
      )
    })
  }, [])
  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<MarketListSkeleton />}>
        <Layout />
        <Modal ref={bottomSheetModalRef} visible={visible}> 
          <Text>
            asdasdz
          </Text>
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

const Text = styled.Text`
  font-size: 20px;
  color: white;
`