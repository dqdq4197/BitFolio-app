import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const FlatListHeader = () => {
  return (
    <Container>

    </Container>
  )
}

export default FlatListHeader;

const Container = styled.View`
  flex-direction: row;
  width: ${wp('100%')}px;
  margin: 0 auto;
  padding: 0 ${({theme}) => theme.content.spacing};
  height: 30px;
  background-color: ${({theme}) => theme.base.background[300]};
`