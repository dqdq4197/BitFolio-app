import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, GestureResponderHandlers } from 'react-native';
import styled, { css } from 'styled-components/native';
import { FormData } from './FormModal';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Text from '/components/common/Text';
import { AntDesign, FontAwesome5, MaterialCommunityIcons  } from '@expo/vector-icons';
import { PanGestureHandler } from 'react-native-gesture-handler';

type ViewProps = {
  transactionType: string
  transferType: string | null
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  FOOTER_HEIGHT: number
}

const { width, height } = Dimensions.get('window');
const transactionTypes = [{
  key: 'buy',
  name: 'Buy',
  icon: (color: string) => <AntDesign name="swapleft" size={24} color={color} />,
},{
  key: 'sell',
  name: 'Sell',
  icon: (color: string) => <AntDesign name="swapright" size={24} color={color} />,
},{
  key: 'transfer',
  name: 'Transfer',
  icon: (color: string) => <MaterialCommunityIcons name="transfer" size={24} color={color} />,
}]

const transferTypes = [{
  key: 'transfer in',
  name: 'Transfer In',
  icon: (color: string) => <AntDesign name="arrowdown" size={18} color={color} />,
}, {
  key: 'transfer out',
  name: 'Transfer Out',
  icon: (color: string) => <AntDesign name="arrowup" size={18} color={color} />,
}];

const TypeSelectView = ({ 
  setFormData,
  transactionType,
  transferType,
  FOOTER_HEIGHT
}: ViewProps) => {
  const { theme } = useGlobalTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const TransferTypeWidth = (width - parseInt(theme.content.spacing) * 2) / 2;
  const TransactionTypeWidth = ((width - parseInt(theme.content.spacing) * 2) - 20) / 3;

  useEffect(() => {
    const index = transferTypes.findIndex(type => type.key === transferType);
    setTranslateX(index);
  }, [transferType])

  useEffect(() => {
    if(transactionType === 'transfer') {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: -20,
          duration: 200,
          useNativeDriver: true
        })
      ]).start()
    }
  }, [transactionType])

  const setTranslateX = (index: number) => {
    Animated.timing(translateX, {
      toValue: TransferTypeWidth * index,
      delay: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  }

  const onSwitchTransactionType = (type: string) => {
    setFormData(
      prev => ({
        ...prev,
        type
      })
    )
  }

  const onSwitchTransferType = (type: string) => {
    setFormData(
      prev => ({
        ...prev,
        transferType: type
      })
    )
  }
  
  return (
    <Container height={height - FOOTER_HEIGHT - 70}>
      <TransactionTypeWrap >
        { transactionTypes.map(type => 
          <TransactionType 
            key={type.key} 
            activeOpacity={0.6}
            width={TransactionTypeWidth}
            isSelected={type.key === transactionType}
            onPress={() => onSwitchTransactionType(type.key)}
          >
            { type.icon(type.key === transactionType ? theme.base.text[100] : theme.base.text[300]) }
            <CustomText 
              isSelected={type.key === transactionType}
              margin="0 0 0 5px"
              color100 
              bold 
              fontML
            >
              { type.name }
            </CustomText>
          </TransactionType>  
        )}
      </TransactionTypeWrap>
      <TransferTypeWrap
        as={Animated.View}
        style={{
          transform: [{
            translateY
          }],
          opacity
        }}
      >
        { transferTypes.map(type => 
          <TransferType 
            key={type.name} 
            width={TransferTypeWidth}
            onPress={() => onSwitchTransferType(type.key)} 
            activeOpacity={0.6}
          >
            { type.icon(type.key === transferType ? theme.base.text[100] : theme.base.text[300]) }
            <CustomText 
              isSelected={type.key === transferType}
              margin="0 0 0 5px"
              color100 
              bold 
              fontML
            >
              { type.name }
            </CustomText>
          </TransferType>
        )}
        <Indicator 
          as={Animated.View}
          width={TransferTypeWidth}
          onTouchStart={() => console.log('asdas')}
          style={{
            transform: [{
              translateX
            }]
          }}
        />
      </TransferTypeWrap>
    </Container>
  )
}

export default TypeSelectView;

type ContainerProps = {
  height: number
}

type TypeProps = {
  width: number
  isSelected?: boolean
}

type TextProps = {
  isSelected: boolean
}

const Container = styled.View<ContainerProps>`
  height: ${({ height }) => height}px;
  padding: 0 ${({ theme }) => theme.content.spacing};
  justify-content: center;
`


const TransactionTypeWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 150px;
`

const TransactionType = styled.TouchableOpacity<TypeProps>`
  height: 100%;
  width: ${({ width }) => width}px;
  background-color: ${({ theme }) => theme.base.background[300]};
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.border.ml};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, isSelected }) => isSelected ? theme.base.primaryColor : 'transparent'};
`

const TransferTypeWrap = styled.View`
  flex-direction: row;
  height: 50px;
  background-color: ${({ theme }) => theme.base.background[300]};
  border-radius: ${({ theme }) => theme.border.m};
  margin-top: 20px;
`

const TransferType = styled.TouchableOpacity<TypeProps>`
  flex-direction: row;
  width: ${({ width }) => width}px;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const Indicator = styled.View<TypeProps>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: 100%;
  background-color: ${({ theme }) => theme.base.background[400]};
  border-radius: ${({ theme }) => theme.border.m};
  z-index: -1;
`

const CustomText = styled(Text)<TextProps>`
  color: ${({ theme, isSelected }) => isSelected
    ? theme.base.text[100]
    : theme.base.text[300]
  };
`