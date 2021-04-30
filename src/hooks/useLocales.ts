import { useAppSelector } from './useRedux';


const useLocales = () => {
  const { language, currency } = useAppSelector(state => state.baseSettingReducer);

  return { language, currency }
}

export default useLocales;