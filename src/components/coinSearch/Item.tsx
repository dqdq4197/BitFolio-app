import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { SearchCoin, SearchTrandingCoinItem } from '/lib/api/CoinGeckoReturnType';
import Image from '/components/common/Image';
import Text from '/components/common/Text';

type ItemProps = {
  item: SearchCoin | SearchTrandingCoinItem | any;
  onPressItem: (id: string, symbol: string) => void;
  index?: number;
}

const { width } = Dimensions.get('window');

const IMAGE_WIDTH = 30;
const RANK_WIDTH = 45;

const Item = ({ item, onPressItem, index }: ItemProps) => {

  return (
    <Container 
      activeOpacity={0.6}
      onPress={() => onPressItem(item.id, item.symbol)}
    >
      <Col>
        { index !== undefined 
          ? <Text fontML margin="0 20px 0 0">
              { index + 1}
            </Text>
          : <></>
        }
        <Image uri={item.large} width={IMAGE_WIDTH} height={IMAGE_WIDTH} borderRedius="m"/>
        <NameWrap>
          <Text
            color100 
            fontML 
            bold
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            { item.name }
          </Text>
          <Text 
            fontML
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            { item.symbol }
          </Text>
        </NameWrap>
      </Col>
      <RankWrap>
        <Text>
          { item.market_cap_rank 
            ? `#${item.market_cap_rank}` 
            : ''
          }
        </Text>
      </RankWrap>
    </Container>
  )
}

export default Item;  

const Container = styled.TouchableOpacity`
  height: 60px;
  padding: 10px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.base.background.surface};
  padding: 0 ${({ theme }) => theme.content.spacing};
`
const Col = styled.View`
  flex-direction: row;
  align-items: center;
`
const NameWrap = styled.View`
  // margin포함
  width: ${({ theme }) => width - parseInt(theme.content.spacing) * 2 - IMAGE_WIDTH - RANK_WIDTH - 25}px;
  margin: 0 10px 0 15px;
`

const RankWrap = styled.View`
  width: ${ RANK_WIDTH }px;
  align-items: flex-end;
`