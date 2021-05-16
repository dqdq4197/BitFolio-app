import React, { forwardRef, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

interface ITab {
  label: string;
  index: number;
  stateIndex: number;
  onPress: () => void;
}

const Tab = forwardRef<TouchableOpacity, ITab>(
  ({ label, index, stateIndex, onPress,  }, ref) => {
  
  return (
    <TabButton ref={ref} isFocused={stateIndex === index} onPress={onPress} >
      <TabText isFocused={stateIndex === index} >
        { label }
      </TabText>
    </TabButton>
  );
})

export default Tab;

const TabButton = styled.TouchableOpacity<{isFocused: boolean}>`
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 0px 16px;
`;

const TabText = styled.Text<{isFocused: boolean}>`
  font-weight: 800;
  color: ${(props) => (props.isFocused ? props.theme.base.text[100] : props.theme.base.text[400])};
`;