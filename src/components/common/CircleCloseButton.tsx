import { type ComponentRef } from 'react'
import styled from 'styled-components/native'
import Svg, { G, Circle } from 'react-native-svg'
import { AntDesign } from '@expo/vector-icons'
import useGlobalTheme from '/hooks/useGlobalTheme'

type ButtonProps = {
  SIZE: number
  STROKEWIDTH: number
  RADIUS: number
  CIRCUMFERENCE: number
  onModalClose: () => void
}

function CloseButton({
  SIZE,
  STROKEWIDTH,
  RADIUS,
  CIRCUMFERENCE,
  onModalClose,
  ref,
}: ButtonProps & { ref?: ComponentRef<typeof Circle> }) {
  const { theme, scheme } = useGlobalTheme()

  return (
    <Container $size={SIZE} style={{ width: SIZE, height: SIZE }}>
      <Svg width={SIZE} height={SIZE}>
        <G rotation="-90" origin={SIZE / 2}>
          <Circle
            stroke={theme.base.background.surface}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="transparent"
            strokeWidth={STROKEWIDTH}
            strokeDasharray={CIRCUMFERENCE}
          />
          <Circle
            ref={ref}
            stroke={theme.base.primaryColor}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="transparent"
            strokeWidth={STROKEWIDTH}
            strokeDasharray={CIRCUMFERENCE}
          />
        </G>
      </Svg>
      <Icon onPress={onModalClose}>
        <AntDesign
          name="closecircle"
          size={SIZE - 6}
          color={
            scheme === 'light'
              ? theme.base.background[500]
              : theme.base.text[200]
          }
        />
      </Icon>
    </Container>
  )
}

export default CloseButton

const Container = styled.View<{ $size: number }>`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.base.background.surface};
  border-radius: ${({ $size }) => $size / 2}px;
`

const Icon = styled.TouchableOpacity`
  position: absolute;
`
