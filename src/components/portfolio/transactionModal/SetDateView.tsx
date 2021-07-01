import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Animated } from 'react-native';
import styled from 'styled-components/native';
import Text from '/components/common/Text';
import DateTimePicker from '@react-native-community/datetimepicker';
import useLocales from '/hooks/useLocales';
import { format } from 'date-fns';
import { ko, enUS } from 'date-fns/locale'


const { width } = Dimensions.get('window');

type DateViewProps = {
  height: number
  date: number
  isFocused: boolean
  setDate: (date: number) => void
}

const SetDateView = ({ 
  height,
  date,
  isFocused,
  setDate
}: DateViewProps) => {
  const { language } = useLocales();
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const translateY = useRef(new Animated.Value(25)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if(isFocused) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        })
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 25,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        })
      ]).start()
    }
  }, [isFocused])

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(+currentDate);
  };

  const changePicker = (mode: 'date' | 'time') => {
    setMode(mode)
  }

  return (
    <Container height={height}>
      <PickerSelectionWrap>
        <Wrapper 
          activeOpacity={0.6}
          onPress={() => changePicker('date')} 
          style={{ marginRight: 10 }}
        >
          <Text bold margin="0 0 7px 0">
            Date
          </Text>
          <Text color100 bold fontML>
            { format(
              new Date(date), language === 'en' ? 'PP' : 'PPP', {
              locale: language === 'en' ? enUS : ko
            }) }
          </Text>
        </Wrapper>
        <Wrapper 
          activeOpacity={0.6} 
          onPress={() => changePicker('time')}
        >
          <Text bold margin="0 0 7px 0">
            Time
          </Text>
          <Text color100 bold fontML>
            { language === 'ko' && (
              format(new Date(date), 'a', {
                locale: ko
              }) + ' '
            )} 
            { language === 'ko' && (
              format(new Date(date), 'p', {
                locale: enUS
              }).slice(0, -2)
            )}
            { language === 'en' && (
              format(new Date(date), 'p', {
                locale: enUS
              })
            )}
          </Text>
        </Wrapper>
      </PickerSelectionWrap>
      <PickerWrap
        as={Animated.View}
        style={{
          transform: [{
            translateY
          }],
          opacity
        }}
      >
        <DateTimePicker
          testID="datePicker"
          minimumDate={new Date(1167613200000)} // 2007-01-01 1h 00 00
          maximumDate={new Date()}
          value={new Date(date)}
          locale={language}
          mode={mode}
          display="spinner" // compact ios 14이상 지원.. spinner ui도 대비할 것...
          onChange={onChange}
          minuteInterval={10}
          style={{
            flex: 1
          }}
        />
      </PickerWrap>
    </Container>
  )
}

export default SetDateView;

type ContainerType = {
  height: number;
}

const Container = styled.View<ContainerType>`
  width: ${ width }px;
  height: ${({ height }) => height }px;
  padding: 16px ${({ theme }) => theme.content.spacing} 0;
`

const Wrapper = styled.TouchableOpacity`
  flex: 1;
  height: 100px;
  background-color: ${({ theme }) => theme.base.background[200]};
  border-radius: ${({ theme }) => theme.border.ml};
  padding: ${({ theme }) => theme.content.spacing};
`

const PickerSelectionWrap = styled.View`
  flex-direction: row;
`

const PickerWrap = styled.View`
  flex: 1;
`