import React, { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { baseTypes } from 'base-types';
import { Ionicons } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import TextTicker from 'react-native-text-ticker';
import useMarkgetglobar from '/hooks/useMarkgetglobal';
import Text from '/components/common/Text';
import Modal from '/components/common/BottomSheetModal';
import useLocales from '/hooks/useLocales';
import useGlobalTheme from '/hooks/useGlobalTheme';
import SurfaceWrap from '/components/common/SurfaceWrap';
import MarqueeTextSkeleton from '/components/skeletonPlaceholder/MarqueeTextSkeleton';
import { krwFormat, timestampToDate, convertUnits } from '/lib/utils';


type MarqueeProps = {
}

type ModalProps = {
  cryptos: number;
  exchanges: number;
  marketcap: number;
  volume: number;
  currency: baseTypes.Currency,
  updatedAt: number,
}
const ModalContents = ({ 
  cryptos, 
  exchanges, 
  marketcap, 
  volume, 
  currency,
  updatedAt
}: ModalProps) => {

  const { t } = useTranslation();

  return (
    <SurfaceWrap
      title={ t(`coinMarketHome.global metrics`) }
      fontL
      parentPaddingZero
      marginBottomZero
      marginTopZero
      transparent
    >
      <Text margin="5px 0 15px 16px" fontS>
        { timestampToDate(updatedAt, 'mmddwhhmm', true) + ' 기준' }
      </Text>
      <Table>
        <Row top>
          <Col>
            <Title>
              <Text fontM color100>
                { t('coinMarketHome.market cap') + ` (${ currency.toUpperCase() }) ` }
              </Text>
            </Title>
            <Text fontM>
              { krwFormat(marketcap) }
            </Text>
          </Col>
          <Col left>
            <Title>
              <Text fontM color100>
                { t('common.n.hour', { n: 24 }) 
                  + ' '
                  + t('coinMarketHome.volume') 
                  + ` (${ currency.toUpperCase() }) ` 
                }
              </Text>
            </Title>
            <Text fontM> 
                { krwFormat(volume) } 
            </Text>
          </Col>
        </Row>
        <Row top bottom>
          <Col>
            <Title>
              <Text fontM color100>
                { t('common.cryptocurrencies') }
              </Text>
            </Title>
            <Text fontM>
              { krwFormat(cryptos) }
            </Text>
          </Col>
          <Col left>
            <Title>
              <Text fontM color100>
                { t('common.exchanges') }(24h)
              </Text>
            </Title>
            <Text fontM>
              { krwFormat(exchanges) }
            </Text>
          </Col>
        </Row>
      </Table>
    </SurfaceWrap>
  )
}

const TextMarquee = ({ }: MarqueeProps) => {
  const { data: marketGlobarData } = useMarkgetglobar({ suspense: false });
  const { currency } = useLocales();
  const { theme } = useGlobalTheme();
  const ModalRef = useRef<BottomSheetModal>(null);

  const handleMarqueePress = () => {
    ModalRef.current?.present();
  }

  if(!marketGlobarData) return <MarqueeTextSkeleton/>
  const { data } = marketGlobarData;

  return (
    <Container
      activeOpacity={0.7}
      onPress={handleMarqueePress}
    >
      <TextTicker 
        loop 
        duration={40000}
        repeatSpacer={30}
      >
        <Text fontM style={{ color: 'white' }}>
          Cryptos: { data.active_cryptocurrencies } •
          Exchanges: { data.markets } •
          Market Cap:  { convertUnits(data.total_market_cap[currency], currency) } •
          24h Vol:  { convertUnits(data.total_volume[currency], currency) }
        </Text>
      </TextTicker>
      <IconWrap
        colors={[ 'rgba(56, 97, 251,0)', theme.base.primaryColor, theme.base.primaryColor ]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Ionicons 
          name="ios-chevron-down" 
          size={20} 
          color='white'
        />
      </IconWrap>
      <Modal
        key="market-global"
        ref={ModalRef}
        snapPoints={['35%']}
      >
        <ModalContents 
          cryptos={ data.active_cryptocurrencies }
          exchanges={ data.markets } 
          marketcap={ data.total_market_cap[currency] }
          volume={ data.total_volume[currency] }
          currency={ currency }
          updatedAt={ data.updated_at }
        />
      </Modal>
    </Container>
  )
}

export default TextMarquee;

type RowProps = {
  top?: boolean;
  bottom?: boolean;
}

type ColProps = {
  left?: boolean;
}

const Container = styled.TouchableOpacity`
  height: 40px;
  background-color: ${({ theme }) => theme.base.primaryColor};
  padding: 0 5px;
  border-radius: ${({ theme }) => theme.border.m};
  justify-content: center;
  margin-top: 10px;
`

const IconWrap = styled(LinearGradient)`
  position: absolute;
  right: 0;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  border-radius: ${({ theme }) => theme.border.m};
`

const Table = styled.View`
  margin-bottom: 20px;
`

const Row = styled.View<RowProps>`
  flex-direction: row;
  ${
    (props) => 
      props.top && css`
        border-top-width: 1px;
        border-top-color: ${props.theme.base.background[300]};
      `
  } 
  ${
    (props) => 
      props.bottom && css`
        border-bottom-width: 1px;
        border-bottom-color: ${props.theme.base.background[300]};
      `
  } 
`

const Col = styled.View<ColProps>`
  width: 50%;
  padding: 10px ${({ theme }) => theme.content.spacing};
  ${
    (props) => 
      props.left && css`
        border-left-width: 1px;
        border-left-color: ${props.theme.base.background[300]};
      `
  }
`

const Title = styled.View`
  padding-bottom: 10px;
`