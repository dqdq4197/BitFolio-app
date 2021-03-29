import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { 
  Platform,
  Keyboard,
  ScrollView,
  TextInput,
  EmitterSubscription,
  NativeSyntheticEvent,
  NativeScrollEvent,
  KeyboardEvent,
} from 'react-native';
import { TAB_BAR_HEIGHT } from '/lib/constant';


interface KeyboardAwareProps {
  viewIsInsideTabBar?: boolean,
  extraScrollHeight: number,
  autoScrollDependency: unknown,
  children: any,
}
const KeyboardAwareScrollView = forwardRef(({
  viewIsInsideTabBar = false,
  extraScrollHeight = 0,
  autoScrollDependency,
  children
}:KeyboardAwareProps, ref?:React.Ref<ScrollView>) => {

  const positionRef = useRef<number>(0);
  const [keyboardSpace, SetKeyBoardSpace] = useState(
    viewIsInsideTabBar ? TAB_BAR_HEIGHT + extraScrollHeight : extraScrollHeight
  );
  

  useEffect(() => {
    let keyboardWillShowEvent: EmitterSubscription;
    let keyboardWillHideEvent: EmitterSubscription;

    if(Platform.OS === 'android') {
      keyboardWillShowEvent = Keyboard.addListener(
        'keyboardDidShow', 
        updateKeyboardSpace
      )

      keyboardWillHideEvent = Keyboard.addListener(
        'keyboardDidHide', 
        resetKeyboardSpace
      )
    } else {
      keyboardWillShowEvent = Keyboard.addListener(
        'keyboardWillShow', 
        updateKeyboardSpace
      )

      keyboardWillHideEvent = Keyboard.addListener(
        'keyboardWillHide', 
        resetKeyboardSpace
      )
    }
    
    return () => {
      // keyboard event 해제
      keyboardWillShowEvent && keyboardWillShowEvent.remove();
      keyboardWillHideEvent && keyboardWillHideEvent.remove();
    }
  }, [])

  useEffect(() => {
      // textInputRef.current.measure((fy:number ,y:number, width:number, _height:number, pageX:number, pageY:number) => {
      //   const offsetToTop = y - scrollRef.current;
      //   const offsetToKeyboard = offsetToTop - keyboardHeight;
      //   if(offsetToTop < TEXTINPUT_HEIGHT) {
      //     scrollViewRef.current?.scrollTo({
      //       x: 0,
      //       y: y - TOPTOSCROLL
      //     })
      //   }
      //   if(offsetToKeyboard > 0) {
      //     scrollViewRef.current?.scrollTo({
      //       x: 0,
      //       y: y - (height - keyboardHeight) + 175
      //     })
      //   }
      // })
  }, [autoScrollDependency])

  const updateKeyboardSpace = (event: KeyboardEvent) => {
    if(viewIsInsideTabBar) {
      SetKeyBoardSpace(TAB_BAR_HEIGHT + extraScrollHeight + event.endCoordinates.height)
    } else {
      SetKeyBoardSpace(extraScrollHeight + event.endCoordinates.height)
    }
  }

  const resetKeyboardSpace = (event: KeyboardEvent) => {
    if(viewIsInsideTabBar) {
      SetKeyBoardSpace(TAB_BAR_HEIGHT + extraScrollHeight)
    } else {
      SetKeyBoardSpace(extraScrollHeight)
    }
  }

  const handleOnScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    positionRef.current = event.nativeEvent.contentOffset.y;
  }

  return (
    <ScrollView
      ref={ref}
      keyboardDismissMode={Platform.OS === 'ios' ? "interactive" : "on-drag"}
      contentInset={{ bottom: keyboardSpace }}
      scrollEventThrottle={1}
      onScroll={handleOnScroll}
    >
      {children}
    </ScrollView>
  )
})

export default KeyboardAwareScrollView;