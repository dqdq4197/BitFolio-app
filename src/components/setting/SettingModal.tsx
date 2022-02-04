import React, { useRef, useCallback, forwardRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Modal from '/components/common/BottomSheetModal';
import SettingRoot from './SettingRoot';
import ScreenTheme from './ScreenTheme';
import Language from './Language';
import Currency from './Currency';
import LaunchScreen from './LaunchScreen';


const SettingButton = forwardRef<BottomSheetModal, {}>((props, ref) => {

  const { theme } = useGlobalTheme();
  const languageModalRef = useRef<BottomSheetModal>(null);
  const currencyModalRef = useRef<BottomSheetModal>(null);
  const screenThemeModalRef = useRef<BottomSheetModal>(null);
  const launchScreenModalRef = useRef<BottomSheetModal>(null);

  const handleLanguagePress = useCallback(() => {
    languageModalRef.current?.present();
  }, [languageModalRef])

  const handleCurrencyPress = useCallback(() => {
    currencyModalRef.current?.present();
  }, [currencyModalRef])

  const handleScreenThemePress = useCallback(() => {
    screenThemeModalRef.current?.present();
  }, [screenThemeModalRef])

  const handleLaunchScreenPress = useCallback(() => {
    launchScreenModalRef.current?.present();
  }, [launchScreenModalRef])

  return (
    <>
      <Modal
        key="main"
        ref={ref}
        snapPoints={['62%']}
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
        snapPoints={['35%']}
        bgColor={theme.base.background[100]}
        handleColor={theme.base.background.surface}
      >
        <ScreenTheme />
      </Modal>
      <Modal
        key="language"
        ref={languageModalRef}
        snapPoints={['30%']}
        bgColor={theme.base.background[100]}
        handleColor={theme.base.background.surface}
      >
        <Language />
      </Modal>
      <Modal
        key="currency"
        ref={currencyModalRef}
        snapPoints={['40%']}
        bgColor={theme.base.background[100]}
        handleColor={theme.base.background.surface}
      >
        <Currency />
      </Modal>
      <Modal
        key="launch_screen"
        ref={launchScreenModalRef}
        snapPoints={['35%']}
        bgColor={theme.base.background[100]}
        handleColor={theme.base.background.surface}
      >
        <LaunchScreen />
      </Modal>
    </>
  )
})

export default SettingButton;