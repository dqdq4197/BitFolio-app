import { useMemo } from 'react';
import i18n from 'i18next';
import { baseTypes } from 'base-types';

import { useAppSelector, useAppDispatch } from './useRedux';
import { changeCurrency } from '/store/baseSetting';
import { onLanguageChange, getDeviceLanguage } from '/lib/lang/i18n';
import type { CurrencyType } from '/types/common';

type LanguageType = Exclude<baseTypes.Language, 'default'>;

const useLocales = () => {
  const { currency } = useAppSelector(state => state.baseSettingReducer);
  const dispatch = useAppDispatch();

  const language = useMemo(() => {
    return i18n.language as LanguageType;
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onCurrencyChange = (currency: baseTypes.Currency) => {
    dispatch(changeCurrency(currency));
  };

  return {
    language,
    currency: currency as CurrencyType,
    onLanguageChange,
    onCurrencyChange,
    getDeviceLanguage,
  };
};

export default useLocales;
