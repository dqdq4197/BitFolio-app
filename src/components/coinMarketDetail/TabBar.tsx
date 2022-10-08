import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  createRef,
  RefObject,
} from 'react';
import {
  Animated,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import styled from 'styled-components/native';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

import Tab from './Tab';

const { width: DWidth } = Dimensions.get('window');

interface TabMeasureType {
  left: number;
  top: number;
  width: number;
  height: number;
}

const TabBar = ({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [contentSize, setContentSize] = useState(0);
  const [measures, setMeasures] = useState<TabMeasureType[] | null | undefined>(
    null
  );
  const tabRefs = useRef<RefObject<TouchableOpacity>[]>(
    Array.from({ length: state.routes.length }, () => createRef())
  ).current;

  useEffect(() => {
    if (scrollViewRef.current && !measures) {
      const temp: TabMeasureType[] = [];

      tabRefs.forEach((ref, _, array) => {
        ref.current?.measureLayout(
          scrollViewRef.current as any,
          (left, top, width, height) => {
            temp.push({ left, top, width, height });

            if (temp.length === array.length) {
              if (width === 0 || height === 0) setMeasures(undefined);
              else setMeasures(temp);
            }
          },
          () => console.log('fail')
        );
      });
    }
  }, [measures, tabRefs]);

  useEffect(() => {
    if (scrollViewRef.current && measures) {
      const { index } = state;
      const screenCenterXPos = DWidth / 2 - measures[index].width / 2;

      scrollViewRef.current.scrollTo({
        x: measures[index].left - screenCenterXPos,
        y: 0,
        animated: true,
      });
    }
  }, [state, measures]);

  const standardSize = useMemo(() => {
    if (!contentSize) return 0;
    return contentSize / state.routes.length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentSize]);

  const inputRange = useMemo(() => {
    return state.routes.map((_, i) => i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const indicatorScale = useMemo(() => {
    if (!measures || !contentSize) return 0;

    return position.interpolate({
      inputRange,
      outputRange: measures.map(measure => measure.width / standardSize + 0.1),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRange, measures, contentSize]);

  const translateX = useMemo(() => {
    if (!measures || !contentSize) return 0;

    return position.interpolate({
      inputRange,
      outputRange: measures.map(
        measure => measure.left - (standardSize - measure.width) / 2
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRange, measures, contentSize]);

  const handleTabWrapperLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContentSize(width);
  };

  return (
    <Container>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
      >
        <TabWrapper onLayout={handleTabWrapperLayout}>
          {state.routes.map(({ key, name }, index) => {
            const ref = tabRefs[index];
            const { options } = descriptors[key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(name);
              }
            };

            const opacity = position.interpolate({
              inputRange,
              outputRange: inputRange.map(i => (i === index ? 1 : 0.6)),
            });

            return (
              <Tab
                key={key}
                ref={ref}
                label={label as string}
                opacity={opacity}
                isFocused={isFocused}
                onPress={onPress}
              />
            );
          })}
        </TabWrapper>
        <Indicator
          as={Animated.View}
          style={{
            width: standardSize,
            transform: [
              {
                translateX,
              },
              {
                scaleX: indicatorScale,
              },
            ],
          }}
        />
      </ScrollView>
    </Container>
  );
};

export default TabBar;

const Container = styled.View`
  border-bottom-color: ${({ theme }) => theme.base.background[300]};
  border-bottom-width: 1px;
  background-color: ${({ theme }) => theme.base.background.surface};
`;

const TabWrapper = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

const Indicator = styled.View`
  position: absolute;
  background-color: ${({ theme }) => theme.base.text[100]};
  height: 2px;
  bottom: 0;
`;
