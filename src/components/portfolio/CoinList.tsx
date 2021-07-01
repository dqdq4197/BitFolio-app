import React, { useState } from 'react';
import { 
  Dimensions,
  Animated
} from 'react-native';
import styled, { css } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Text from '/components/common/Text';
import Image from '/components/common/Image';
import { krwFormat, digitToFixed } from '/lib/utils';
import { CoinType } from '/store/portfolio';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import FormModal from './transactionModal/FormModal';


const { width, height } = Dimensions.get('window');
const COL_WIDTH = (width - 32 - 100) / 2;


interface AlignType {
  align?: 'right' | 'left';
}

interface SortBarProps extends AlignType {
  onPress?: () => void;
  text: string;
  scrollY: Animated.Value
}

type ItemListProps = {
  portfolioId: string;
  dataEnteredByTheUser: CoinType[];
  officialData?: CoinMarketReturn[];
  scrollY: Animated.Value;
}

const SortBar = ({ align, text, onPress, scrollY }: SortBarProps) => {
  const { theme } = useGlobalTheme();

  return (
    <SortBarContainer 
      as={Animated.View}
      align={align}
    >
      <Text fontS margin="0 2px 0 0">
        { text }
      </Text>
      <Ionicons 
        name="ios-chevron-down" 
        size={12} 
        color={theme.base.text[100]}
      />
    </SortBarContainer>
  )
}

const CoinList = ({ portfolioId, dataEnteredByTheUser, officialData, scrollY }: ItemListProps) => {
  const { t } = useTranslation();

  const [transactionModalState, setTransactionModalState] = useState({
    id: "",
    symbol: "",
    name: "",
    current_price: 0,
    image: "",
    last_updated: "",
    visible: false,
  });

  const handleAddTransactionPress = (item?: CoinMarketReturn ) => {
    if(!item) return;
    const { id, symbol, name, current_price, image, last_updated } = item;
    setTransactionModalState({
      id,
      symbol,
      name,
      current_price,
      image,
      last_updated,
      visible: true,
    })
  }

  const setModalVisible = (state: boolean) => {
    setTransactionModalState(
      prev => ({
        ...prev,
        visible: state
      })
    )
  }

  if(!officialData) return <>{ console.log('portfolio api error')}</>

  return (
    <>
    <FlexRow>
      <Col>
        <SortBar 
          text={t('portfolio.name')}
          scrollY={scrollY}
        />
        {dataEnteredByTheUser.map(coin => {
          let item = officialData.find(data => data.id === coin.id)
          return (
            <>
            <NameWrap key={coin.id}>
              {item
                ? <>
                    <Image 
                      uri={item.image} 
                      width={30}
                      height={30} 
                      borderRedius='m'
                    />
                    <Text color100 bold fontML margin="0 0 0 10px">
                      { item.symbol }
                    </Text>
                  </>
                : <></>
              }
            </NameWrap>
            </>
          )
        })}
      </Col>
      <ScrollView
        horizontal
        snapToInterval={ COL_WIDTH }
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
      >
        <Col>
          <SortBar 
            text={t('portfolio.price')}
            align="right"
            scrollY={scrollY}
          />
          {dataEnteredByTheUser.map(coin => {
            let item = officialData.find(data => data.id === coin.id)
            return (
              <CurrentPriceView key={coin.id}>
                {item
                  ? <>
                      <Text color100>
                        { krwFormat(item.current_price) }
                      </Text>
                      <FigureText fontS number={ item.price_change_percentage_24h }>
                        {
                          item.price_change_percentage_24h > 0
                          ? `+${ digitToFixed(item.price_change_percentage_24h, 2) }%` 
                          : digitToFixed(item.price_change_percentage_24h, 2) +'%'
                        }
                      </FigureText>
                    </>
                  : <>
                    </>
                }
                
              </CurrentPriceView>
            )
          }) }
        </Col>
        <Col>
          <SortBar 
            text={t('portfolio.holdings')}
            align="right"
            scrollY={scrollY}
          />
          {dataEnteredByTheUser.map(coin => {
            let item = officialData.find(data => data.id === coin.id)
            return (
              <HoldingsView key={coin.id}>
                {item
                  ? coin.type === 'incomplete' 
                    ? <AddTransactionButton 
                        onPress={() => handleAddTransactionPress(item)}>
                        <Text>
                          { t('common.add') }
                        </Text>
                      </AddTransactionButton>
                    : <>
                        <Text color100>
                          {/* { krwFormat(coin.amount * coin.quantity) } */}
                        </Text>
                        <Text fontS>
                          {/* { coin.quantity + coin.symbol } */}
                        </Text>
                      </>
                  : <></>
                }
              </HoldingsView>
            )
          })}
        </Col>
        <Col>
          <SortBar 
            text={t('portfolio.24h p/l')}
            align="right"
            scrollY={scrollY}
          />
          {dataEnteredByTheUser.map(coin => {
            let item = officialData.find(data => data.id === coin.id)
            return (
              <PerDayPercentageView key={coin.id}>
              </PerDayPercentageView>
            )
          })}
        </Col>
        <Col>
          <SortBar 
            text={ t('portfolio.profit') + ' / ' + t('portfolio.loss') }
            align="right"
            scrollY={scrollY}
          />
          {dataEnteredByTheUser.map(coin => {
            let item = officialData.find(data => data.id === coin.id)
            return (
              <PLView key={coin.id}>
              
              </PLView>
            )
          })}
        </Col>
        <Col>
          <SortBar 
            text={t('portfolio.share')}
            align="right"
            scrollY={scrollY}
          />
          {dataEnteredByTheUser.map(coin => {
            let item = officialData.find(data => data.id === coin.id)
            return (
              <ShareView key={coin.id}>
                {item
                  ? <>
                      <Text margin="0 0 3px 0">
                        {/* { coin.share } */}
                      </Text>
                      <ShareBar />
                    </>
                  : <></>
                }
                
              </ShareView>
            )
          })}
        </Col>
      </ScrollView>
    </FlexRow>
    { transactionModalState.visible && (
      <FormModal
        visible={transactionModalState.visible}
        setVisible={setModalVisible}
        portfolioId={portfolioId}
        id={transactionModalState.id}
        symbol={transactionModalState.symbol}
        name={transactionModalState.name}
        image={transactionModalState.image}
      />
    )}
    </>
  )
}

export default CoinList;

type SortBarContainerProps = {
  align?: 'right' | 'left';
}

type FigureTextProps = {
  number: number,
}

const BaseAnalysisViewStyle = styled.View`
  width: ${ COL_WIDTH }px;
  height: 60px;
  align-items: flex-end;
  justify-content: center;
`

const FigureText = styled(Text)<FigureTextProps>`
  color: ${(props) => props.number > 0 
    ? props.theme.colors.green.a400 
    : props.number === 0 
      ? props.theme.base.text[200]
      : props.theme.colors.red[500]
  };
`

const CurrentPriceView = styled(BaseAnalysisViewStyle)`
  
`

const HoldingsView = styled(BaseAnalysisViewStyle)`
`

const PerDayPercentageView = styled(BaseAnalysisViewStyle)`

`
const PLView = styled(BaseAnalysisViewStyle)`

`
const ShareView = styled(BaseAnalysisViewStyle)`

`

const AddTransactionButton = styled.TouchableOpacity`
  position: absolute;
  width: 55px;
  height: 30px;
  right: 10px;
  border-radius: ${({ theme }) => theme.border.m};
  border-color: ${({ theme }) => theme.base.text[200]};
  border: 1px solid ${({ theme }) => theme.base.text[200]};
  justify-content: center;
  align-items: center;
`

const FlexRow = styled.View`
  flex-direction: row;
`

const NameWrap = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100px;
  height: 60px;
`

const Col = styled.View`
`

const ScrollView = styled.ScrollView`
`

const ShareBar = styled.View`
  width: 70%;
  height: 7px;
  background-color: ${({ theme }) => theme.base.background[300]};
  border-radius: ${({ theme }) => theme.border.s};
`

const SortBarContainer = styled.View<SortBarContainerProps>`
  flex-direction: row;
  height: 25px;
  ${ props => props.align === 'right' 
    && css`
      justify-content: flex-end; 
    `
  };
`
