import React from 'react';
import { Dimensions } from "react-native";
import styled from 'styled-components/native';
import GlobalIndicator from '/components/common/GlobalIndicator';
import ScrollView from '/components/common/ScrollView';

const { height } = Dimensions.get('window');


const CoinDetailSkeleton = () => {
  return (
    <ScrollView>
      <View>
        <GlobalIndicator
          isLoaded={false}
          size="large"
          transparent
        />
      </View>
    </ScrollView>
  )
}

export default CoinDetailSkeleton;

const View = styled.View`
  flex: 1;
  height: ${height - 200}px;
  align-items: center;
  justify-content: center;
`