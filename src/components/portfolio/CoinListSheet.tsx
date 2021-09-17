import React, { useState, useCallback, useEffect } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Text from '/components/common/Text';
import DynamicSizeText from '/components/common/DynamicSizeText';
import Image from '/components/common/Image';
import StatisticsRow from './StatisticsRow';
import FormModal from './transactionModal/FormModal';
import { CoinType, changeSortType, SortType } from '/store/portfolio';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { CoinStatType } from '/hooks/usePortfolioStats';
import { useAppDispatch, useAppSelector, shallowEqual } from '/hooks/useRedux';
import { usePortfolioContext } from './PortfolioDataContext';


const { width } = Dimensions.get('window')
const CONTENT_PADDING = 16;
const COL_WIDTH = (width - CONTENT_PADDING * 2) / 3;

type TabProps = {
  name: string
  onPress: () => void
  align?: 'right' | 'left'
  sortTypes: SortType[]
}

type SheetProps = {
  coinsStats: { [key: string]: CoinStatType }
  portfolioTotalCosts: number
}

type AssetRowProps = {
  id: string
  image: string 
  symbol: string 
  name: string
}

const SortTab = ({ name, onPress, align = 'right', sortTypes }: TabProps) => {
  const { theme } = useGlobalTheme();
  const { portfolios, activeIndex } = useAppSelector(state => ({
    portfolios: state.portfolioReducer.portfolios,
    activeIndex: state.portfolioReducer.activeIndex
  }))
  const { assetSortType } = portfolios[activeIndex];
  const active = sortTypes.indexOf(assetSortType);
  
  return (
    <Tab align={align} onPress={onPress} activeOpacity={0.6}>
      <CustomText 
        margin="0 2px 0 0" heavy
        isActive={active === 0 || active === 1}
      >
        { name }
      </CustomText>
      { (active === 0 || active === -1) && (
        <Ionicons 
            name="ios-chevron-down" 
            size={12} 
            color={active === 0 ? theme.base.text[100] : theme.base.text[200]}
          />
      ) }
      { active === 1 && (
        <Ionicons 
          name="ios-chevron-up" 
          size={12} 
          color={theme.base.text[100]}
        />
      ) }
    </Tab>
  )

}

const AssetRow = ({ id, image, symbol, name }: AssetRowProps) => {
  const navigation = useNavigation();

  const handleRowPress = () => {
    navigation.navigate('portfolioCoinDetail', {
      param: { id, symbol }, 
      screen: 'Overview' 
    })
  }

  return (
    <Row 
      activeOpacity={0.6} 
      onPress={handleRowPress}
    >
      <Image 
        uri={image} 
        width={30}
        height={30} 
        borderRedius='m'
      />
      <NameWrap>
        <DynamicSizeText 
          color100 
          bold
        >
          { symbol.toUpperCase() }
        </DynamicSizeText>
        <AssetIdWrap>
          <Text
            bold 
            fontXS
            ellipsizeMode="tail"
            numberOfLines={ 2 }
          >
            { id.charAt(0).toUpperCase() + id.slice(1) }
          </Text>
        </AssetIdWrap>
      </NameWrap>
    </Row>
  )
}

const CoinListSheet = ({ 
  coinsStats,
  portfolioTotalCosts
}: SheetProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { portfolio, activeIndex } = useAppSelector(state => ({
    portfolio: state.portfolioReducer.portfolios,
    activeIndex: state.portfolioReducer.activeIndex
  }), shallowEqual);
  const { id: portfolioId, coins, coinsData } = usePortfolioContext(); 
  const [visible, setVisible] = useState(false);
  const [sortedCoins, setSortedCoins] = useState<CoinType[]>([]);
  const [modalInitailState, setModalInitialState] = useState({
    id: '',
    symbol: '',
    image: '',
    name: ''
  })
  const { assetSortType } = portfolio[activeIndex];

  useEffect(() => {
    if(coinsData) {
      let temp = coins.slice();
      
      switch(assetSortType) {
        case 'name_asc':
        case 'name_desc':
          temp.sort((a, b) => {
            return assetSortType === 'name_asc' 
              ? a.symbol < b.symbol ? -1 : 1
              : a.symbol > b.symbol ? -1 : 1
          });
          break;
        case 'price_asc':
        case 'price_desc':
          temp.sort((a, b) => {
            const aPrice = coinsData.find(coinData => coinData.id === a.id)!.current_price
            const bPrice = coinsData.find(coinData => coinData.id === b.id)!.current_price

            return assetSortType === 'price_asc' ? bPrice - aPrice : aPrice - bPrice;
          })
          break;
        case 'holding_asc':
        case 'holding_desc':
        case 'allocation_asc':
        case 'allocation_desc':
          temp.sort((a, b) => {
            const aHoldingCosts = coinsStats[a.id] ? coinsStats[a.id].holding_costs : null;
            const bHoldingCosts = coinsStats[b.id] ? coinsStats[b.id].holding_costs : null;

            return assetSortType === 'holding_asc' || assetSortType === 'allocation_asc'
              ? ((aHoldingCosts === null) ? 1 : 0) - ((bHoldingCosts === null) ? 1 : 0) || aHoldingCosts! - bHoldingCosts!
              : ((bHoldingCosts !== null) ? 1 : 0) - ((aHoldingCosts !== null) ? 1 : 0) || bHoldingCosts! - aHoldingCosts!
          })
          break;
        case 'buyPrice_asc':
        case 'buyPrice_desc':
          temp.sort((a, b) => {
            const aBuyAvgPrice = coinsStats[a.id] 
              ? coinsStats[a.id].total_purchase_quantity === 0 
                ? 0
                : coinsStats[a.id].total_purchase_cost / coinsStats[a.id].total_purchase_quantity  
              : null;
            
            const bBuyAvgPrice = coinsStats[b.id]
              ? coinsStats[b.id].total_purchase_quantity === 0 
                ? 0
                : coinsStats[b.id].total_purchase_cost / coinsStats[b.id].total_purchase_quantity  
              : null;

            return assetSortType === 'buyPrice_asc'
              ? ((aBuyAvgPrice === null) ? 1 : 0) - ((bBuyAvgPrice === null) ? 1 : 0) || aBuyAvgPrice! - bBuyAvgPrice!
              : ((bBuyAvgPrice !== null) ? 1 : 0) - ((aBuyAvgPrice !== null) ? 1 : 0) || bBuyAvgPrice! - aBuyAvgPrice!
          })
          break;
        case 'pl_asc':
        case 'pl_desc':
          temp.sort((a, b) => {
            const aPL = coinsStats[a.id] ? coinsStats[a.id].all_time_pl : null;
            const bPL = coinsStats[b.id] ? coinsStats[b.id].all_time_pl : null;

            return assetSortType === 'pl_asc'
              ? ((aPL === null) ? 1 : 0) - ((bPL === null) ? 1 : 0) || aPL! - bPL!
              : ((bPL !== null) ? 1 : 0) - ((aPL !== null) ? 1 : 0) || bPL! - aPL!
          }) 
          break;
        default:
          break;
      }
      setSortedCoins(temp);
    }
  }, [assetSortType, coinsData, coinsStats])


  const handleAddButtonPress = (coin: CoinType) => {
    const { id, symbol, name, image } = coin;
    setModalInitialState({ id, symbol, image, name })
    setVisible(true);
  }

  const sortBySymbol = useCallback(() => {
    if(assetSortType === 'name_asc') {
      dispatch(changeSortType('name_desc'));
    } else {
      dispatch(changeSortType('name_asc'));
    }
  }, [assetSortType])

  const sortByStats = useCallback((asc: SortType, desc: SortType) => {
    if(!coinsData) return ;
    
    if(assetSortType === asc) {
      dispatch(changeSortType(desc));
    } else {
      dispatch(changeSortType(asc));
    }
  }, [coinsData, assetSortType])

  return (
    <Container>
      <StickyColWrap>
        <SortTab
          name={ t('portfolio.asset') }
          align="left"
          onPress={sortBySymbol}
          sortTypes={['name_asc', 'name_desc']}
        />
        { sortedCoins.map(coin => 
          <AssetRow 
            key={coin.id}
            id={coin.id}
            image={coin.image}
            name={coin.name}
            symbol={coin.symbol}
          />
        ) }
      </StickyColWrap>
      <ScrollView
        horizontal
        snapToInterval={ COL_WIDTH }
        snapToAlignment='start'
        decelerationRate="fast"
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          <SortBarContainer>
            <SortTab 
              name={ t('portfolio.price') }
              onPress={() => sortByStats('price_asc', 'price_desc')}
              sortTypes={['price_asc', 'price_desc']}
            />
            <SortTab
              name={ t('portfolio.holdings') }
              onPress={() => sortByStats('holding_asc', 'holding_desc')}
              sortTypes={['holding_asc', 'holding_desc']}
            />
            <SortTab
              name={ t('portfolio.buy price(avg)') }
              onPress={() => sortByStats('buyPrice_asc', 'buyPrice_desc')}
              sortTypes={['buyPrice_asc', 'buyPrice_desc']}
            />
            <SortTab
              name={ t('portfolio.profit/loss') }
              onPress={() => sortByStats('pl_asc', 'pl_desc')}
              sortTypes={['pl_asc', 'pl_desc']} 
            />
            <SortTab
              name={ t('portfolio.share') }
              onPress={() => sortByStats('allocation_asc', 'allocation_desc')}
              sortTypes={['allocation_asc', 'allocation_desc']}
            />
          </SortBarContainer>
          { sortedCoins.map(coin => {
            const stats: CoinStatType | undefined | null = coinsStats ? coinsStats[coin.id] : undefined;
            const coinData = coinsData?.find(coinData => coinData.id === coin.id);

            const priceStats = coinData 
              ? { 
                  current_price: coinData.current_price,
                  price_change_percentage_24h: coinData.price_change_percentage_24h
                } 
              : undefined;
            
            return (
              <StatisticsRow 
                key={coin.id}
                coin={coin}
                COL_WIDTH={COL_WIDTH}
                stats={stats}
                totalCosts={portfolioTotalCosts}
                priceStats={priceStats}
                onAddButtonPress={handleAddButtonPress}
              />
            )
          }) }
        </View>
      </ScrollView>
      { visible && modalInitailState.id && (
        <FormModal
          visible={visible}
          setVisible={setVisible}
          portfolioId={portfolioId}
          id={modalInitailState.id}
          symbol={modalInitailState.symbol}
          name={modalInitailState.name}
          image={modalInitailState.image}
        />
      )}
    </Container>
  )
}

export default CoinListSheet;

type TextProps = {
  isActive: boolean
}
const Container = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.base.background.surface};
`

const SortBarContainer = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.base.background.surface};
`

const NameWrap = styled.View`
  margin-left: 10px;
`
const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 60px;
`

const StickyColWrap = styled.View`
  width: ${ COL_WIDTH }px;
`
const AssetIdWrap = styled.View`
  width: ${ COL_WIDTH - 40 }px;
`

const Tab = styled.TouchableOpacity<{ align: 'right' | 'left' }>`
  width: ${ COL_WIDTH }px;
  height: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ align }) => align === 'left'
    ? 'flex-start'
    : 'flex-end'
  };
`

const CustomText = styled(Text)<TextProps>`
  color: ${({ theme, isActive }) => isActive
    ? theme.base.text[100]
    : theme.base.text[200]
  }
`