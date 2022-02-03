import i18n from 'i18next';
import { baseTypes } from 'base-types';

import { useAppSelector, useAppDispatch } from './useRedux';
import { changeCurrency } from '/store/baseSetting';
import { onLanguageChange, getDeviceLanguage } from '/lib/lang/i18n';

type LanguageType = Exclude<baseTypes.Language, 'default'>

const useLocales = () => {
  const { currency } = useAppSelector(state => state.baseSettingReducer);
  const dispatch = useAppDispatch();
  
  const language = (() => {
    return i18n.language as LanguageType
  })()

  const onCurrencyChange = (currency: baseTypes.Currency) => {
    dispatch(changeCurrency(currency))
  }
  return { language, currency, onLanguageChange, onCurrencyChange, getDeviceLanguage }
}

export default useLocales;