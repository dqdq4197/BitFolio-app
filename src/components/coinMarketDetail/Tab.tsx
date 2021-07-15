import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import styled from 'styled-components/native';

interface ITab {
  label: string
  index: number
  isFocused: boolean
  onPress: () => void
  onLayout: (page: number, event: LayoutChangeEvent) => void
}

const Tab = ({ 
  label, 
  index, 
  isFocused,
  onPress, 
  onLayout 
}: ITab) => {
  
  return (
    <TabButton 
      accessible
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={label}
      activeOpacity={0.6}
      isFocused={isFocused} 
      onPress={onPress} 
      onLayout={(event) => onLayout(index, event)}
    >
      <TabText 
        isFocused={isFocused} 
      >
        { label }
      </TabText>
    </TabButton>
  )
}

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