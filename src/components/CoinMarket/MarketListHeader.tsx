import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Text from '/components/common/Text';
import { useActionSheet } from '@expo/react-native-action-sheet';

type HeaderProps = {
}


const MarketListHeader = ({ }:HeaderProps) => {
  
  return (
    <Container>
      <Text fontXL>
        시장 가치
      </Text>
      <ListFilterWrap>
        <View>
          <Text fontXL margin="0 16px 0 0">
            All
          </Text>
        </View>
        <View>
          <Text fontXL>
            Favorite
          </Text>
        </View>
      </ListFilterWrap>
    </Container>
  )
}

export default MarketListHeader;



const Container = styled.View`
  background-color: ${({theme}) => theme.base.background['surface']};
  padding: ${({theme}) => theme.content.spacing};
`
const ListFilterWrap = styled.View`
  flex-direction: row;
  border-bottom-color: ${({theme}) => theme.base.background[400]};
  border-bottom-width: 3px;
`

const FilterLine = styled.View`

`