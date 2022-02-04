import { useMemo, useCallback } from 'react';

import { darkTheme, lightTheme } from '../lib/themeStyles';
import { useAppSelector, useAppDispatch } from './useRedux';
import { changeLocalScheme, LocalSchemeType } from '/store/baseSetting';

const useGlobarTheme = () => {
  const dispatch = useAppDispatch();
  const { localScheme, deviceScheme } = useAppSelector(
    state => state.baseSettingReducer
  );

  const scheme = useMemo(() => {
    return localScheme === 'default' ? deviceScheme : localScheme;
  }, [localScheme, deviceScheme]);

  const onSchemeChange = useCallback((scheme: LocalSchemeType) => {
    dispatch(changeLocalScheme(scheme));
  }, [dispatch]);

  return {
    theme: scheme === 'dark' ? darkTheme : lightTheme,
    scheme,
    localScheme,
    onSchemeChange,
  };
};

export default useGlobarTheme;
