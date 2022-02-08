import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import useGlobalTheme from '/hooks/useGlobalTheme';

import Text from '/components/common/Text';
import { FormData, NumericData } from './FormModal';

type ViewProps = {
  transactionType: string;
  transferType: string | null;
  setFormData: React.Dispatch<React.SetStateAction<FormData<NumericData>>>;
  FOOTER_HEIGHT: number;
};

const { width, height } = Dimensions.get('window');
const transactionTypes = [
  {
    key: 'buy',
    icon: (color: string) => (
      <AntDesign name="swapleft" size={24} color={color} />
    ),
  },
  {
    key: 'sell',
    icon: (color: string) => (
      <AntDesign name="swapright" size={24} color={color} />
    ),
  },
  {
    key: 'transfer',
    icon: (color: string) => (
      <MaterialCommunityIcons name="transfer" size={24} color={color} />
    ),
  },
];

const transferTypes = [
  {
    key: 'transfer in',
    icon: (color: string) => (
      <AntDesign name="arrowdown" size={18} color={color} />
    ),
  },
  {
    key: 'transfer out',
    icon: (color: string) => (
      <AntDesign name="arrowup" size={18} color={color} />
    ),
  },
];

const TypeSelectView = ({
  setFormData,
  transactionType,
  transferType,
  FOOTER_HEIGHT,
}: ViewProps) => {
  const { t } = useTranslation();
  const { theme } = useGlobalTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const TransferTypeWidth =
    (width - parseInt(theme.content.spacing, 10) * 2) / 2;
  const TransactionTypeWidth =
    (width - parseInt(theme.content.spacing, 10) * 2 - 20) / 3;

  useEffect(() => {
    const index = transferTypes.findIndex(type => type.key === transferType);
    setTranslateX(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferType]);

  useEffect(() => {
    if (transactionType === 'transfer') {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -20,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [opacity, transactionType, translateY]);

  const setTranslateX = (index: number) => {
    Animated.timing(translateX, {
      toValue: TransferTypeWidth * index,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onSwitchTransactionType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      type,
    }));
  };

  const onSwitchTransferType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      transferType: type,
    }));
  };

  return (
    <Container height={height - FOOTER_HEIGHT - 70}>
      <TransactionTypeWrap>
        {transactionTypes.map(type => (
          <TransactionType
            key={type.key}
            activeOpacity={0.6}
            width={TransactionTypeWidth}
            isSelected={type.key === transactionType}
            onPress={() => onSwitchTransactionType(type.key)}
          >
            {type.icon(
              type.key === transactionType
                ? theme.base.text[100]
                : theme.base.text[300]
            )}
            <CustomText
              isSelected={type.key === transactionType}
              margin="0 0 0 5px"
              color100
              bold
              fontML
            >
              {t(`common.${type.key}`)}
            </CustomText>
          </TransactionType>
        ))}
      </TransactionTypeWrap>
      <TransferTypeWrap
        as={Animated.View}
        style={{
          transform: [
            {
              translateY,
            },
          ],
          opacity,
        }}
      >
        {transferTypes.map(type => (
          <TransferType
            key={type.key}
            width={TransferTypeWidth}
            onPress={() => onSwitchTransferType(type.key)}
            activeOpacity={0.6}
          >
            {type.icon(
              type.key === transferType
                ? theme.base.text[100]
                : theme.base.text[300]
            )}
            <CustomText
              isSelected={type.key === transferType}
              margin="0 0 0 5px"
              color100
              bold
              fontML
            >
              {t(`common.${type.key}`)}
            </CustomText>
          </TransferType>
        ))}
        <Indicator
          as={Animated.View}
          width={TransferTypeWidth}
          style={{
            transform: [
              {
                translateX,
              },
            ],
          }}
        />
      </TransferTypeWrap>
    </Container>
  );
};

export default TypeSelectView;

type ContainerProps = {
  height: number;
};

type TypeProps = {
  width: number;
  isSelected?: boolean;
};

type TextProps = {
  isSelected: boolean;
};

const Container = styled.View<ContainerProps>`
  height: ${({ height }) => height}px;
  padding: 0 ${({ theme }) => theme.content.spacing};
  justify-content: center;
`;

const TransactionTypeWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 150px;
`;

const TransactionType = styled.TouchableOpacity<TypeProps>`
  height: 100%;
  width: ${({ width }) => width}px;
  background-color: ${({ theme }) => theme.base.background[300]};
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.border.ml};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, isSelected }) =>
    isSelected ? theme.base.primaryColor : 'transparent'};
`;

const TransferTypeWrap = styled.View`
  flex-direction: row;
  height: 50px;
  background-color: ${({ theme }) => theme.base.background[300]};
  border-radius: ${({ theme }) => theme.border.m};
  margin-top: 20px;
`;

const TransferType = styled.TouchableOpacity<TypeProps>`
  flex-direction: row;
  width: ${({ width }) => width}px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Indicator = styled.View<TypeProps>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: 100%;
  background-color: ${({ theme }) => theme.base.background[400]};
  border-radius: ${({ theme }) => theme.border.m};
  z-index: -1;
`;

const CustomText = styled(Text)<TextProps>`
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.base.text[100] : theme.base.text[300]};
`;
