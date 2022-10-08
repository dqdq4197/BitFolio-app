import React, { forwardRef } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native';

interface ITab {
  label: string;
  isFocused: boolean;
  opacity: Animated.AnimatedInterpolation;
  onPress: () => void;
}

const Tab = forwardRef<TouchableOpacity, ITab>(
  ({ label, isFocused, opacity, onPress }, ref) => {
    return (
      <TabButton
        ref={ref}
        accessible
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={label}
        activeOpacity={0.6}
        onPress={onPress}
      >
        <TabText as={Animated.Text} style={{ opacity }}>
          {label}
        </TabText>
      </TabButton>
    );
  }
);

export default Tab;

const TabButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 0px 16px;
`;

const TabText = styled.Text`
  font-weight: 800;
  color: ${({ theme }) => theme.base.text[100]};
`;
