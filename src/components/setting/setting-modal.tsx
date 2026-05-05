import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { type Ref, useCallback, useRef } from 'react'

import useGlobalTheme from '@/hooks/use-global-theme'

import Currency from './currency'
import Language from './language'
import LaunchScreen from './launch-screen'
import ScreenTheme from './screen-theme'
import SettingRoot from './setting-root'
import Modal from '@/components/common/bottom-sheet-modal'

function SettingButton({ ref }: { ref?: Ref<BottomSheetModal> }) {
  const { theme } = useGlobalTheme()
  const languageModalRef = useRef<BottomSheetModal>(null)
  const currencyModalRef = useRef<BottomSheetModal>(null)
  const screenThemeModalRef = useRef<BottomSheetModal>(null)
  const launchScreenModalRef = useRef<BottomSheetModal>(null)

  const handleLanguagePress = useCallback(() => {
    languageModalRef.current?.present()
  }, [languageModalRef])

  const handleCurrencyPress = useCallback(() => {
    currencyModalRef.current?.present()
  }, [currencyModalRef])

  const handleScreenThemePress = useCallback(() => {
    screenThemeModalRef.current?.present()
  }, [screenThemeModalRef])

  const handleLaunchScreenPress = useCallback(() => {
    launchScreenModalRef.current?.present()
  }, [launchScreenModalRef])

  return (
    <>
      <Modal
        key="main"
        ref={ref}
        bgColor={theme.base.background[100]}
        handleColor={theme.base.background.surface}
      >
        <SettingRoot
          onLanguagePress={handleLanguagePress}
          onCurrencyPress={handleCurrencyPress}
          onScreenThemePress={handleScreenThemePress}
          onLounchScreenPress={handleLaunchScreenPress}
        />
      </Modal>
      <Modal
        key="screen_theme"
        ref={screenThemeModalRef}
        bgColor={theme.base.background[100]}
        handleColor={theme.base.background.surface}
      >
        <ScreenTheme />
      </Modal>
      <Modal
        key="language"
        ref={languageModalRef}
        bgColor={theme.base.background[100]}
        handleColor={theme.base.background.surface}
      >
        <Language />
      </Modal>
      <Modal
        key="currency"
        ref={currencyModalRef}
        bgColor={theme.base.background[100]}
        handleColor={theme.base.background.surface}
      >
        <Currency />
      </Modal>
      <Modal
        key="launch_screen"
        ref={launchScreenModalRef}
        bgColor={theme.base.background[100]}
        handleColor={theme.base.background.surface}
      >
        <LaunchScreen />
      </Modal>
    </>
  )
}

export default SettingButton
