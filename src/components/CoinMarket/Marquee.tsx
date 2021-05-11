import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView, Animated, LayoutChangeEvent, Easing } from 'react-native';
import styled from 'styled-components/native';


type MarqueeProps = {
  delay: number;
}
const Marquee = ({ delay }: MarqueeProps) => {

  const [textWidth, setTextWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;


  // useEffect(() => {
  //   const animateScroll = () => {
  //     setTimeout(() => {
  //       Animated.timing(animatedValue, {
  //         toValue:         -textWidth,
  //         duration:        delay,
  //         easing:          Easing.ease,
  //         useNativeDriver: true
  //       }).start(({ finished }) => {
  //         animatedValue.setValue(0)
  //         animateScroll();
  //         console.log('sdfsdf')
  //       })
  //     }, 1)
  //   }

  //   animateScroll();
  // }, [])

  const handleTextLayout = (event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;
    setTextWidth(layout.width);
  }
  return (
    <Container>
      <TextWrap
        horizontal
        scrollEventThrottle={16}
        // onScrollBeginDrag={this.scrollBegin}
        // onScrollEndDrag={this.scrollEnd}
        showsHorizontalScrollIndicator={false}
        // display={animating ? 'flex' : 'none'}
      >
        <Text
          as={Animated.Text}
          onLayout={handleTextLayout}
          numberOfLines={1}
          style={{
            transform: [{
              translateX: animatedValue
            }]
          }}
        >
          시장시세 ㅁㄴㅇㅁㄴ아ㅣ노ㅓㄹㅇㅎ너ㅏㅇ로
        </Text>
        <Text
          as={Animated.Text}
          onLayout={handleTextLayout}
          numberOfLines={1}
          style={{
            transform: [{
              translateX: animatedValue
            }]
          }}
        >
          시장시세 ㅁㄴㅇㅁㄴ아ㅣ노ㅓㄹㅇㅎ너ㅏㅇ로
        </Text>
      </TextWrap>
    </Container>
  )
}

export default Marquee;

const Container = styled.View`
  width: 100%;
  overflow: hidden;
  flex: 1;
`
const TextWrap = styled(ScrollView)`
  flex: 1;
  /* flex-direction: 'row-reverse'; */
`

const Text = styled.Text`
  color: ${({ theme }) => theme.base.text[200]};
  font-size: ${({ theme }) => theme.size.font_x};
`

