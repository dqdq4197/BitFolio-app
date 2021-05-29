import React from 'react';
import styled from 'styled-components/native';
import { SearchCoin, SearchTrandingCoinItem } from '/lib/api/CoinGeckoReturnType';
import Image from '/components/common/Image';
import Text from '/components/common/Text';

type ItemProps = {
  item: SearchCoin | SearchTrandingCoinItem | any;
  onPressItem: (id: string, symbol: string) => void;
  index?: number;
}
const Item = ({ item, onPressItem, index }: ItemProps) => {

  return (
    <Container onPress={() => onPressItem(item.id, item.symbol)}>
      <Col>
        { index !== undefined 
          ? <Text fontML margin="0 20px 0 0">
              { index + 1}
            </Text>
          : <></>
        }
        <Image uri={item.large} width={30} height={30} borderRedius="m"/>
        <NameWrap>
          <Text 
            color100 
            fontML 
            bold
          >
            { item.name }
          </Text>
          <Text fontML>
            { item.symbol }
          </Text>
        </NameWrap>
      </Col>
      <Text>
        { item.market_cap_rank 
          ? `#${item.market_cap_rank}` 
          : ''
        }
      </Text>
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
  margin-left: 15px;
  flex-wrap: nowrap;
`