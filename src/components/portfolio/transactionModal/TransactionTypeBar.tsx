import React, { useEffect, useRef } from 'react';
import { Dimensions, Animated } from 'react-native';
import styled from 'styled-components/native';

import useGlobalTheme from '/hooks/useGlobalTheme';

import Text from '/components/common/Text';

const { width } = Dimensions.get('window');

type BarProps = {
  labels: string[];
  height: number;
  onSwitchTransactionType: (label: string) => void;
  type: string;
};

const TransactionTypeBar = ({
  labels,
  height,
  onSwitchTransactionType,
  type,
}: BarProps) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const { theme } = useGlobalTheme();
  const LabelWidth = (width - parseInt(theme.content.spacing, 10) * 2) / 3;

  useEffect(() => {
    const index = labels.findIndex(label => label.toLowerCase() === type);

    setTranslateX(index);
  }, [type]);

  const setTranslateX = (index: number) => {
    Animated.timing(translateX, {
      toValue: LabelWidth * index,
      delay: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Container height={height}>
      <IndicatorWrap>
        {labels.map(label => (
          <Label
            key={label}
            width={LabelWidth}
            onPress={() => onSwitchTransactionType(label)}
            activeOpacity={0.6}
          >
            <CustomText
              isFocused={label.toLowerCase() === type}
              color100
              bold
              fontML
            >
              {label}
            </CustomText>
          </Label>
        ))}
        <Indicator
          as={Animated.View}
          width={LabelWidth}
          style={{
            transform: [
              {
                translateX,
              },
            ],
          }}
        />
      </IndicatorWrap>
    </Container>
  );
};

export default TransactionTypeBar;

type ContainerProps = {
  height: number;
};

type LabelWidthType = {
  width: number;
};

type TextProps = {
  isFocused: boolean;
};

const Container = styled.View<ContainerProps>`
  height: ${({ height }) => height}px;
  padding: 0 ${({ theme }) => theme.content.spacing} 12px;
`;

const IndicatorWrap = styled.View`
  flex-direction: row;
  height: 100%;
  background-color: ${({ theme }) => theme.base.background[200]};
  border-radius: ${({ theme }) => theme.border.m};
`;

const Label = styled.TouchableOpacity<LabelWidthType>`
  width: ${({ width }) => width}px;
  height: 100%;
  z-index: 3;
  align-items: center;
  justify-content: center;
`;
const Indicator = styled.View<LabelWidthType>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: 100%;
  background-color: ${({ theme }) => theme.base.background[400]};
  border-radius: ${({ theme }) => theme.border.m};
  z-index: 1;
`;

const CustomText = styled(Text)<TextProps>`
  color: ${({ theme, isFocused }) =>
    isFocused ? theme.base.text[100] : theme.base.text[200]};
`;
