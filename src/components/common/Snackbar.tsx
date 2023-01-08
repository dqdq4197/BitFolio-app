import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import type { AlertProps } from '/hooks/context/useFeedBackContext';
import useGlobalTheme from '/hooks/useGlobalTheme';

import Stack from './Stack';
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
  const { t } = useTranslation();
  const { id, message, severity, duration, onPress } = materials;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-10)).current;
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const { scheme } = useGlobalTheme();

  const resetCurrentTimeout = useCallback(() => {
    if (timeout.current) {
      opacity.setValue(0);
      translateY.setValue(-10);
      clearTimeout(timeout.current);
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
      <BlurWrap intensity={75} tint={scheme === 'dark' ? 'dark' : 'light'}>
        <Icon severity={severity} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
        >
          <Text
            color100
            bold
            fontML
            margin="0 0 0 10px"
            style={{ flexShrink: 1 }}
          >
            {message}
          </Text>
          {onPress && (
            <StyledButton activeOpacity={0.7} onPress={onPress}>
              <Text fontM color100 bold>
                {t(`common.go`)}
              </Text>
            </StyledButton>
          )}
        </Stack>
      </BlurWrap>
    </Container>
  );
};

export default Snackbar;

const Container = styled(Animated.View)`
  position: absolute;
  left: ${({ theme }) => theme.content.spacing};
  right: ${({ theme }) => theme.content.spacing};
  top: 55px;
  min-height: 50px;
  border-radius: ${({ theme }) => theme.border.m};
  z-index: ${({ theme }) => theme.zIndex.snackbar};
  overflow: hidden;
`;

const BlurWrap = styled(BlurView)`
  height: 100%;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => `10px ${theme.content.spacing}`};
`;

const StyledButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.base.primaryColor};
  border-radius: ${({ theme }) => theme.border.m};
  padding: 7px 10px;
  margin-left: 4px;
`;
