import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { SearchCoin } from '/lib/api/CoinGeckoReturnType';
import Image from '/components/common/Image';
import Text from '/components/common/Text';


type ItemProps = {
  item: SearchCoin;
  onPressItem: (id: string, symbol: string) => void;
}
const CoinItem = ({ item, onPressItem }: ItemProps) => {

  return (
    <Container onPress={() => onPressItem(item.id, item.symbol)}>
      <Image uri={item.large} width={30} height={30}/>
      <NameWrap>
        <Text 
          color100 
          fontML 
          bold
          numberOfLines={ 1 } 
          ellipsizeMode='tail'
        >
            
          { item.name }
        </Text>
        <Text fontML>
          { item.symbol }
        </Text>
      </NameWrap>
    </Container>
  )
}

export default CoinItem;  

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  height: 60px;
`

const NameWrap = styled.View`
  margin-left: 15px;
`