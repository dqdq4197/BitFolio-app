import React from 'react';
import { 
  Dimensions,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Text from '/components/common/Text';
import Image from '/components/common/Image';
import { krwFormat, digitToFixed } from '/lib/utils';
import { CoinType } from '/store/portfolio';

const { width } = Dimensions.get('window');
const COL_WIDTH = (width - 32 - 100) / 2;


interface AlignType {
  align?: 'right' | 'left';
}

interface SortBarProps extends AlignType {
  onPress?: () => void;
  text: string;
}

type ItemListProps = {
  coins: CoinType[];
}

const SortBar = ({ align, text, onPress }: SortBarProps) => {
  const { theme } = useGlobalTheme();

  return (
    <SortBarContainer align={align}>
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

const CoinList = ({ coins }: ItemListProps) => {
  const { t } = useTranslation();

  return (
    <FlexRow>
      <Col>
        <SortBar 
          text={t('portfolio.name')}
        />
        { coins.map(coin => {
          return (
            <NameWrap key={coin.id}>
              <Image 
                uri={coin.image} 
                width={30}
                height={30} 
                borderRedius='m'
              />
              <Text color100 bold fontML margin="0 0 0 10px">
                { coin.symbol }
              </Text>
            </NameWrap>
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
          />
          { coins.map((coin, index) => {
            return (
              <CurrentPriceView key={coin.id}>
                <Text color100>
                  { krwFormat(coin.amount) }
                </Text>
                <FigureText fontS number={ coin.totalPercentage }>
                  {
                    coin.totalPercentage > 0
                    ? `+${ digitToFixed(coin.totalPercentage, 2) }%` 
                    : digitToFixed(coin.totalPercentage, 2) +'%'
                  }
                </FigureText>
              </CurrentPriceView>
            )
          }) }
        </Col>
        <Col>
          <SortBar 
            text={t('portfolio.holdings')}
            align="right"
          />
          { coins.map(coin => {
            return (
              <HoldingsView key={coin.id}>
                <Text color100>
                  { krwFormat(coin.amount * coin.quantity) }
                </Text>
                <Text fontS>
                  { coin.quantity + coin.symbol }
                </Text>
              </HoldingsView>
            )
          })}
        </Col>
        <Col>
          <SortBar 
            text={t('portfolio.24h p/l')}
            align="right"
          />
          { coins.map(coin => {
            return (
              <PerDayPercentageView key={coin.id}>
              </PerDayPercentageView>
            )
          })}
        </Col>
        <Col>
          <SortBar 
            text={
              t('portfolio.profit') + ' / ' + t('portfolio.loss')
            }
            align="right"
          />
          { coins.map(coin => {
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
          />
          { coins.map(coin => {
            return (
              <ShareView key={coin.id}>
                <Text margin="0 0 3px 0">
                  { coin.share }
                </Text>
                <ShareBar />
              </ShareView>
            )
          })}
        </Col>
      </ScrollView>
    </FlexRow>
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