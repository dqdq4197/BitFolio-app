import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';

const data = [{
  title: '거래량 TOP100',
  route: 'CoinHighVolume'
}, {
  title: '시가 총액 TOP100',
  route: 'CoinHighMarketCap'
}, {
  title: '새로운 코인',
  route: 'NewCoin'
}]

type ListProps = {
}

const PopularList = ({ }: ListProps) => {


  return (
    <SurfaceWrap title="인기 차트">
      <Container
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        { data.map(res => {
          return (
            <Card key={res.route}>
              <Text fontX>
                { res.title }
              </Text>
            </Card>
          )
        }) }
      </Container>
    </SurfaceWrap>
  )
}

export default PopularList;

const Container = styled.ScrollView`
  width: 100%;
  background-color: ${({ theme }) => theme.base.background.surface};
  margin-right: -16px;
  padding-right: -16px;
`

const Card = styled.TouchableOpacity`
  width: 150px;
  height: 150px;
  border-radius: ${({ theme }) => theme.border.m};
  background-color: ${({ theme }) => theme.base.background[300]};
  margin-right: 10px;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px;
`