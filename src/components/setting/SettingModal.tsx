import React, { useRef, useCallback, forwardRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Modal from '/components/common/BottomSheetModal';
import SettingModal from './SettingRoot';
import Language from '/components/setting/Language';
import Currency from '/components/setting/Currency';


const SettingButton = forwardRef((props, ref: React.Ref<BottomSheetModal>) => {
  const { theme } = useGlobalTheme();
  const languageModalRef = useRef<BottomSheetModal>(null);
  const currencyModalRef = useRef<BottomSheetModal>(null);

  const handleLanguagePress = useCallback(() => {
    languageModalRef.current?.present();
  }, [])

  const handleCurrencyPress = useCallback(() => {
    currencyModalRef.current?.present();
  }, [])

  return (
    <>
      <Modal
        key="main"
        ref={ref}
        snapPoints={['50%', '75%']}
        bgColor={ theme.base.background[100] }
        handleColor={ theme.base.background.surface }
      >
        <SettingModal 
          onLanguagePress={handleLanguagePress}
          onCurrencyPress={handleCurrencyPress}
        />
      </Modal>
      <Modal
        key="language"
        ref={languageModalRef}
        snapPoints={['25%']}
      >
        <Language/>
      </Modal>
      <Modal
        key="currency"
        ref={currencyModalRef}
        snapPoints={['35%']}
      >
        <Currency/>
      </Modal>
    </>
  )
})

export default SettingButton;