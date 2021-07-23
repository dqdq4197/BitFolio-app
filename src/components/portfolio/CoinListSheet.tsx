import React, { useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Text from '/components/common/Text';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { PortfolioType } from '/store/portfolio';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import Image from '/components/common/Image';
import StatisticsRow from './StatisticsRow';
import FormModal from './transactionModal/FormModal';
import { CoinType } from '/store/portfolio';


const { width } = Dimensions.get('window')
const CONTENT_PADDING = 16;
const COL_WIDTH = (width - CONTENT_PADDING * 2) / 3.2;


type TabProps = {
  name: string
  onPress: () => void
  align?: 'right' | 'left'
}

type SheetProps = {
  item: PortfolioType
  coinsData: CoinMarketReturn[] | undefined
}

const SortTab = ({ name, onPress, align = 'right' }: TabProps) => {
  const { theme } = useGlobalTheme();

  return (
    <Tab align={align}>
      <Text fontS margin="0 2px 0 0">
        { name }
      </Text>
      <Ionicons 
        name="ios-chevron-down" 
        size={12} 
        color={theme.base.text[100]}
      />
    </Tab>
  )
}

const CoinListSheet = ({ item, coinsData }: SheetProps) => {
  
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [modalInitailState, setModalInitialState] = useState({
    id: '',
    symbol: '',
    image: '',
    name: ''
  })

  const handleAddButtonPress = (coin: CoinType) => {
    const { id, symbol, name, image } = coin;
    setModalInitialState({ id, symbol, image, name })
    setVisible(true);
  }
  return (
    <Container>
      <StickyColWrap>
        <SortTab 
          name={ t('portfolio.name') }
          align="left"
          onPress={() => {}}
        />
        { item.coins.map(coin => {
          return (
            <Row key={coin.id}>
              <Image 
                uri={coin.image} 
                width={30}
                height={30} 
                borderRedius='m'
              />
              <Text color100 bold fontML margin="0 0 0 10px">
                { coin.symbol.toUpperCase() }
              </Text>
            </Row>
          )
        }) }
      </StickyColWrap>
      <ScrollView
        horizontal
        snapToInterval={ COL_WIDTH }
        snapToAlignment='center'
        decelerationRate="fast"
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          <SortBarContainer>
            <SortTab 
              name={ t('portfolio.price') }
              onPress={() => {}}
            />
            <SortTab 
              name={ t('portfolio.holdings') }
              onPress={() => {}}
            />
            <SortTab 
              name={ t('portfolio.24h p/l') }
              onPress={() => {}}
            />
            <SortTab 
              name={ t('portfolio.profit') }
              onPress={() => {}}
            />
            <SortTab 
              name={ t('portfolio.share') }
              onPress={() => {}}
            />
          </SortBarContainer>
          { coinsData && item.coins.map(coin => {
            const data = coinsData.find(coinData => coinData.id === coin.id);

            return (
              <StatisticsRow 
                key={coin.id}
                coin={coin}
                COL_WIDTH={COL_WIDTH}
                data={data}
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
          portfolioId={item.id}
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


const Container = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: ${({ theme }) => theme.base.background.surface};
  padding: 0 ${({ theme }) => theme.content.spacing};
`

const SortBarContainer = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.base.background.surface};
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  height: 60px;
`

const StickyColWrap = styled.View`
  width: ${ COL_WIDTH }px;
`

const Tab = styled.View<{ align: 'right' | 'left' }>`
  width: ${ COL_WIDTH }px;
  height: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ align }) => align === 'left'
    ? 'flex-start'
    : 'flex-end'
  };
`