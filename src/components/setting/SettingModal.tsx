import React, { useRef, useCallback, forwardRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Modal from '/components/common/BottomSheetModal';
import SettingModal from './SettingRoot';
import Language from '/components/setting/Language';
import Currency from '/components/setting/Currency';


const SettingButton = forwardRef((props, ref: React.Ref<BottomSheetModal>) => {
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
      >
        <SettingModal 
          onLanguagePress={handleLanguagePress}
          onCurrencyPress={handleCurrencyPress}
        />
      </Modal>
      <Modal
        key="language"
        ref={languageModalRef}
        snapPoints={['25%', '25%']}
      >
        <Language/>
      </Modal>
      <Modal
        key="currency"
        ref={currencyModalRef}
        snapPoints={['35%', '35%']}
      >
        <Currency/>
      </Modal>
    </>
  )
})

export default SettingButton;