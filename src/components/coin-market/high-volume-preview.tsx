import { useTranslation } from 'react-i18next'

import useRequest from '@/hooks/use-request'
import useLocales from '@/hooks/use-locales'
import { CoinGecko, http } from '@/lib/api/coin-gecko-client'
import type { CoinMarketReturn } from '@/types/coin-gecko-return-type'
import { ORDER } from '@/lib/constants/coingecko'

import SurfaceWrap from '@/components/common/surface-wrap'
import Item from './item'
import ShowAllButton from './show-all-button'

type ListProps = {
  onPressItem: (id: string, symbol: string) => void
}

const HighVolumePreview = ({ onPressItem }: ListProps) => {
  const { t } = useTranslation()
  const { currency } = useLocales()
  const { data } = useRequest<CoinMarketReturn[]>(
    CoinGecko.coin.markets({
      vs_currency: currency,
      order: ORDER.VOLUME_DESC,
      per_page: 5,
      sparkline: true,
    }),
    http,
    { refreshInterval: 5 * 60 * 1000, suspense: true }
  )

  return (
    <SurfaceWrap
      title={t('coinMarketHome.top volume')}
      paddingBottomZero
      parentPaddingZero
    >
      {data?.map(res => {
        return <Item key={res.id} item={res} onPressItem={onPressItem} />
      })}
      <ShowAllButton route="CoinHighVolume" />
    </SurfaceWrap>
  )
}

export default HighVolumePreview
