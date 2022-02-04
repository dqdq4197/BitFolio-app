import React from 'react';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as haptics from 'expo-haptics';
import styled from 'styled-components/native';
import Text from '/components/common/Text';
import useGlobalTheme from '/hooks/useGlobalTheme';



const { width } = Dimensions.get('window');
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace']

type PadProps = {
  height: number;
  onNumericKeyPress: (key: string) => void;
  onBackspacePress: () => void;
  hapticEnabled?: boolean;
}

const NumericPad = ({
  height,
  onNumericKeyPress,
  onBackspacePress,
  hapticEnabled = true
}: PadProps) => {

  const { theme } = useGlobalTheme();

  const handleButtonTouchStart = () => {
    if (hapticEnabled)
      haptics.impactAsync();
  }

  const handleButtonTouchEnd = (key: string) => {
    if (key === 'backspace') {
      onBackspacePress();
    }
    onNumericKeyPress(key)
  }

  return (
    <Container height={height}>
      {KEYS.map(key => {
        return (
          <Button
            height={height}
            key={key}
            onTouchStart={handleButtonTouchStart}
            onTouchEnd={() => handleButtonTouchEnd(key)}
          >
            <Text color100 fontXXL>
              {key === 'backspace'
                ? <Ionicons name="md-arrow-back" size={28} color={theme.base.text[200]} />
                : key
              }
            </Text>
          </Button>
        )
      })}
    </Container>
  )
}

export default NumericPad;

type StyledProps = {
  height: number;
}
const Container = styled.View<StyledProps>`
  width: ${width - 32}px;
  height: ${props => props.height}px;
  flex-direction: row;
  flex-wrap: wrap;
`

const Button = styled.View<StyledProps>`
  width: ${(width - 32) / 3}px;
  height: ${props => props.height / 4}px;
  align-items: center;
  justify-content: center;
`