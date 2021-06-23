import React, { useRef, useEffect } from 'react';
import { Animated, Easing, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { easeQuadOut} from 'd3-ease';
import Text, { TextStyleProps } from '/components/common/Text';

type RollingTextProps = {
  text: string;
  unMountingList: number[];
  textStyleProps?: TextStyleProps;
}

type AnimatedTextProps = {
  text: string;
  index: number;
  integerLength: number;
  unMountingList: number[];
  textStyleProps?: TextStyleProps;
  totalLength: number
}

const AnimatedText = ({ 
  text, 
  index, 
  integerLength, 
  unMountingList,
  textStyleProps,
  totalLength
}: AnimatedTextProps) => {

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
      style={
        Object.assign({
          transform: [{ translateY }],
          opacity
        })
      }
      totalLength={totalLength}
      {...textStyleProps}
    >
      { (integerLength - index) % 3 === 1 && (integerLength - index) > 3
        ? text + ','
        : text 
      }
    </CustomText>
  )
}

const RollingText = ({ text, unMountingList, textStyleProps }: RollingTextProps) => {

  return (
    <Container>
      {
        text.split('').map((letter, index, arr) => {
          return (
            <AnimatedText 
              key={letter + index}
              text={letter}
              index={index}
              integerLength={arr.join('').split('.')[0].length}
              unMountingList={unMountingList}
              textStyleProps={textStyleProps}
              totalLength={text.length}
            />
          )
        })
      }
    </Container>
  )
}

export default RollingText;

type TextProps = {
  totalLength: number
}
const Container = styled.View`
  flex-direction: row;
`

const CustomText = styled(Text)<TextProps>`
color: white;
  ${({ totalLength, theme }) => {
    switch (totalLength) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return `font-size: ${theme.size.font_xxxl}`
      case 7:
      case 8:
      case 9:
        return `font-size: ${theme.size.font_xxl}`
      case 10:
      case 11:
      case 12:
        return `font-size: ${theme.size.font_xl}`

      default:
        return `font-size: ${theme.size.font_x}`
    }
  }}
`
