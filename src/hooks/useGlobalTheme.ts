import { darkTheme, lightTheme } from '/lib/themeColor';
import { useAppSelector } from './useRedux';


const useGlobarTheme = () => {
  const { theme } = useAppSelector(state => state.baseSettingReducer);
  const themeStyle = theme === 'dark' ? darkTheme : lightTheme;

  return { theme: themeStyle, scheme: theme }
}

export default useGlobarTheme;