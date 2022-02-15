import React, { useMemo, useCallback } from 'react';
import { Dimensions, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAppSelector, useAppDispatch } from '/hooks/useRedux';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { CoinType, addWatchingCoin, unWatchingCoin } from '/store/portfolio';
import { removeAllTransaction } from '/store/transaction';

import AsyncButton from '/components/common/AsyncButton';

interface ButtonProps extends Omit<CoinType, 'state'> {
  portfolioId?: string;
  width?: number;
  height?: number;
}

const { width: DWidth } = Dimensions.get('window');

const WatchButton = ({
  portfolioId,
  width,
  height = 45,
  id,
  symbol,
  image,
  name,
}: ButtonProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme, scheme } = useGlobalTheme();
  const { portfolios, activeIndex } = useAppSelector(state => ({
    portfolios: state.portfolioReducer.portfolios,
    activeIndex: state.portfolioReducer.activeIndex,
  }));

  const initailWidth = useMemo(() => {
    return DWidth - parseInt(theme.content.spacing, 10) * 2;
  }, [theme]);

  const isAlreadyWatch = useMemo(() => {
    const { coins } = portfolios[activeIndex];

    return coins.find(coin => coin.id === id) !== undefined;
  }, [portfolios, activeIndex, id]);

  const handleWatchPress = useCallback(() => {
    if (!id || !symbol || !image || !name) return;

    const portfolioIdTemp = portfolioId || portfolios[activeIndex].id;

    const payload = {
      portfolioId: portfolioIdTemp,
      coin: { id, symbol, image, name },
    };

    dispatch(addWatchingCoin(payload));
  }, [id, symbol, image, name, portfolioId, portfolios, activeIndex, dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const openAlert = (portfolioId: string, coinId: string) => {
    Alert.alert(
      t(`coinDetail.are you sure you want unwatch this coin?`),
      t(
        `coinDetail.all transactions and holdings related to this coin will be removed`
      ),
      [
        {
          text: t(`common.cancel`),
          onPress: () => console.log('cancel unwatch coin modal'),
          style: 'cancel',
        },
        {
          text: t(`coinDetail.unwatch`),
          onPress: () => {
            const payload = { portfolioId, coinId };

            dispatch(removeAllTransaction(payload));
            dispatch(unWatchingCoin(payload));
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const handleUnwatchPress = useCallback(() => {
    if (!id) return;

    const { coins } = portfolios[activeIndex];
    const portfolioIdTemp = portfolioId || portfolios[activeIndex].id;
    const { state } = coins.find(coin => coin.id === id)!;

    const payload = {
      portfolioId: portfolioIdTemp,
      coinId: id,
    };

    if (state === 'trading') {
      // alret
      openAlert(portfolioIdTemp, id);
    } else {
      dispatch(unWatchingCoin(payload));
    }
  }, [portfolios, id, portfolioId, activeIndex]);

  return (
    <AsyncButton
      bold
      fontML
      color100
      text={isAlreadyWatch ? t(`coinDetail.unwatch`) : t(`coinDetail.watch`)}
      width={width || initailWidth}
      height={height}
      onPress={isAlreadyWatch ? handleUnwatchPress : handleWatchPress}
      isLoading={!id}
      isDisabled={!id}
      borderPosition={['top', 'bottom']}
      initialBgColor={
        scheme === 'dark' ? theme.base.background[300] : theme.base.text[200]
      }
    />
  );
};

export default WatchButton;
