import React from 'react';
import styled from 'styled-components/native';
import Image from '/components/common/Image';
import Text from '/components/common/Text';
import { CoinType } from '/store/portfolio';


type ItemProps = {
  item: CoinType;
  onPressItem?: (id: string, symbol: string) => void;
}
const CoinItem = ({ item, onPressItem }: ItemProps) => {
  return (
    <Container>
      <>
      <Image uri={item.image} width={30} height={30}/>
      <NameWrap>
        <Text color100 bold fontML>
          { item.symbol }
        </Text>
      </NameWrap>
      <ScrollView
        horizontal
        pagingEnabled
        stickyHeaderIndices={[0]}
      >
        <View></View>
        
        <View>

        </View>
        <View2>

        </View2>
      </ScrollView>
      </>
    </Container>
  )
}

export default CoinItem;  

const Container = styled.TouchableNativeFeedback`
  flex-direction: row;
  padding: 10px 0;
  height: 60px;
`

const NameWrap = styled.View`
  margin-left: 15px;
`

const ScrollView = styled.ScrollView`
  height: 60px;
  width: 600px;
`

const View = styled.View`
  width: 300px;
  height: 60px;
  background-color: blue;
`
const View2 = styled.View`
  width: 300px;
  height: 60px;
  background-color: red;
`