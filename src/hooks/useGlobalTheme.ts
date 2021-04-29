import { darkTheme, lightTheme } from '/lib/themeColor';
import { useColorScheme } from 'react-native-appearance';


const useGlobarTheme = () => {
  const scheme = useColorScheme();
  
  return scheme === 'dark' ? darkTheme : lightTheme;
}

export default useGlobarTheme;