import { useLayoutEffect, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useGlobalTheme from '/hooks/useGlobalTheme';


type HeaderTitleProps = {
  title?: string,
  triggerPoint: number
}
const useAnimatedHeaderTitle = ({ title,  triggerPoint }: HeaderTitleProps) => {
  const { theme } =useGlobalTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if(title) {
      navigation.setOptions({
        title
      })
    }
  }, [title])

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        opacity: scrollY.interpolate({
          inputRange: [0, triggerPoint],
          outputRange: [0, 1]
        })
      } 
    })
  }, [scrollY])

  return { scrollY };
}

export default useAnimatedHeaderTitle;