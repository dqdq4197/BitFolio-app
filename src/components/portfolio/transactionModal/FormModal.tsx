import React, { useState, useEffect, useRef } from 'react';
import { 
  Animated, 
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Easing
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import useGlobalTheme from '/hooks/useGlobalTheme';
import ScrollCloseModal from '/components/common/ScrollCloseModal';
import { easeQuadOut} from 'd3-ease';
import NumericPad from './NumericPad';
import Text from '/components/common/Text';

type FormModalProps = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

type FormData = {
  amount: string,
  quantity: number | string,
  memo: string,
  fee: number | string,
  date: number | string,
}

type RoolingTextProps = {
  text: string;
  index: number;
  amountLength: number;
  unMountingList: number[];
}

const RoolingText = ({ text, index, amountLength, unMountingList }: RoolingTextProps) => {
  const translateY = useRef(new Animated.Value(-40)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        delay: 0,
        duration: 300,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        delay: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start()
  }, [text])

  useEffect(() => {
    if(unMountingList.includes(index)) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -50,
          delay: 0,
          duration: 200,
          easing: Easing.out(easeQuadOut),
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
  }, [unMountingList])

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

  const { theme } = useGlobalTheme();
  const navigation = useNavigation();
  const [unMountingList, setUnMountingList] = useState<number[]>([]);
  const [dummyAmount, setDummyAmount] = useState('0');
  const [formData, setFormData] = useState<FormData>({
    amount: '0',
    quantity: 0,
    memo: "",
    fee: 0,
    date: 0
  })

  useEffect(() => {
    if(!visible) 
      setFormData({
        amount: '0',
        quantity: 0,
        memo: "",
        fee: 0,
        date: 0
      })
      setUnMountingList([])
  }, [visible])

  const handleBackspacePress = () => {
    
    if(dummyAmount !== '0' && dummyAmount.length > 0) {
      setUnMountingList(
        prev => [dummyAmount.length - 1, ...prev]
      )
    }
  }


  console.log('asd',dummyAmount, formData.amount)
  const handleNumericKeyPress = (key: string) => {
    const currentAmount = formData.amount;

    if(key === 'backspace' && dummyAmount !== '0') {
      setDummyAmount(prev => 
        prev.length === 1 
          ? '0'
          : prev.slice(0, prev.length - 1))
      setTimeout(() => {
        setUnMountingList(
          prev => prev.filter(index => dummyAmount.length - 1 !== index)
        )
        setFormData(
          prev => ({
            ...prev,
            amount: 
              dummyAmount.length === 1 
                ? '0' 
                : currentAmount.slice(0, dummyAmount.length - 1)
          })
        )
      }, 200)
    }

    if(key !== 'backspace') {
      if(dummyAmount === '0') {
        setDummyAmount(key)
        setFormData(
          prev => ({
            ...prev,
            amount: key
          })
        )
      } else {
        setDummyAmount(prev => prev + key)
        setFormData(
          prev => ({
            ...prev,
            amount: currentAmount + key
          })
        )
      }
    }
  }

  return (
    <>
      <ScrollCloseModal
        visible={visible}
        setVisible={setVisible}
        footerComponent={
          <ConfirmButton>
            <Text color100 fontXL>
              확인
            </Text>
          </ConfirmButton>
        }
      >
        <AmountView>
          { formData.amount.split('').map((letter, index, arr) => {
            return (
              <RoolingText 
                text={letter}
                index={index}
                amountLength={arr.length}
                unMountingList={unMountingList}
              />
            )
          }) }
          <CustomText>
            원
          </CustomText>
        </AmountView>
        <Text>
          {formData.amount}
        </Text>
        <NumericPad 
          height={230}
          onNumericKeyPress={handleNumericKeyPress}
          onBackspacePress={handleBackspacePress}
        />
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

const ConfirmButton = styled.TouchableOpacity`
  height: 45px;
  background-color: ${({ theme }) => theme.base.primaryColor};
  border-top-left-radius: ${({ theme }) => theme.border.l};
  border-top-right-radius: ${({ theme }) => theme.border.l};
  align-items: center;
  justify-content: center;
`
