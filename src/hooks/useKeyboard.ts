import { useEffect, useCallback } from 'react';
import {
  Keyboard,
  KeyboardEvent,
  KeyboardEventEasing,
  KeyboardEventName,
  Platform,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { getKeyboardAnimationConfigs } from '/lib/utils';
import { KEYBOARD_STATE } from '/lib/constant';

const KEYBOARD_EVENT_MAPPER = {
  KEYBOARD_SHOW: Platform.select({
    ios: 'keyboardWillShow',
    android: 'keyboardDidShow',
  }) as KeyboardEventName,
  KEYBOARD_HIDE: Platform.select({
    ios: 'keyboardWillHide',
    android: 'keyboardDidHide',
  }) as KeyboardEventName,
};

const useKeyboard = () => {
  const keyboardHeight = useSharedValue(0);
  const keyboardState = useSharedValue<KEYBOARD_STATE>(
    KEYBOARD_STATE.UNDETERMINED
  );
  const keyboardAnimationEasing = useSharedValue<KeyboardEventEasing>('keyboard');
  const keyboardAnimationDuration = useSharedValue(500);

  const handleKeyboardEvent = useCallback((
    state: KEYBOARD_STATE, 
    height: number, 
    duration: number, 
    easing: KeyboardEventEasing
  ) => {
    keyboardHeight.value =
        state === KEYBOARD_STATE.SHOWN
          ? height
          : 0;
    keyboardAnimationDuration.value = duration;
    keyboardAnimationEasing.value = easing;
    keyboardState.value = state;
  }, [getKeyboardAnimationConfigs])

  useEffect(() => {
    const handleOnKeyboardShow = (event: KeyboardEvent) => {
      handleKeyboardEvent(
        KEYBOARD_STATE.SHOWN,
        event.endCoordinates.height,
        event.duration,
        event.easing
      )
    };
    const handleOnKeyboardHide = (event: KeyboardEvent) => {
      handleKeyboardEvent(
        KEYBOARD_STATE.HIDDEN,
        event.endCoordinates.height,
        event.duration,
        event.easing
      )
    };

    const showSubscription = Keyboard.addListener(
      KEYBOARD_EVENT_MAPPER.KEYBOARD_SHOW,
      handleOnKeyboardShow
    );

    const hideSubscription = Keyboard.addListener(
      KEYBOARD_EVENT_MAPPER.KEYBOARD_HIDE,
      handleOnKeyboardHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [handleKeyboardEvent]);

  return {
    state: keyboardState,
    height: keyboardHeight,
    animationEasing: keyboardAnimationEasing,
    animationDuration: keyboardAnimationDuration,
  }
}

export default useKeyboard;