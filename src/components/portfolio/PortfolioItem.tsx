import React, { useState, useRef, useEffect } from 'react';
import { 
  Dimensions, 
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView
} from 'react-native';
import styled, { css } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { PortfolioType } from '/store/portfolio';
import Text from '/components/common/Text';
import CoinList from './CoinList';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import CoinItem from './CoinItem';
import useGlobalTheme from '/hooks/useGlobalTheme';



const { width, height } = Dimensions.get('window');
const WIDGET_HEIGHT = 150;
const COL_WIDTH = (width - 32 - 100) / 2;
interface AlignType {
  align?: 'right' | 'left';
}

interface SortBarProps extends AlignType {
  onPress?: () => void;
  text: string;
}

type ItemProps = {
  item: PortfolioType;
  coinsData?: CoinMarketReturn[];
}


const PortfolioItem = ({ item, coinsData }: ItemProps) => {

  const translateY = useRef(new Animated.Value(0)).current;
  const [isExpanding, setIsExpanding] = useState(false);
  const [coins, setCoins] = useState<CoinMarketReturn[] | undefined>([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if(coinsData) {
      let data:CoinMarketReturn[] | undefined = [];
      data = coinsData?.filter(data => {
        for(let i = 0; i < item.coins.length; i++) {
          if(item.coins[i].id === data.id) {
            return true;
          }
        }
      })

      setCoins(data);
    }
  }, [item, coinsData])

  // const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   const { nativeEvent: { contentOffset: { y } } } = event;
  //   setScrollY(y);

  //   if(isExpanding && y <= -50) {
  //     Animated.spring(translateY, {
  //       toValue: 0,
  //       delay: 0,
  //       speed: 20,
  //       useNativeDriver: true
  //     }).start(
  //       () => setIsExpanding(false)
  //     );
  //   }

  //   if(!isExpanding && y >= 50) {
  //     Animated.spring(translateY, {
  //       toValue: -WIDGET_HEIGHT,
  //       delay: 0, 
  //       speed: 20,
  //       useNativeDriver: true,
  //     }).start(
  //       () => setIsExpanding(true)
  //     );
  //   }
  // }

  return (
    <Container
      as={Animated.ScrollView}
      onScroll={
        Animated.event(
          [ { nativeEvent: { contentOffset: { y: scrollY } } } ], 
          { useNativeDriver: true }
        )
      }
    >
      <HeaderContainer>
        <WidgetWrap
          as={Animated.View}
        >
          <Text fontML bold color100>
            { item.name }
          </Text>
        </WidgetWrap>
      </HeaderContainer>
      { item.coins.length !== 0
        ? <ListSheet>
            <CoinList
              portfolioId={item.id}
              dataEnteredByTheUser={item.coins}
              officialData={coins}
              scrollY={scrollY}
            />
          </ListSheet>
        : <EmptyView>
            <Text>
              아이템이 없습니다.
              추가해주세요
            </Text>
          </EmptyView>
      }
    </Container>
  )
}

export default PortfolioItem;

type SortTabProps = {
  align?: 'right' | 'left';
}

const Container = styled.ScrollView`
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
const ListSheet = styled.View`
  width: ${ width }px;
  min-height: ${ height - 110 }px;
  padding: 0 ${({ theme }) => theme.content.spacing};
  background-color: ${({ theme }) => theme.base.background.surface};
`

const EmptyView = styled.View`

`