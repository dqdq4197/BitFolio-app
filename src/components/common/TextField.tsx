import React, {
  useState,
  useRef,
  forwardRef,
  useEffect,
  useCallback,
} from 'react'
import {
  TextInputProps,
  Animated,
  TextInput,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'

import useGlobalTheme from '/hooks/useGlobalTheme'

import Text from '/components/common/Text'

interface TextFieldProps extends TextInputProps {
  label: string
  type?: 'text' | 'password'
  errorMessage?: string
  alertMessage?: string
  marginBottom?: number
}
type ErrorTextProps = Pick<TextFieldProps, 'errorMessage' | 'alertMessage'>

const status = {
  normal: 0,
  focus: 1,
  error: 2,
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const ErrorText = ({ errorMessage, alertMessage }: ErrorTextProps) => {
  useEffect(() => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, 'easeInEaseOut', 'opacity')
    )
  }, [errorMessage])

  return (
    <>
      {errorMessage ? (
        <Text error margin="8px 0 0 0">
          {errorMessage}
        </Text>
      ) : (
        alertMessage && (
          <Text margin="8px 0 0 0" lineHeight={16}>
            {alertMessage}
          </Text>
        )
      )}
    </>
  )
}

const TextField = forwardRef<TextInput, TextFieldProps>(
  (
    {
      label,
      type = 'text',
      errorMessage,
      alertMessage,
      marginBottom,
      ...textInputProps
    },
    ref
  ) => {
    const { theme } = useGlobalTheme()
    const [isSecure, setIsSecure] = useState(type === 'password')
    const [currentStatus, setCurrentStatus] = useState(status.normal)
    const statusAni = useRef(new Animated.Value(status.normal)).current

    const changeStatus = useCallback(
      (toValue: number) => {
        Animated.timing(statusAni, {
          toValue,
          duration: 300,
          useNativeDriver: false,
        }).start()
        setCurrentStatus(toValue)
      },
      [statusAni]
    )

    useEffect(() => {
      if (errorMessage) {
        if (currentStatus !== status.focus) {
          changeStatus(status.error)
        }
      } else {
        changeStatus(
          currentStatus === status.focus ? status.focus : status.normal
        )
      }
    }, [changeStatus, currentStatus, errorMessage])

    const handleInputFocus = () => {
      changeStatus(status.focus)
    }

    const handleInputBlur = () => {
      changeStatus(errorMessage ? status.error : status.normal)
    }

    const color = statusAni.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [
        theme.base.text[100],
        theme.base.primaryColor,
        theme.base.error,
      ],
    })

    const backgroundColor = statusAni.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [
        theme.base.background[200],
        theme.base.background[300],
        theme.base.background[200],
      ],
    })

    const borderColor = statusAni.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [
        theme.base.background[200],
        theme.base.background[300],
        theme.base.error,
      ],
    })

    const handleSecureIconPress = () => {
      setIsSecure(prev => !prev)
    }

    return (
      <Container marginBottom={marginBottom}>
        <Text
          as={Animated.Text}
          color100
          style={{ color: color as any }}
          fontML
          bold
          margin="0 0 15px 0"
        >
          {label}
        </Text>
        <TextInputWrapper
          as={Animated.View}
          style={{
            backgroundColor,
            borderColor,
          }}
        >
          <StyledTextInput
            {...textInputProps}
            ref={ref}
            spellCheck={false}
            autoCapitalize="none"
            secureTextEntry={isSecure}
            clearButtonMode={type === 'password' ? 'never' : 'always'}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {type === 'password' && (
            <SecureIcon
              onPress={handleSecureIconPress}
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={theme.base.text[200]}
            />
          )}
        </TextInputWrapper>
        <ErrorText errorMessage={errorMessage} alertMessage={alertMessage} />
      </Container>
    )
  }
)

export default TextField

type ContainerProps = Pick<TextFieldProps, 'marginBottom'>

const Container = styled.View<ContainerProps>`
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
`

const TextInputWrapper = styled.View`
  width: 100%;
  height: 55px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.base.error};
  border-radius: ${({ theme }) => theme.border.m};
`

const StyledTextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  padding: ${({ theme }) => `0 ${theme.content.spacing}`};
  color: ${({ theme }) => theme.base.text[100]};
  font-size: ${({ theme }) => theme.size.font_ml};
`

const SecureIcon = styled(Ionicons)`
  width: 30px;
`
