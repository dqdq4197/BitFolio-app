import { darkTheme, lightTheme } from '/lib/themeColor';
import { useAppSelector, useAppDispatch } from './useRedux';
import { changeTheme } from '/store/baseSetting';

const useGlobarTheme = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.baseSettingReducer);
  const themeStyle = theme === 'dark' ? darkTheme : lightTheme;

  const onThemeChange = () => {
    dispatch(changeTheme(theme === 'dark' ? 'light' : 'dark'))
  }

  return { theme: themeStyle, scheme: theme, onThemeChange }
}

export default useGlobarTheme;