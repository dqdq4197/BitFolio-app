import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollView from '/components/common/ScrollView';
import SurfaceWrap from '/components/common/SurfaceWrap';
import { useAppSelector } from '/hooks/useRedux';
import { useCoinIdContext } from '/hooks/useCoinIdContext';
import useLocales from '/hooks/useLocales';
import { TransactionType } from '/store/transaction';
import Item from './Item';

const Layout = () => {
  
  const { t } = useTranslation();
  const { id, symbol } = useCoinIdContext();
  const { currency } = useLocales();
  const { transactions } = useAppSelector(state => state.transactionReducer);
  const [filteredData, setFilteredData] = useState<TransactionType[] | null>(null);

  useEffect(() => {
    //filteredData => null의 경우 로딩중 | length === 0인 경우 거래 내역이 없음
    const filteredTransactions = transactions.filter(
      transaction => transaction.coinId === id 
    )

    setFilteredData([...filteredTransactions]);
  }, [transactions])  
 
  return (
    <ScrollView>
      <SurfaceWrap
        title={ t(`coinDetail.history`) }
        paddingBottomZero
        marginTopZero
      >
        { filteredData?.map(data => 
          <Item 
            key={data.id}
            data={data}
            symbol={symbol}
          />
        )}
      </SurfaceWrap>
    </ScrollView>
  )
}

export default Layout;