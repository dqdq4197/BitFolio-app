import { useAppSelector, useAppDispatch } from './useRedux';
import { changeCurrency, changeLanguage } from '/store/baseSetting';
import { baseTypes } from 'base-types';

const useLocales = () => {
  const { language, currency } = useAppSelector(state => state.baseSettingReducer);
  const dispatch = useAppDispatch();
  
  const onLanguageChange = (language: baseTypes.Language) => {
    dispatch(changeLanguage(language))
  }

  const onCurrencyChange = (currency: baseTypes.Currency) => {
    dispatch(changeCurrency(currency))
  }
  return { language, currency, onLanguageChange, onCurrencyChange }
}

export default useLocales;