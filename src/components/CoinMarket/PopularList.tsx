import React from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';

const data = [{
  title: '24H \n상승 종목',
  route: 'CoinHighPrice',
  start: '#0d324d',
  end: '#7f5a83',
}, {
  title: '24H \n하락 종목',
  route: 'CoinLowPrice',
  start: '#0d324d',
  end: '#7f5a83',
}, {
  title: '거래량 \nTOP100',
  route: 'CoinHighVolume',
  start: '#2a5470',
  end: '#4c4177',
}, {
  title: '시가 총액 \nTOP100',
  route: 'CoinHighMarketCap',
  start: '#28313b',
  end: '#485461',
}, {
  title: '새로운 코인',
  route: 'NewCoin',
  start: '#d2ccc4',
  end: '#2f4353',
}]

type ListProps = {
}

const PopularList = ({ }: ListProps) => {
  const navigation = useNavigation();
  const handleCardPress = (route: string) => {
    navigation.navigate(route);
  }

  


  return (
    <SurfaceWrap title="인기 차트" parentPaddingZero >
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
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Card onPress={() => handleCardPress(res.route)}>
                <Text fontX bold>
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
  align-items: flex-end;
  justify-content: flex-end;
`