import React, { useState, useRef, useEffect } from 'react';
import { 
  Dimensions, 
  Animated,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { PortfolioType } from '/store/portfolio';
import Text from '/components/common/Text';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import CoinListSheet from './CoinListSheet';
import usePortfolioCoinStats from '/hooks/usePortfolioCoinStats';



const { width, height } = Dimensions.get('window');
const WIDGET_HEIGHT = 150;

const COL_WIDTH = (width - 32) / 3;
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
  const scrollY = useRef(new Animated.Value(0)).current;
  const { coinStats } = usePortfolioCoinStats({ id: item.id });
  const [coins, setCoins] = useState<CoinMarketReturn[] | undefined>(undefined);


  useEffect(() => {
    console.log(coinStats);
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

  return (
    <Container
      as={Animated.ScrollView}
      onScroll={
        Animated.event(
          [ { nativeEvent: { contentOffset: { y: scrollY } } } ], 
          { useNativeDriver: true }
        )
      }
      stickyHeaderIndices={[1]}
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
      <CoinListSheet 
        item={item}
        coinsData={coins}
      />
    </Container>
  )
}

export default PortfolioItem;

type StickyViewProps = {
  width: number
}
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
  background-color: ${({ theme }) => theme.base.background.surface};
  padding: 0 ${({ theme }) => theme.content.spacing};
`

const HorizontalScrollView = styled.ScrollView`
  /* margin-left: ${ COL_WIDTH }px; */
  background-color: ${({ theme }) => theme.base.background.surface};
`

const EmptyView = styled.View`

`

const SortBar = styled.View`
  flex-direction: row;
  height: 30px;
`

const R = styled.View`
  background-color: purple;
  height: 30px;
  width: ${ COL_WIDTH }px;
`
const L = styled.View`
  background-color: rosybrown;
  height: 30px;
  width: ${ COL_WIDTH }px;
`
const RE = styled.View`
  background-color: saddlebrown;
  height: 30px;
  width: ${ COL_WIDTH }px;
`
const RR = styled.View`
  background-color: salmon;
  height: 30px;
  width: ${ COL_WIDTH }px;
`
const AddTrackingButton = styled.TouchableOpacity`
  position: absolute;
  width: 60px;
  height: 30px;
  bottom: 50px;
  background-color: ${({ theme }) => theme.base.primaryColor};
`

const View = styled.View`
  flex-direction: row;
  height: 50px;
  background-color: white;
`

const HeadView = styled.View`
  position: absolute;
  flex-direction: row;
  height: 50px;
  background-color: black;
  width: 100px;
  z-index: 11;

`

const Red = styled.View`
  background-color: red;
  width: ${ COL_WIDTH }px;
  height: 50px;
`

const Blue = styled.View`
  background-color: blue;
  width: ${ COL_WIDTH }px;
  height: 50px;
`

const Green = styled.View`
  background-color: green;
  width: ${ COL_WIDTH }px;
  height: 50px;
`

const Black = styled.View`
  background-color: black;
  width: ${ COL_WIDTH }px;
  height: 50px;
`

const Viee = styled.View``

const Name= styled.View`
  position: absolute;
  left: 0;
`

const CoinListContainer = styled.View`
  flex-direction: row;
  padding: 0 ${({ theme }) => theme.content.spacing};
`

const StickyView = styled.View`
  position: absolute;
  width: ${ COL_WIDTH }px;
  z-index: 11;
  left: ${({ theme }) => theme.content.spacing};
`

const Vertical = styled.ScrollView`

`

const Row = styled.View`
  height: 60px;
`

const NameWrap = styled.View`
  flex-direction: row;
  height: 60px;
`