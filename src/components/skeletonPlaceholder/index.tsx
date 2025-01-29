import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useMemo, useState } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  LayoutRectangle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import useGlobalTheme from '/hooks/useGlobalTheme'

const SCREEN_WIDTH = Dimensions.get('window').width

interface SkeletonPlaceholderProps {
  children: JSX.Element | JSX.Element[]
  /**
   * Determines the animation speed in milliseconds. Use 0 to disable animation
   * @default 800
   */
  speed?: number
  /**
   * Determines the animation direction, left or right
   * @default right
   */
  direction?: 'left' | 'right'
}

function SkeletonPlaceholder({
  children,
  speed = 800,
  direction = 'right',
}: SkeletonPlaceholderProps): JSX.Element {
  const { theme } = useGlobalTheme()
  const [layout, setLayout] = useState<LayoutRectangle>()
  const animatedValue = useMemo(() => new Animated.Value(0), [])
  const translateX = useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange:
          direction === 'right'
            ? [-SCREEN_WIDTH, SCREEN_WIDTH]
            : [SCREEN_WIDTH, -SCREEN_WIDTH],
      }),
    [animatedValue, direction]
  )
  const [backgroundColor, highlightColor] = useMemo(
    () => [theme.base.background[200], theme.base.background[300]],
    [theme.base.background]
  )

  useEffect(() => {
    if (speed > 0) {
      const loop = Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: speed,
          easing: Easing.ease,
          useNativeDriver: true,
        })
      )
      if (layout?.width && layout?.height) {
        loop.start()
      }
      return () => loop.stop()
    }

    return undefined
  }, [animatedValue, speed, layout?.width, layout?.height])

  const absoluteTranslateStyle = useMemo(
    () => ({ ...StyleSheet.absoluteFillObject, transform: [{ translateX }] }),
    [translateX]
  )

  if (!layout?.width || !layout?.height) {
    return (
      <View onLayout={(event) => setLayout(event.nativeEvent.layout)}>
        {children}
      </View>
    )
  }

  return (
    <MaskedView
      style={{ height: layout.height, width: layout.width }}
      maskElement={
        <View
          style={{
            backgroundColor: 'transparent',
          }}
        >
          {children}
        </View>
      }
    >
      <View style={{ flexGrow: 1, backgroundColor }} />
      {speed > 0 && (
        <Animated.View
          style={[
            {
              flexDirection: 'row',
            },
            absoluteTranslateStyle,
          ]}
        >
          <MaskedView
            style={StyleSheet.absoluteFill}
            maskElement={
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
                colors={['transparent', 'black', 'transparent']}
              />
            }
          >
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: highlightColor },
              ]}
            />
          </MaskedView>
        </Animated.View>
      )}
    </MaskedView>
  )
}

interface SkeletonPlaceholderItem extends ViewStyle {
  children?: JSX.Element | JSX.Element[]
}

SkeletonPlaceholder.Item = function SkeletonPlaceholderItem({
  children,
  ...style
}: SkeletonPlaceholderItem): JSX.Element {
  const { theme } = useGlobalTheme()
  const basicStyle: ViewStyle = children
    ? { backgroundColor: 'transparent', overflow: 'hidden' }
    : { backgroundColor: theme.base.background[200] }

  return <View style={[basicStyle, style]}>{children}</View>
}

export default SkeletonPlaceholder
