import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import * as habtics from 'expo-haptics';
import { TAB_BAR_HEIGHT } from '/lib/constant';
import useGlobalTheme from '/hooks/useGlobalTheme';

const TabBar = ({ descriptors, state, navigation }: BottomTabBarProps) => {
  const { routes, index } = state;
  const { theme } = useGlobalTheme();

  const focusedOptions = descriptors[routes[index].key].options;

  if(focusedOptions.tabBarVisible === false || routes[index].state?.index === 1) {
    return null;
  }
  return (
    <TabBarContainer>
      {routes.map((route, idx) => {
        const { options } = descriptors[route.key];
        const { tabBarIcon } = options;
        
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
          const isFocused = index === idx;
          

        const onPress = () => {
          habtics.selectionAsync();
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

        const iconColor = isFocused ? theme.base.text[100] : theme.base.text[400]

        return (
          <EachTabWrap
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            onLongPress={onLongPress}
          >
            { tabBarIcon && 
              tabBarIcon({ focused: isFocused, color: iconColor, size: 22 })
            }
            <TabLabel isFocused={isFocused}>
              { label }
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
  height: ${TAB_BAR_HEIGHT + 'px'};
  background-color: ${({theme}) => theme.base.background['surface']};
  border-top-width:1px;
  border-top-color:${({theme}) => theme.base.background[300]};
`

const EachTabWrap = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
`
const TabLabel = styled.Text<TabLabelProps>`
  color: ${(props) => props.isFocused ? props.theme.base.text[100] : props.theme.base.text[400]};
  font-size: ${({ theme }) => theme.size.font_s};
`