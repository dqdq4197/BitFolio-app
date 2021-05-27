import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import Svg, { G, Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { AntDesign } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';

type ButtonProps = {
  percentage: number,
  onModalClose: () => void;
}

const size = 35;
const iconSize = size - 5;
const strokeWidth = 2;
const center = size / 2;
const radius = size / 2 - strokeWidth / 2;
const circumference = 2 * Math.PI * radius;

const CloseButton = ({ percentage, onModalClose }: ButtonProps) => {

  const { theme } = useGlobalTheme();

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef<any>(null);

  useEffect(() => {
    if(percentage >= 100) {
      animation(100)
      Haptics.impactAsync();
    } else if(percentage <= 0) {
      animation(0)
    } else {
      animation(percentage)
    }
  }, [percentage])

  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        let strokeDashoffset = circumference - (circumference * value.value) / 100;
        
        if(progressRef.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset
          })
        }
      } 
    )
  }, [])
  
  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Conatiner style={{ width: size, height: size}}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle 
            stroke={theme.base.background.surface}
            cx={center} 
            cy={center} 
            r={radius} 
            strokeWidth={strokeWidth} 
          />
          <Circle 
            ref={progressRef}
            stroke={theme.base.primaryColor}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <Icon onPress={onModalClose}>
        <AntDesign 
          name="closecircle" 
          size={iconSize} 
          color={theme.base.text[200]}
        />
      </Icon>
    </Conatiner>
  )
}

export default CloseButton;

const Conatiner =  styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.base.background.surface};
  border-radius: ${size / 2}px;
`

const Icon = styled.TouchableOpacity`
  position: absolute;
`