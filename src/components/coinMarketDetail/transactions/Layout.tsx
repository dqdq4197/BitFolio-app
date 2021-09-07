import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Text from '/components/common/Text';
import ScrollView from '/components/common/ScrollView';
import SurfaceWrap from '/components/common/SurfaceWrap';
import HorizontalLine from '/components/common/HorizontalLine';
import { useAppSelector } from '/hooks/useRedux';
import { useCoinIdContext } from '/hooks/useCoinIdContext';
import { TransactionType } from '/store/transaction';
import useCoinDetailData from '/hooks/useCoinDetailData';
import TransactionDetailModal from './TransactionDetailModal';
import Item from './Item';
import AddTransactionButton from '../AddTransactionButton';


const { height } = Dimensions.get('window');

const EmptyView = () => {

  const { t } = useTranslation();

  return (
    <EmptyViewContainer>
      <Text fontL color100 bold>
        { t(`coinDetail.there is no transaction history`) }
      </Text>
      <Text fontML bold margin="10px 0 0 0">
        { t(`coinDetail.add your first transaction`) }
      </Text>
    </EmptyViewContainer>
  )
}

const Layout = () => {
  const { t } = useTranslation();
  const { id, symbol } = useCoinIdContext();
  const { transactions } = useAppSelector(state => state.transactionReducer);
  const { id: portfolioId } = useAppSelector(state => state.portfolioReducer.portfolios[0]);
  const modalRef = useRef<BottomSheetModal>(null);
  const [filteredData, setFilteredData] = useState<TransactionType[] | null>(null);
  const [focusedTransactionId, setFocusedTransactionId] = useState<string | null>(null);
  const { data, mutate } = useCoinDetailData({ id, suspense: false });

  useEffect(() => {
    //filteredData => null의 경우 로딩중 | length === 0인 경우 거래 내역이 없음
    const filteredTransactions = transactions.filter(
      transaction => transaction.coinId === id 
    ).slice();

    filteredTransactions.sort((a, b) => b.date - a.date);

    setFilteredData([...filteredTransactions]);
  }, [transactions])
 
  const focusedTransactionData = useMemo(() => {
    if(filteredData && focusedTransactionId) {
      return filteredData.filter(transaction => transaction.id === focusedTransactionId)[0];
    }
  }, [filteredData, focusedTransactionId])

  useEffect(() => {
    modalRef.current?.present();
  }, [focusedTransactionId])

  const handleItemPress = useCallback((id: string) => {
    setFocusedTransactionId(id);
  }, [])

  const onModalDismiss = () => {
    setFocusedTransactionId(null);
  }
  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20
        }}
      >
        { filteredData?.length === 0
          ? <EmptyView /> 
          : <SurfaceWrap
              title={ t(`coinDetail.history`) }
              paddingBottomZero
              marginTopZero
            >
              <ListHeader>
                <TypeWrap>
                  <Text bold>
                    { t(`common.type`) }
                  </Text>
                </TypeWrap>
                <QuantityWrap>
                  <Text bold>
                    { t(`common.quantity`) }
                  </Text>
                </QuantityWrap>
              </ListHeader>
              { filteredData?.map((data, index) => (
                <View key={data.id}>
                  <Item 
                    data={data}
                    symbol={symbol}
                    onItemPress={handleItemPress}
                  />
                  { filteredData.length - 1 !== index 
                    && <HorizontalLine /> 
                  }
                </View>
              )) }
            </SurfaceWrap>
        }
        { data && focusedTransactionId && focusedTransactionData && (
          <TransactionDetailModal 
            ref={modalRef}
            data={focusedTransactionData}
            currentPrice={data.market_data.current_price}
            coinId={id}
            symbol={symbol}
            name={data.name}
            image={data.image.large}
            transactionId={focusedTransactionId}
            onDismiss={onModalDismiss}
          />
        ) }
      </ScrollView>
      <AddTransactionButton 
        portfolioId={portfolioId}
      />
    </Container>
  )
}

export default Layout;

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.base.background.surface};
`

const ListHeader = styled.View`
  flex-direction: row;
  padding: 8px 16px;
  border-top-width: 1.5px;
  border-top-color: ${({ theme }) => theme.base.background[200]};
  border-bottom-width: 1.5px;
  border-bottom-color: ${({ theme }) => theme.base.background[200]};
  margin: 0 -16px;
`

const TypeWrap = styled.View`
  flex: 1.4;
`

const QuantityWrap = styled.View`
  flex: 1;
  align-items: flex-end;
`

const View = styled.View`
  flex: 1;
`

const EmptyViewContainer = styled.View`
  flex: 1;
  height: ${ height - 200 }px;
  align-items: center;
  justify-content: center;
`