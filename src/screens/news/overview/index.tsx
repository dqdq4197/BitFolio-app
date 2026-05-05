import { Ionicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useCallback, useLayoutEffect, useRef } from 'react'

import useGlobalTheme from '@/hooks/use-global-theme'
import type { NewsScreenProps } from '@/types/navigation'

import AsyncBoundary from '@/components/common/async-boundary'
import Overview from '@/components/news/overview'
import SettingModal from '@/components/setting/setting-modal'

const OverviewScreen = ({ navigation }: NewsScreenProps<'NewsOverview'>) => {
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
    <AsyncBoundary>
      <SettingModal ref={settingModalRef} />
      <Overview />
    </AsyncBoundary>
  )
}

export default OverviewScreen
