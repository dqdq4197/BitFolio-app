import useRequest from './useRequest';
import { Cryptocompare, http } from '/lib/api/CryptocompareClient';
import { CategoryReturn } from '/lib/api/CryptoCompareReturnType';

type CategoriesProps = {
  suspense?: boolean,
  refreshInterval?: number,
}
const useNewsCategories = ({ suspense, refreshInterval }: CategoriesProps) => {
  const getKey = Cryptocompare.news.categories({})

  return useRequest<CategoryReturn[]>(getKey, http, { suspense, refreshInterval })
}

export default useNewsCategories;