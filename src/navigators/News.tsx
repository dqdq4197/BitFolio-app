import { createStackNavigator } from '@react-navigation/stack'

import useGlobalTheme from '@/hooks/use-global-theme'
import type { NewsParamList } from '@/types/navigation'

import { Overview } from '@/screens/news'

const Stack = createStackNavigator<NewsParamList>()

const News = () => {
  const { theme } = useGlobalTheme()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewsOverview"
        component={Overview}
        options={{
          headerStyle: {
            shadowColor: 'transparent',
          },
          headerRightContainerStyle: {
            paddingRight: parseInt(theme.content.spacing, 10),
          },
        }}
      />
    </Stack.Navigator>
  )
}

export default News
