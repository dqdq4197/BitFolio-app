import { Ionicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useCallback, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components/native'

import useGlobalTheme from '@/hooks/use-global-theme'
import type { HomeScreenProps } from '@/types/navigation'

import Layout from '@/components/coin-market/layout'
import AsyncBoundary from '@/components/common/async-boundary'
import SettingModal from '@/components/setting/setting-modal'
import { CoinHomeSkeleton } from '@/components/skeleton-placeholder/coin-market-home'
// import { IconSvg } from '@/lib/svg';

const HomeScreen = ({ navigation }: HomeScreenProps<'CoinMarketHome'>) => {
  const settingModalRef = useRef<BottomSheetModal>(null)
  const { theme } = useGlobalTheme()

  const handleSettingPress = useCallback(() => {
    settingModalRef.current?.present()
  }, [settingModalRef])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeftContainerStyle: { paddingLeft: 16 },
      // headerLeft: () => (
      //   <IconWrap
      //     onPress={() => navigation.navigate('Setting', { screen: 'Overview' })}
      //     activeOpacity={0.6}
      //   >
      //     <IconSvg
      //       name="profile"
      //       width={32}
      //       height={32}
      //       fstColor={theme.base.text[200]}
      //     />
      //   </IconWrap>
      // ),
      headerRight: () => (
        <Wrap>
          <Ionicons
            name="search-sharp"
            size={24}
            color={theme.base.text[200]}
            style={{
              marginRight: 20,
            }}
            onPress={() => navigation.navigate('CoinSearch')}
            suppressHighlighting
          />
          <Ionicons
            name="settings-outline"
            size={24}
            color={theme.base.text[200]}
            onPress={handleSettingPress}
            suppressHighlighting
          />
        </Wrap>
      ),
    })
  }, [handleSettingPress, navigation, theme])

  return (
    <AsyncBoundary skeleton={<CoinHomeSkeleton />}>
      <SettingModal ref={settingModalRef} />
      <Layout />
    </AsyncBoundary>
  )
}

export default HomeScreen

// const IconWrap = styled.TouchableOpacity`
//   width: 26px;
//   height: 26px;
//   border-radius: 20px;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid ${({ theme }) => theme.base.text[300]};
// `

const Wrap = styled.View`
  flex-direction: row;
`
