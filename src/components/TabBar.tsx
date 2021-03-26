import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import { TABBAR_HEIGHT } from '/lib/constant';

const TabBar = ({descriptors, state, navigation}: BottomTabBarProps) => {
  const { routes, index } = state;

  return (
    <TabBarContainer>
      {routes.map((route, idx) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
          const isFocused = index === idx;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if(!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

        return (
          <EachTabWrap
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <TabLabel isFocused={isFocused}>
              {label}
            </TabLabel>
          </EachTabWrap>
        )
      })}
    </TabBarContainer>
  )
}

export default TabBar;

type TabLabelProps = {
  isFocused: boolean,
}

const TabBarContainer = styled.View`
  flex-direction: row;
  height: ${TABBAR_HEIGHT + 'px'};
  background-color: ${({theme}) => theme.base.background[100]};
  border-top-width:1px;
  border-top-color:${({theme}) => theme.base.background[300]};
`
const EachTabWrap = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
`
const TabLabel = styled.Text<TabLabelProps>`
  color: ${(props) => props.isFocused ? props.theme.base.text[100] : props.theme.base.text[400]}
`