import React, { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
import { easeQuadOut} from 'd3-ease';
import CustomText, { TextStyleProps } from '/components/common/Text';

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
}

const AnimatedText = ({ 
  text, 
  index, 
  integerLength, 
  unMountingList,
  textStyleProps
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
            />
          )
        })
      }
    </Container>
  )
}

export default RollingText;

const Container = styled.View`
  flex-direction: row;
`