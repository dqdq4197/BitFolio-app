import React, { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import CircleCloseButton from '/components/common/CircleCloseButton';

const SIZE = 35;
const STROKEWIDTH = 2;
const RADIUS = SIZE / 2 - STROKEWIDTH / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type ModalProps = {
  visible: boolean;
  children: React.ReactNode;
  setVisible: (
    state: boolean
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;
  headerComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  extraComponent?: React.ReactNode;
  titleComponent?: React.ReactNode;
  footerHeight?: number;
};

const ScrollCloseModal = ({
  visible,
  setVisible,
  children,
  headerComponent,
  footerComponent,
  extraComponent,
  titleComponent,
  footerHeight = 0,
}: ModalProps) => {
  // const { currentHeight } = StatusBar
  const progressRef = useRef<any>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const [isFullProgress, setIsFullProgress] = useState(false);

  useEffect(() => {
    // initail set strokeDashoffset
    if (progressRef.current) {
      progressRef.current.setNativeProps({
        strokeDashoffset: CIRCUMFERENCE,
      });
    }
  }, []);

  useEffect(() => {
    scrollY.removeAllListeners();
    scrollY.addListener(v => {
      const { value } = v;

      const offset = CIRCUMFERENCE - (CIRCUMFERENCE * -value) / 100;

      const strokeDashoffset =
        offset >= CIRCUMFERENCE ? CIRCUMFERENCE : offset <= 0 ? 0 : offset;

      if (progressRef.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }

      if (strokeDashoffset === 0 && !isFullProgress) {
        setIsFullProgress(true);
        Haptics.impactAsync();
      }

      if (strokeDashoffset !== 0 && isFullProgress) {
        setIsFullProgress(false);
      }
    });
  }, [isFullProgress, scrollY]);

  const handleModalClose = () => {
    setVisible(false);
  };

  const handleScrollEndDrag = () => {
    if (isFullProgress) {
      setVisible(false);
    }
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  return (
    <Modal animationType="slide" visible={visible}>
      <Container behavior="padding">
        <HeaderView insetTop={insets.top}>
          {titleComponent || <Blank />}
          <CircleCloseButton
            SIZE={SIZE}
            STROKEWIDTH={STROKEWIDTH}
            RADIUS={RADIUS}
            CIRCUMFERENCE={CIRCUMFERENCE}
            onModalClose={handleModalClose}
            ref={progressRef}
          />
        </HeaderView>
        {headerComponent}
        <ScrollView
          as={Animated.ScrollView}
          keyboardDismissMode="on-drag"
          onScroll={handleScroll}
          scrollEventThrottle={1}
          footerHeight={footerHeight}
          onScrollEndDrag={handleScrollEndDrag}
        >
          {children}
        </ScrollView>
        {footerComponent}
      </Container>
      {extraComponent}
    </Modal>
  );
};

export default ScrollCloseModal;

type ScrollViewProps = {
  footerHeight: number;
};

const Modal = styled.Modal``;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.base.background.surface};
`;

const HeaderView = styled.View<{ insetTop: number }>`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: ${({ insetTop, theme }) => `
    ${insetTop + 10}px ${theme.content.spacing} 0
  `};
`;

const ScrollView = styled.ScrollView<ScrollViewProps>`
  width: 100%;
  padding-bottom: ${({ footerHeight }) => footerHeight}px;
`;

const Blank = styled.View``;
