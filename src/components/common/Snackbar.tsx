import React, { useEffect, useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import useGlobalTheme from '/hooks/useGlobalTheme';
import type { AlertProps } from '/hooks/context/useFeedBackContext';

import Text from './Text';

interface SanckbarProps {
  materials: AlertProps;
  clearAlert: () => void;
}

const Icon = ({ severity }: Pick<AlertProps, 'severity'>) => {
  const { theme } = useGlobalTheme();

  switch (severity) {
    case 'error':
      return (
        <AntDesign
          name="closecircle"
          size={20}
          color={theme.pallete.error.main}
        />
      );
    case 'info':
      return (
        <FontAwesome5
          name="info-circle"
          size={20}
          color={theme.pallete.info.main}
        />
      );
    case 'warning':
      return (
        <FontAwesome
          name="warning"
          size={20}
          color={theme.pallete.warning.main}
        />
      );
    default:
      return (
        <AntDesign
          name="checkcircle"
          size={20}
          color={theme.pallete.success.main}
        />
      );
  }
};
const Snackbar = ({ materials, clearAlert }: SanckbarProps) => {
  const { id, message, severity, duration, onPress } = materials;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-10)).current;
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const resetCurrentTimeout = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      opacity.setValue(0);
      translateY.setValue(-10);
    }
  }, [opacity, translateY]);

  useEffect(() => {
    resetCurrentTimeout();
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
    ]).start(() => {
      timeout.current = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -10,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => clearAlert());
      }, duration);
    });
  }, [id, clearAlert, duration, opacity, translateY, resetCurrentTimeout]);

  return (
    <Container
      style={{
        transform: [{ translateY }],
        opacity,
      }}
    >
      <Icon severity={severity} />
      <Text color100 bold fontML margin="0 0 0 10px">
        {message}
      </Text>
    </Container>
  );
};

export default Snackbar;

const Container = styled(Animated.View)`
  position: absolute;
  flex-direction: row;
  left: ${({ theme }) => theme.content.spacing};
  right: ${({ theme }) => theme.content.spacing};
  top: 45px;
  height: 45px;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.m};
  z-index: ${({ theme }) => theme.zIndex.snackbar};
  background-color: ${({ theme }) => theme.base.background[400]};
  padding: ${({ theme }) => `0 ${theme.content.spacing}`};
`;
