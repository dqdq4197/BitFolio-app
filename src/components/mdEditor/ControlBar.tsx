import React from 'react';
import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';


const { width } = Dimensions.get('window');
const CONTROLBAR_HEIGHT = 45;
const ControlBar = () => {

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View>
        <UtilsWrap flex={5}>
          <UtilBtn>
            <MaterialIcons name="text-fields" size={24} color="white" />
          </UtilBtn>
          <UtilBtn>
            <FontAwesome name="quote-left" size={20} color="white" />
          </UtilBtn>
          <UtilBtn>
            <FontAwesome5 name="list-ul" size={20} color="white" />
          </UtilBtn>
          <UtilBtn>
            <Ionicons name="ellipsis-horizontal" size={24} color="white" />
          </UtilBtn>
          <UtilBtn>
            <Octicons name="mention" size={24} color="white" />
          </UtilBtn>
        </UtilsWrap>
        <UtilsWrap flex={1}>
          <UtilBtn>
            <Ionicons name="md-image" size={24} color="white" />
          </UtilBtn>
        </UtilsWrap>
      </View>
    </Container>
  )
}

export default ControlBar;

interface UtilsWrapProps {
  flex: number
}
const Container = styled.KeyboardAvoidingView`
  position: absolute;
  flex-direction: row;
  width: ${width}px;
  height: ${CONTROLBAR_HEIGHT}px;
  align-items: center;
  bottom: 0;
  padding: ${CONTROLBAR_HEIGHT}px;
  background-color: ${({theme}) => theme.base.background[200]};
`
const View = styled.View`
  position: absolute;
  top: 0;
  width: ${width}px;
  height: ${CONTROLBAR_HEIGHT}px;
  align-items: center;
  flex-direction: row;
  padding: 0 10px;
`
const UtilsWrap = styled.View<UtilsWrapProps>`
  flex: ${props => props.flex};
  flex-direction: row;
`
const UtilBtn = styled.TouchableOpacity`
  padding: 0 10px;
`