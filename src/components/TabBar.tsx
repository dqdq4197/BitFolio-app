import React from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import styled from 'styled-components/native'
import * as habtics from 'expo-haptics'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TAB_BAR_HEIGHT } from '/lib/constant'
import useGlobalTheme from '/hooks/useGlobalTheme'

import Text from '/components/common/Text'

const TabBar = ({ descriptors, state, navigation }: BottomTabBarProps) => {
  const { routes, index } = state
  const { theme } = useGlobalTheme()
  const insetBottom = useSafeAreaInsets().bottom

  const getVisibility = () => {
    if (
      routes[index].state?.index === 1 ||
      routes[index].state?.index === 2 ||
      routes[index].state?.index === 3
    ) {
      return false
    }
    return true
  }

  return (
    <TabBarContainer insetBottom={insetBottom} visible={getVisibility()}>
      {routes.map((route, idx) => {
        const { options } = descriptors[route.key]
        const { tabBarIcon } = options

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = index === idx

        const onPress = () => {
          habtics.selectionAsync()

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        const iconColor = isFocused
          ? theme.base.text[100]
          : theme.base.text[400]

        return (
          <EachTabWrap
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {tabBarIcon &&
              tabBarIcon({ focused: isFocused, color: iconColor, size: 20 })}
            <TabLabel isFocused={isFocused} heavy margin="3px 0 0 0" fontXS>
              {label}
            </TabLabel>
          </EachTabWrap>
        )
      })}
    </TabBarContainer>
  )
}

export default TabBar

type TabBarContainerType = {
  insetBottom: number
  visible: boolean
}

type TabLabelProps = {
  isFocused: boolean
}

const TabBarContainer = styled.View<TabBarContainerType>`
  flex-direction: row;
  height: ${({ insetBottom, visible }) =>
    visible ? `${insetBottom + TAB_BAR_HEIGHT}px` : 0};
  background-color: ${({ theme }) => theme.base.background.surface};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.base.background[300]};
  align-items: center;
  padding-bottom: ${({ insetBottom }) => insetBottom}px;
`

const EachTabWrap = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
`

const TabLabel = styled(Text)<TabLabelProps>`
  color: ${props =>
    props.isFocused ? props.theme.base.text[100] : props.theme.base.text[400]};
`
