import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import { CoinSvg } from '/lib/svg';


const ICON_SIZE = 50;


type ListProps = {
}

const PopularList = ({ }: ListProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const data = [{
    title: '24h \n' + t('coinMarketHome.gainers'),
    route: 'Gainers',
    start: '#d9a4fc',
    end: '#be63f9',
    icon: <CoinSvg name="rise" width={ICON_SIZE} height={ICON_SIZE}/>
  }, {
    title: '24h \n' + t('coinMarketHome.losers'),
    route: 'Losers',
    start: '#fd907e',
    end: '#fc573b',
    icon: <CoinSvg name="decrease" width={ICON_SIZE} height={ICON_SIZE}/>
  }, {
    title: t('coinMarketHome.volume') + '\nTOP100',
    route: 'CoinHighVolume',
    start: '#8ce1eb',
    end: '#26c6da',
    icon: <CoinSvg name="coins" width={ICON_SIZE} height={ICON_SIZE}/>
  }, {
    title: t('coinMarketHome.market cap') + '\nTOP100',
    route: 'CoinHighMarketCap',
    start: '#ffe777',
    end: '#ffd200',
    icon: <CoinSvg name="coinstack" width={ICON_SIZE} height={ICON_SIZE}/>
  }]

  const handleCardPress = (route: string) => {
    navigation.navigate(route);
  }

  return (
    <SurfaceWrap title={t('coinMarketHome.popular list')} parentPaddingZero >
      <Container
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16
        }}
      >
        { data.map(res => {
          return (
            <CardWrap 
              key={res.route} 
              colors={[ res.start, res.end ]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
            >
              <Card 
                onPress={() => handleCardPress(res.route)}
                activeOpacity={0.6}
              >
                <IconWrap>
                  { res.icon }
                </IconWrap>
                <Text style={{ fontSize: 19 }} heavy lineHeight={23} color="black">
                  { res.title }
                </Text>
              </Card>
            </CardWrap>
          )
        }) }
      </Container>
    </SurfaceWrap>
  )
}

export default PopularList;

const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.base.background.surface};
`
const CardWrap = styled(LinearGradient)`
  width: 135px;
  height: 135px;
  border-radius: ${({ theme }) => theme.border.xl};
  margin-right: 10px;
`
const Card = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  padding: 10px;
  justify-content: space-between;
`
const IconWrap = styled.View`
  width: 100%;
  align-items: flex-end;
`