import { createStackNavigator } from '@react-navigation/stack'

import { MaterialIcons } from '@expo/vector-icons'
import useGlobalTheme from '@/hooks/use-global-theme'
import type { PortfolioParamList } from '@/types/navigation'

import CoinDetail from './coin-detail'
import { AddNewCoin, Overview } from '@/screens/portfolio'

const Stack = createStackNavigator<PortfolioParamList>()

const PortfolioStack = () => {
  const { theme } = useGlobalTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
        headerStyle: {
          shadowColor: 'transparent',
        },
        headerBackButtonDisplayMode: 'minimal',
        headerBackImage: () => (
          <MaterialIcons
            name="arrow-back-ios-new"
            size={24}
            color={theme.base.text[100]}
          />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 10,
        },
        headerRightContainerStyle: {
          paddingRight: parseInt(theme.content.spacing, 10),
        },
        headerTitleStyle: {
          fontSize: parseInt(theme.size.font_l, 10),
        },
        gestureEnabled: true,
        gestureResponseDistance: 20,
      }}
    >
      <Stack.Screen name="PortfolioOverview" component={Overview} />
      <Stack.Screen name="AddNewCoin" component={AddNewCoin} />
      <Stack.Screen name="CoinDetail" component={CoinDetail} />
    </Stack.Navigator>
  )
}

export default PortfolioStack
