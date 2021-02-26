import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Portfolio, Quote, News} from '/screens';
import styled from 'styled-components/native';

const Tab = createBottomTabNavigator();

type HomeProps = {}

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
const Home = ({}:HomeProps) => {

  return (
    <>
      <Tab.Navigator tabBar={props => <TabBar {...props}/>} initialRouteName="Quote">
        <Tab.Screen name="Quote" options={{title:'시세'}} component={Quote} />
        <Tab.Screen name="Portfolio" options={{title: '포트폴리오'}} component={Portfolio} />
        <Tab.Screen name="News" options={{title: '뉴스'}} component={News} />
      </Tab.Navigator>
    </>
  )
}

export default Home;


type TabLabelProps = {
  isFocused: boolean,
}

const TabBarContainer = styled.View`
  flex-direction: row;
  height: 70px;
  background-color: ${({theme}) => theme.colors.background_100};
  border-top-width:1px;
  border-top-color:${({theme}) => theme.colors.background_300};
`
const EachTabWrap = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
`
const TabLabel = styled.Text<TabLabelProps>`
  color: ${(props) => props.isFocused ? props.theme.colors.text_100 : props.theme.colors.text_300}
`