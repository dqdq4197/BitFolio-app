import { Ionicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { useCallback, useLayoutEffect, useRef } from 'react'

import useGlobalTheme from '/hooks/useGlobalTheme'

import AsyncBoundary from '/components/common/AsyncBoundary'
import GeneralTemplate from '/components/GeneralTemplate'
import Layout from '/components/portfolio/Layout'
import { PortfolioDataProvider } from '/components/portfolio/PortfolioDataContext'
import SettingModal from '/components/setting/SettingModal'
import { PortfolioScreenProps } from '/types/navigation'

const OverviewScreen = ({
  navigation,
}: PortfolioScreenProps<'PortfolioOverview'>) => {
  const { theme } = useGlobalTheme()
  const settingModalRef = useRef<BottomSheetModal>(null)

  const handleSettingPress = useCallback(() => {
    settingModalRef.current?.present()
  }, [settingModalRef])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="settings-outline"
          size={24}
          color={theme.base.text[200]}
          onPress={handleSettingPress}
          suppressHighlighting
        />
      ),
    })
  }, [handleSettingPress, navigation, theme])

  return (
    <GeneralTemplate>
      <AsyncBoundary>
        <SettingModal ref={settingModalRef} />
        <PortfolioDataProvider>
          <Layout />
        </PortfolioDataProvider>
      </AsyncBoundary>
    </GeneralTemplate>
  )
}

export default OverviewScreen
