import React from 'react';
import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';


const { width } = Dimensions.get('window');
const CONTROLBAR_HEIGHT = 45;




interface ControlBarProps {
  selecting: boolean,
  onBoldPress: () => void,
}

const ControlBar = ({ selecting, onBoldPress }:ControlBarProps ) => {


  const SelectionContorlBar = () => (
    <Container behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={45}>
      <SelectingView>
        <UtilBtn onPress={onBoldPress}>
          <Foundation name="bold" size={24} color="white" />
        </UtilBtn>
        <UtilBtn>
          <MaterialIcons name="format-italic" size={24} color="white" />
        </UtilBtn>
        <UtilBtn>
          <MaterialCommunityIcons name="marker" size={20} color="white" />
        </UtilBtn>
      </SelectingView>
    </Container>
  )

  return (
    <>
    {!selecting 
      ? <SelectionContorlBar/>
      : <Container behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={45}>
          <View>
            <UtilsWrap flex={5}>
              <UtilBtn onPress={onBoldPress}>
                <MaterialIcons name="text-fields" size={24} color="rgba(255,255,255, .7)" />
              </UtilBtn>
              <UtilBtn>
                <FontAwesome name="quote-left" size={20} color="rgba(255,255,255, .7)" />
              </UtilBtn>
              <UtilBtn>
                <FontAwesome5 name="list-ul" size={20} color="rgba(255,255,255, .7)" />
              </UtilBtn>
              <UtilBtn>
                <Ionicons name="ellipsis-horizontal" size={24} color="rgba(255,255,255, .7)" />
              </UtilBtn>
              <UtilBtn>
                <Octicons name="mention" size={24} color="rgba(255,255,255, .7)" />
              </UtilBtn>
            </UtilsWrap>
            <UtilsWrap flex={1}>
              <UtilBtn>
                <Ionicons name="md-image" size={24} color="rgba(255,255,255, .7)" />
              </UtilBtn>
            </UtilsWrap>
          </View>
        </Container>
    }
    </>

    
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
  /* padding: ${CONTROLBAR_HEIGHT}px; */
  /* padding: 0; */
  background-color: ${({theme}) => theme.base.background[200]};
  /* background-color: white; */
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

const SelectingView = styled.View`
  position: absolute;
  top: 0;
  width: ${width}px;
  height: ${CONTROLBAR_HEIGHT}px;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 10px;
`