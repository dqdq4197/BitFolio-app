import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

interface ITab {
  label: string;
  index: number;
  color: Animated.Node<string | number>;
  isFocused: boolean;
  onPress: () => void;
  onLayout: (page: number, event: LayoutChangeEvent) => void;
}

const Tab = ({ label, index, isFocused, color, onPress, onLayout }: ITab) => {
  return (
    <TabButton
      accessible
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={label}
      activeOpacity={0.6}
      onPress={onPress}
      onLayout={event => onLayout(index, event)}
    >
      <TabText
        as={Animated.Text}
        style={{
          color: color as any,
        }}
      >
        {label}
      </TabText>
    </TabButton>
  );
};

export default Tab;

const TabButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 0px 16px;
`;

const TabText = styled.Text`
  font-weight: 800;
`;
