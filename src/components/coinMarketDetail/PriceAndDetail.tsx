import React from 'react';
import { useAppSelector } from '/hooks/useRedux';
import Text from '/components/common/Text';
import useCurrencyFormat from '/hooks/useCurrencyFormat';
import timestampToDate from '/lib/utils/timestampToDate';

const PriceAndDetail = () => {

  const { datum } = useAppSelector(state => state.marketDetailReducer);
  const price = useCurrencyFormat(datum.y);

  return (
    <>
      <Text>
        {price}
      </Text>
      <Text>
        {timestampToDate(datum.x)}
      </Text>
    </>
  )
}

export default PriceAndDetail