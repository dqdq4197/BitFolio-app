import React, { useState, useEffect } from 'react';
import { 
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import styled from 'styled-components/native';
import { useAppSelector } from '/hooks/useRedux';
import PortfolioItem from './PortfolioItem';
import FooterView from './FooterView';
import useGlobalTheme from '/hooks/useGlobalTheme';


const { width } = Dimensions.get('window');

const OverView = () => {

  const { theme } = useGlobalTheme();
  const { portfolios } = useAppSelector(state => state.portfolioReducer);
  const [activePageNum, setActivePageNum] = useState(0);
  const [visible, setVisible] = useState(false);
  const setModalVisible = () => {
    setVisible(false)
  }

  const handleScrollEnd = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    
    let pageNum = Math.floor(contentOffset.x / layoutMeasurement.width);
    setActivePageNum(pageNum);
  }
  
  if(!portfolios) return <></>
  return (
    <>
      <ScrollView 
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
      >
        { portfolios.map(portfolio => {
            return (
              <PortfolioItem
                key={portfolio.id}
                data={portfolio}
              />
              )
            }) 
        }
        <FooterView />
      </ScrollView>
      {/* <Button onPress={() => setVisible(!visible)}>
        <Text fontXL>
          추가
        </Text>
      </Button> */}
      {/* <FormModal visible={visible} setModalVisible={setModalVisible}/> */}
    </>
  )
}

export default OverView;

const ScrollView = styled.ScrollView`
  background-color: ${({ theme }) => theme.base.background.surface};
`