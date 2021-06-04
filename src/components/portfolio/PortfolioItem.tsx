import React, { useState, useRef } from 'react';
import { 
  Dimensions, 
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import styled from 'styled-components/native';
import { PortfolioType } from '/store/portfolio';
import Text from '/components/common/Text';
import CoinList from './CoinList';

const { width, height } = Dimensions.get('window');
const WIDGET_HEIGHT = 150;

type ItemProps = {
  data: PortfolioType;
}

const PortfolioItem = ({ data }: ItemProps) => {
  const translateY = useRef(new Animated.Value(WIDGET_HEIGHT)).current;
  const [isSheetFocus, setIsSheetFocus] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { nativeEvent: { contentOffset: { y } } } = event;
    if(isSheetFocus && y <= -50) {
      Animated.spring(translateY, {
        toValue: WIDGET_HEIGHT,
        delay: 0,
        useNativeDriver: true
      }).start(
        () => setIsSheetFocus(false)
      );
    }

    if(!isSheetFocus && y >= 50) {
      Animated.spring(translateY, {
        toValue: 0,
        delay: 0,
        useNativeDriver: true,
      }).start(
        () => setIsSheetFocus(true)
      );
    }
  }

  return (
    <Container>
      <HeaderContainer>
        <WidgetWrap>
          <Text fontML bold color100>
            { data.name }
          </Text>
        </WidgetWrap>
      </HeaderContainer>
      { data.coins.length !== 0
        ? <ListSheet
            as={Animated.ScrollView}
            onScroll={handleScroll}
            scrollEventThrottle={32}
            style={{
              transform: [{ 
                translateY: translateY,
              }]
            }}
          >
            <CoinList 
              coins={data.coins}
            />
          </ListSheet>
        : <EmptyView>
          </EmptyView>
      }
      
    </Container>
  )
}

export default PortfolioItem;

const Container = styled.View`
  width: ${ width }px;
  flex: 1;
`
const HeaderContainer = styled.View`
  padding: 0 ${({ theme }) => theme.content.spacing};
  height: ${ WIDGET_HEIGHT + 20 }px;
  align-items: center;
  padding-top: 20px;
`
const WidgetWrap = styled.View`
  width: 100%;
  height: 120px;
  border-radius: ${({ theme }) => theme.border.ml};
  padding: ${({ theme }) => theme.content.spacing};
  background-color: ${({ theme }) => theme.colors.purple['900']};
`
const ListSheet = styled.ScrollView`
  position: absolute;
  bottom: 0;
  width: ${ width }px;
  min-height: ${ height - 110}px;
  padding: 40px ${({ theme }) => theme.content.spacing};
  background-color: ${({ theme }) => theme.base.background.surface};
`

const EmptyView = styled.View`

`
