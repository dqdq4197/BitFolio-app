import { useLayoutEffect, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type HeaderTitleProps = {
  title?: string | React.ReactNode,
  triggerPoint: number
}
const useAnimatedHeaderTitle = ({ title,  triggerPoint }: HeaderTitleProps) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if(title) {
      navigation.setOptions({
        title
      })
    }
  }, [navigation, title])

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        opacity: scrollY.interpolate({
          inputRange: [triggerPoint, triggerPoint + 20],
          outputRange: [0, 1]
        })
      },
    })
  }, [scrollY, navigation])

  return { scrollY };
}

export default useAnimatedHeaderTitle;