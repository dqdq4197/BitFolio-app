import { useCallback } from 'react'
import i18n from 'i18next'
import { baseTypes } from 'base-types'

import { useAppSelector, useAppDispatch } from './use-redux'
import { changeCurrency } from '@/store/slices/base-setting'
import { onLanguageChange, getDeviceLanguage } from '@/lib/lang/i18n'
import type { CurrencyType } from '@/types/common'

type LanguageType = Exclude<baseTypes.Language, 'default'>

const useLocales = () => {
  const { currency } = useAppSelector(state => state.baseSettingReducer)
  const dispatch = useAppDispatch()

  const onCurrencyChange = useCallback(
    (currency: baseTypes.Currency) => {
      dispatch(changeCurrency(currency))
    },
    [dispatch]
  )

  return {
    language: i18n.language as LanguageType,
    currency: currency as CurrencyType,
    onLanguageChange,
    onCurrencyChange,
    getDeviceLanguage,
  }
}

export default useLocales
