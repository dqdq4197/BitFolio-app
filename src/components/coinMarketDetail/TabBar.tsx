import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ScrollView,
  Dimensions,
  LayoutChangeEvent,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import styled from 'styled-components/native';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import Animated, {
  interpolateNode,
  interpolateColors,
} from 'react-native-reanimated';

import useGlobalTheme from '/hooks/useGlobalTheme';

import Tab from './Tab';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

type TabsMeasureType = {
  left: number;
  right: number;
  width: number;
  height: number;
};

const TabBar = ({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) => {
  const { theme } = useGlobalTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const [tabsMeasurements, setTabsMeasurements] = useState<TabsMeasureType[]>(Array.from({ length: state.routes.length }));

  useEffect(() => {
    if (scrollViewRef.current && measurementsCompleted()) {
      const { index } = state;
      const screenCenterXPos = width / 2 - tabsMeasurements[index].width / 2;
      scrollViewRef.current.scrollTo({
        x: tabsMeasurements[index].left - screenCenterXPos,
        y: 0,
        animated: true,
      });
      LayoutAnimation.configureNext(
        LayoutAnimation.create(200, 'easeInEaseOut', 'opacity')
      );
    }
  }, [state.index, tabsMeasurements])

  const measurementsCompleted = (): boolean => {
    return tabsMeasurements.findIndex(measure => measure === undefined) === -1;
  };

  const inputRange = state.routes.map((_, i) => i);

  const indicatorWidth = measurementsCompleted()
    ? interpolateNode(position, {
      inputRange,
      outputRange: tabsMeasurements.map(measure => measure.width + 10),
    })
    : 0;

  const translateX = measurementsCompleted()
    ? interpolateNode(position, {
      inputRange,
      outputRange: tabsMeasurements.map(measure => measure.left)
    })
    : 0;

  const onLayoutHandler = useCallback(
    (page: number, event: LayoutChangeEvent) => {
      const { x, width, height } = event.nativeEvent.layout;

      setTabsMeasurements(prev => [
        ...prev.slice(0, page),
        { left: x, right: x + width, width, height },
        ...prev.slice(page + 1, tabsMeasurements.length),
      ]);
    },
    [tabsMeasurements.length]
  );

  return (
    <Container>
      <TabScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
      >
        <TabWrapper>
          {state.routes.map(({ key, name }, index) => {
            const { options } = descriptors[key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : name;

            const isFocused = state.index === index;

            const color = interpolateColors(position, {
              inputRange,
              outputColorRange: inputRange.map(inputIndex =>
                inputIndex === index
                  ? theme.base.text[100]
                  : theme.base.text[200]
              ),
            });

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

            return (
              <Tab
                key={key}
                label={label as string}
                index={index}
                color={color}
                isFocused={isFocused}
                onPress={onPress}
                onLayout={onLayoutHandler}
              />
            );
          })}
          <Indicator
            as={Animated.View}
            style={{
              width: indicatorWidth,
              transform: [
                {
                  translateX,
                },
              ],
            }}
          />
        </TabWrapper>
      </TabScrollView>
    </Container>
  );
};

export default TabBar;

const Container = styled.View`
  border-bottom-color: ${({ theme }) => theme.base.background[300]};
  border-bottom-width: 1px;
  background-color: ${({ theme }) => theme.base.background.surface};
`;

const TabScrollView = styled.ScrollView``;

const TabWrapper = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

const Indicator = styled.View`
  position: absolute;
  background-color: ${({ theme }) => theme.base.text[100]};
  height: 2px;
  left: -5px;
  bottom: 0;
`;
