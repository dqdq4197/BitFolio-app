import { Easing } from 'react-native-reanimated';
import type { KeyboardEventEasing } from 'react-native';

const getKeyboardAnimationConfigs = (
  easing: KeyboardEventEasing,
  duration: number
) => {
  // eslint-disable-next-line default-case
  switch (easing) {
    case 'easeIn':
      return {
        easing: Easing.in(Easing.ease),
        duration,
      };

    case 'easeOut':
      return {
        easing: Easing.out(Easing.ease),
        duration,
      };

    case 'easeInEaseOut':
      return {
        easing: Easing.inOut(Easing.ease),
        duration,
      };

    case 'linear':
      return {
        easing: Easing.linear,
        duration,
      };

    case 'keyboard':
      return {
        damping: 500,
        stiffness: 1000,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 10,
        restSpeedThreshold: 10,
      };
  }
};

export default getKeyboardAnimationConfigs;
