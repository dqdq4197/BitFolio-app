import { baseTypes } from 'base-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import useLocales from '/hooks/useLocales'
import { CURRENCIES } from '/lib/constant'

import Select from '/components/common/Select'
import SurfaceWrap from '/components/common/SurfaceWrap'

const currencies = Object.entries(CURRENCIES)

const Currency = () => {
  const { t } = useTranslation()
  const { currency: currentCurrency, onCurrencyChange } = useLocales()

  return (
    <SurfaceWrap
      title={t(`setting.default currency settings`)}
      flex={1}
      parentPaddingZero
      marginTopZero
      fontML
    >
      <Select>
        {currencies.map(([key, currency]) => {
          const { iso, name, unicode } = currency
          return (
            <Select.Option
              key={unicode}
              title={name}
              subTitle={`${iso} - ${unicode}`}
              onPress={() =>
                onCurrencyChange(key.toLowerCase() as baseTypes.Currency)
              }
              enabled={currentCurrency === iso.toLowerCase()}
            />
          )
        })}
      </Select>
    </SurfaceWrap>
  )
}

export default Currency
