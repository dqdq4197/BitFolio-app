import React from 'react';
import { useTranslation } from 'react-i18next';

import useRequest from '/hooks/useRequest';
import useLocales from '/hooks/useLocales';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import { CoinMarketReturn } from '/types/CoinGeckoReturnType';
import { ORDER } from '/lib/constant';

import SurfaceWrap from '/components/common/SurfaceWrap';
import Item from './Item';
import ShowAllButton from './ShowAllButton';

type ListProps = {
  onPressItem: (id: string, symbol: string) => void
}

const HighVolumePreview = ({ onPressItem }: ListProps) => {
  const { t } = useTranslation();
  const { currency } = useLocales();
  const { data } = useRequest<CoinMarketReturn[]>(
    CoinGecko.coin.markets({ 
      vs_currency: currency,
      order: ORDER.VOLUME_DESC,
      per_page: 5,
      sparkline: true
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
      { data?.map(res => {
        return (
          <Item 
            key={ res.id }
            item={ res }  
            onPressItem={onPressItem}
          />
        )
      }) }
      <ShowAllButton route='CoinHighVolume'/>
    </SurfaceWrap>
  )
}

export default HighVolumePreview;