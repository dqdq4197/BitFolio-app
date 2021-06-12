import React, { useState, useEffect, useRef } from 'react';
import { 
  Animated, 
  Text,
  NativeSyntheticEvent,
  TextInputKeyPressEventData
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import CircleCloseButton from '/components/common/CircleCloseButton';
import useSearchData from '/hooks/useSearchData';
import useSearchTranding from '/hooks/useSearchTranding';
import CoinItem from './CoinItem';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { SearchCoin } from '/lib/api/CoinGeckoReturnType';
import ScrollCloseModal from '/components/common/ScrollCloseModal';

type FormModalProps = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

type FormData = {
  amount: number | string,
  quantity: number | string,
  memo: string,
  fee: number | string,
  date: number | string,
}

type AnimatedTextProps = {
  text: string;
  index: number;
  amountLength: number;
  isUnMount: boolean;
}
const AnimatedText = ({ text, index, amountLength, isUnMount }: AnimatedTextProps) => {
  const translateY = useRef(new Animated.Value(-40)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        delay: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        delay: 0,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start()
  }, [text])

  useEffect(() => {
    if(amountLength - 1 === index && isUnMount ) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -40,
          delay: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          delay: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start()
    }
  }, [isUnMount])

  return (
    <CustomText
      as={Animated.Text}
      style={{
        transform: [{ translateY }],
        opacity
      }}
    >
      { (amountLength - index) % 3 === 1 && (amountLength - index) > 3
        ? text + ','
        : text 
      }
    </CustomText>
  )
}
const FormModalLayout = ({ visible, setVisible }: FormModalProps) => {

  const [formData, setFormData] = useState<FormData>({
    amount: 0,
    quantity: 0,
    memo: "",
    fee: 0,
    date: 0
  })
  const [unMountText, setUnMountText] = useState(false);
  const { theme } = useGlobalTheme();
  const navigation = useNavigation();

  const handleChangeAmount = (text: string) => {
    if(unMountText) {
      setTimeout(() => {
        setFormData(
          prev => ({
            ...prev,
            amount: text === '' ? 0 : text
          })
        )
        setUnMountText(false)
      }, 200)
    } else {
      setFormData(
        prev => ({
          ...prev,
          amount: text === '' ? 0 : text
        })
      )
    }
  }

  const handleAmountKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    const { key } = event.nativeEvent;

    if(key === 'Backspace' && formData.amount !== 0) { 
      setUnMountText(true);
    }
  }

  return (
    <>
      <ScrollCloseModal
        visible={visible}
        setVisible={setVisible}
      >
        <AmountView>
          { formData.amount.toString().split('').map((letter, index, arr) => {
            return (
              <AnimatedText 
                text={letter}
                index={index}
                amountLength={arr.length}
                isUnMount={unMountText}
              />
            )
          }) }
          <CustomText>
            원
          </CustomText>
        </AmountView>
        <TextInput 
          keyboardType="numeric"
          onChangeText={handleChangeAmount} 
          onKeyPress={handleAmountKeyPress}
        >
        </TextInput>
      </ScrollCloseModal>
    </>
  )
}

export default FormModalLayout;

const View = styled.View`

`

const AmountView = styled.View`
  flex-direction: row;
  height: 100px;
  justify-content: center;
  align-items: center;
`
const TextInput = styled.TextInput`
  background-color: black;
  height: 50px; 
  color: white;
`

const CustomText = styled.Text`
  color: ${({ theme }) => theme.base.text[100]};
  font-size: ${({ theme }) => theme.size.font_xxxl};
  height: 100px;
  padding-top: 30px;
`