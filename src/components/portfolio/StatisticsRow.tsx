import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat';
import { digitToFixed } from '/lib/utils';
import { CoinType, ModeType } from '/store/slices/portfolio';
import useLocales from '/hooks/useLocales';
import { CoinStatType } from '/hooks/usePortfolioStats';

import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue';
import Text from '/components/common/Text';
import SkeletonContainer from '/components/skeletonPlaceholder/common/Container';
import DynamicSizeText from '/components/common/DynamicSizeText';
import PrivatePlaceholder from './PrivatePlaceholder';

type RowProps = {
  COL_WIDTH: number;
  coin: CoinType;
  stats?: CoinStatType | null;
  mode: ModeType;
  totalCosts: number;
  priceStats?: {
    current_price: number;
    price_change_percentage_24h: number | null;
  };
  onAddButtonPress: (coin: CoinType) => void;
};

type ColProps = {
  width: number;
  children: React.ReactNode;
  isLoading: boolean;
};

const Skeleton = React.memo(() => {
  return (
    <SkeletonContainer>
      {/* <SkeletonPlaceholder.Item justifyContent="flex-end" alignItems="flex-end">
        <SkeletonPlaceholder.Item width={80} height={13} borderRadius={3} />
        <SkeletonPlaceholder.Item
          width={50}
          height={13}
          marginTop={10}
          borderRadius={3}
        />
      </SkeletonPlaceholder.Item> */}
    </SkeletonContainer>
  );
});

const Col = ({ width, children, isLoading }: ColProps) => {
  return <ColWrap width={width}>{isLoading ? <Skeleton /> : children}</ColWrap>;
};

const StatisticsRow = ({
  COL_WIDTH,
  coin,
  stats,
  mode,
  totalCosts,
  priceStats,
  onAddButtonPress,
}: RowProps) => {
  const { t } = useTranslation();
  const { currency } = useLocales();
  const navigation = useNavigation();

  const handleRowPress = () => {
    const { id, symbol } = coin;
    navigation.navigate('portfolioCoinDetail', {
      param: { id, symbol },
      screen: t('coinDetail.transactions'),
    });
  };

  const PriceTab = useMemo(
    () =>
      priceStats !== undefined && (
        <>
          <DynamicSizeText color100 bold>
            {currencyFormat({
              value: priceStats.current_price,
              prefix: getCurrencySymbol(currency),
            })}
          </DynamicSizeText>
          <IncreaseDecreaseValue
            value={digitToFixed(priceStats.price_change_percentage_24h ?? 0, 2)}
            afterPrefix="%"
            right
            bold
          />
        </>
      ),
    [currency, priceStats]
  );

  const HoldingsTab = useMemo(() => {
    if (coin.state === 'watching') {
      return (
        <AddButton
          onPress={() => onAddButtonPress(coin)}
          activeOpacity={0.6}
          hitSlop={{
            bottom: 20,
            top: 20,
            left: 20,
            right: 20,
          }}
        >
          <Text bold>{t(`common.add`)}</Text>
        </AddButton>
      );
    }

    if (stats) {
      if (mode === 'private') {
        return (
          <>
            <PrivatePlaceholder
              diameter={9}
              color300
              numberOfCircle={5}
              horizontalSpacing={5}
            />
            <PrivateWrap>
              <PrivatePlaceholder
                diameter={7}
                color300
                numberOfCircle={3}
                horizontalSpacing={5}
              />
            </PrivateWrap>
          </>
        );
      }

      return (
        <>
          <DynamicSizeText color100 bold>
            {currencyFormat({
              value: stats.holding_costs,
              prefix: getCurrencySymbol(currency),
            })}
          </DynamicSizeText>
          <DynamicSizeText bold>
            {/* eslint-disable-next-line react-native/no-raw-text */}
            {`${stats.holding_quantity} ${coin.symbol.toUpperCase()}`}
          </DynamicSizeText>
        </>
      );
    }
  }, [stats, onAddButtonPress, coin, mode, currency, t]);

  const BuyAvgPrice = useMemo(() => {
    if (coin.state === 'watching') {
      return <Text>--</Text>;
    }

    if (stats) {
      if (mode === 'private') {
        return (
          <>
            <PrivatePlaceholder
              diameter={9}
              color300
              numberOfCircle={5}
              horizontalSpacing={5}
            />
            <Text />
          </>
        );
      }

      return (
        <>
          <DynamicSizeText bold color100>
            {currencyFormat({
              value:
                stats.total_purchase_quantity === 0
                  ? 0
                  : stats.total_purchase_cost / stats.total_purchase_quantity,
              prefix: getCurrencySymbol(currency),
            })}
          </DynamicSizeText>
          <Text />
        </>
      );
    }
  }, [coin.state, stats, mode, currency]);

  const PLTab = useMemo(() => {
    if (coin.state === 'watching') {
      return <Text>--</Text>;
    }

    if (stats) {
      return (
        <>
          <DynamicSizeText bold color100>
            {currencyFormat({
              value: stats.all_time_pl,
              prefix:
                stats.all_time_pl > 0
                  ? `+${getCurrencySymbol(currency)}`
                  : getCurrencySymbol(currency),
            })}
          </DynamicSizeText>
          <IncreaseDecreaseValue
            value={digitToFixed(
              stats.total_purchase_quantity === 0
                ? 0
                : stats.all_time_pl_percentage ?? 0,
              2
            )}
            afterPrefix="%"
            right
          />
        </>
      );
    }
  }, [coin.state, stats, currency]);

  const AllocationTab = useMemo(() => {
    let rate = 0;

    if (stats && totalCosts) {
      rate =
        (stats.holding_costs / totalCosts) * 100 < 0
          ? 0
          : (stats.holding_costs / totalCosts) * 100;
    }

    return (
      <>
        <Text bold margin="0 0 3px 0" color100>
          {currencyFormat({ value: rate })}%
        </Text>
        <AllocationBar>
          <AllocationIndicator rate={rate} />
        </AllocationBar>
      </>
    );
  }, [stats, totalCosts]);

  return (
    <Container activeOpacity={0.6} onPress={handleRowPress}>
      <Col width={COL_WIDTH} isLoading={priceStats === undefined}>
        {PriceTab}
      </Col>
      <Col width={COL_WIDTH} isLoading={!stats && coin.state !== 'watching'}>
        {HoldingsTab}
      </Col>
      <Col width={COL_WIDTH} isLoading={!stats && coin.state !== 'watching'}>
        {BuyAvgPrice}
      </Col>
      <Col width={COL_WIDTH} isLoading={!stats && coin.state !== 'watching'}>
        {PLTab}
      </Col>
      <Col width={COL_WIDTH} isLoading={false}>
        {AllocationTab}
      </Col>
    </Container>
  );
};

export default StatisticsRow;

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 60px;
`;

const ColWrap = styled.View<{ width: number }>`
  width: ${({ width }) => width}px;
  align-items: flex-end;
  justify-content: center;
`;

const AddButton = styled.TouchableOpacity`
  width: 65px;
  height: 25px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.border.m};
  border-width: 1px;
  border-color: ${({ theme }) => theme.base.text[200]};
  margin-right: 3px;
`;

const AllocationBar = styled.View`
  width: 80%;
  height: 11px;
  background-color: ${({ theme }) => theme.base.background[300]};
  border-radius: ${({ theme }) => theme.border.s};
  overflow: hidden;
`;

const AllocationIndicator = styled.View<{ rate: number }>`
  position: absolute;
  top: 0;
  width: ${({ rate }) => rate}%;
  height: 100%;
  background-color: ${({ theme }) => theme.base.text[200]};
`;

const PrivateWrap = styled.View`
  margin-top: 8px;
`;
