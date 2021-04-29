import React, { useState, useEffect, useRef, createRef } from 'react';
import { 
  TouchableOpacity, 
  ScrollView, 
  findNodeHandle, 
  Dimensions, 
} from 'react-native';
import styled from 'styled-components/native';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import Animated, { interpolateNode } from 'react-native-reanimated';
import Tab from './Tab';

const { width } = Dimensions.get('window');

type Route = {
  key: string;
  name: string;
  params?: object | undefined;
};
type MeasureType = {
  x: number,
  y: number,
  width: number,
  height: number,
}

const TabBar = ({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [measures, setMeasures] = useState<MeasureType[]>([]);
  const [scrollWidth, setScrollWidth] = useState(0);
  const data = state.routes.map((route: Route, index) => {
    return {
      label: route.name,
      isFocused: state.index === index,
      key: route.key,
      ref: createRef<TouchableOpacity>()
    }
  })

  useEffect(() => {
    setTimeout(() => {
      let m:MeasureType[] = [];
      if(scrollViewRef.current) {
        data.forEach((item) => {
          item.ref.current?.measureLayout(
            findNodeHandle(scrollViewRef.current) as any,
            (x, y, width, height) => {
              m.push({x, y, width, height})
              if(m.length === data.length){
                setMeasures(m)
              }
            }, () => {
              console.log('get measure layout data - fail')
            }
          );
        });
      }
    })
  }, [])

  useEffect(() => {
    if(scrollViewRef.current && measures.length) {
      scrollViewRef.current.scrollTo({ 
        x: measures[state.index].x - (width / 2 - measures[state.index].width / 2),
        y: 0, 
        animated: true 
      })
    }
  }, [state.index])

  
  const inputRange = data.map((_, i) => i);
  const indicatorWidth = measures.length ? interpolateNode(position, {
    inputRange,
    outputRange: measures.map(measure => measure.width)
  }) : 100

  const translateX = measures.length ? interpolateNode(position, {
    inputRange: inputRange,
    outputRange: measures.map(measure => {
      let screenCenterX = width / 2 - measure.width / 2
      let centerPos = measure.x - screenCenterX;

      if(scrollWidth - measure.x <= width / 2) {
        return width - (scrollWidth - measure.x)
      } else if(centerPos > 0) {
        return measure.x - centerPos
      } else {
        return measure.x
      }
    })
  }): 100

  const handleScrollViewLayout = (w:number) => {
    setScrollWidth(w);
  }

  return (
    <Container>
      <TabWrapper 
        horizontal 
        ref={scrollViewRef} 
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={handleScrollViewLayout}
      >
        {data.map(({ isFocused, key, label, ref }) => {
          const handlePress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(label);
            }
          };
          return (
            <Tab 
              key={key} 
              ref={ref} 
              label={label}
              isFocused={isFocused}
              onPress={handlePress}
            />
          )
        })}
      </TabWrapper>
      <Indicator
        as={Animated.View}
        style={{
          width: indicatorWidth,
          transform: [{ 
              translateX: translateX
            }],
        }}
      />
    </Container>
  );
}

export default TabBar;

const Container = styled.View`
  border-bottom-color: rgba(255, 255, 255, .2);
  border-bottom-width: 0.5px;
`;

const TabWrapper = styled.ScrollView`
  flex-direction: row;
  display: flex;
  padding-left: 4px;
  
`;

const Indicator = styled.View`
  background-color: ${({ theme }) => theme.base.text[100]};
  height: 2px;
`;