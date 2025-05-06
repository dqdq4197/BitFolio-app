import React from 'react'
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated'

function ListFooter() {
  const keyboard = useAnimatedKeyboard()

  const animatedStyles = useAnimatedStyle(() => ({
    height: keyboard.height.value,
  }))

  return <Animated.View style={animatedStyles} />
}

export default ListFooter
