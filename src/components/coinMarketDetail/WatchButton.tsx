import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Dimensions } from 'react-native';

import { useFeedBackAlertContext } from '/hooks/context/useFeedBackContext';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppDispatch, useAppSelector } from '/hooks/useRedux';
import {
  addWatchingCoin,
  CoinType,
  unwatchingCoin,
} from '/store/slices/portfolio';
import { removeAllTransaction } from '/store/slices/transaction';
import type { CoinDetailScreenProps } from '/types/navigation';

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
  const { openAlert: openFeedBackAlert } = useFeedBackAlertContext();
  const navigation =
    useNavigation<CoinDetailScreenProps<'Overview'>['navigation']>();
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
    openFeedBackAlert({
      message: t(`coinDetail.added coin as a watch item to portfolio.`, {
        coin: symbol.toUpperCase(),
      }),
      severity: 'success',
      onPress: () =>
        navigation.navigate('Portfolio', { screen: 'PortfolioOverview' }),
    });
  }, [
    id,
    symbol,
    image,
    name,
    portfolioId,
    portfolios,
    activeIndex,
    dispatch,
    openFeedBackAlert,
    t,
    navigation,
  ]);

  const openUnwatchAlert = useCallback(() => {
    openFeedBackAlert({
      message: t(`coinDetail.successfully unwatch coin`, {
        coin: symbol.toUpperCase(),
      }),
      severity: 'success',
      onPress: () =>
        navigation.navigate('Portfolio', { screen: 'PortfolioOverview' }),
    });
  }, [navigation, openFeedBackAlert, symbol, t]);

  const openAlert = useCallback(
    (portfolioId: string, coinId: string) => {
      Alert.alert(
        t(`coinDetail.are you sure you want unwatch this coin?`),
        t(
          `coinDetail.all transactions and holdings related to this coin will be removed`
        ),
        [
          {
            text: t(`common.cancel`),
            style: 'cancel',
          },
          {
            text: t(`coinDetail.unwatch`),
            onPress: () => {
              const payload = { portfolioId, coinId };

              dispatch(removeAllTransaction(payload));
              dispatch(unwatchingCoin(payload));
              openUnwatchAlert();
            },
            style: 'destructive',
          },
        ],
        { cancelable: false }
      );
    },
    [dispatch, openUnwatchAlert, t]
  );

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
      openAlert(portfolioIdTemp, id);
    } else {
      dispatch(unwatchingCoin(payload));
      openUnwatchAlert();
    }
  }, [
    id,
    portfolios,
    activeIndex,
    portfolioId,
    openAlert,
    dispatch,
    openUnwatchAlert,
  ]);

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
