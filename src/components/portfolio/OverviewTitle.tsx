import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import useLocales from '/hooks/useLocales';
import { useAppSelector, shallowEqual } from '/hooks/useRedux';
import { convertUnits, digitToFixed } from '/lib/utils';
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat';
import Text from '/components/common/Text';
import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue';

type TitleProps = {
  total_balance?: number
  portfolio_change_percentage_24h?: number
}

const OverviewTitle = ({
  total_balance,
  portfolio_change_percentage_24h
}: TitleProps) => {

  const { theme } = useGlobalTheme();
  const { currency } = useLocales();
  const { portfolio, activeIndex } = useAppSelector(state => ({
    portfolio: state.portfolioReducer.portfolios,
    activeIndex: state.portfolioReducer.activeIndex
  }), shallowEqual)
  const { mode, showValueMode } = portfolio[activeIndex];

  if(total_balance === undefined || portfolio_change_percentage_24h === undefined) {
    return (
      <Text bold fontX>
        --
      </Text>
    )
  }

  return (
    <>
      {
        mode === 'private'
          ? <PrivateWrap>
              <Ionicons name="md-eye-off-outline" size={25} color={theme.base.text[200]} />
            </PrivateWrap>
          : <PublicWrap>
              <Text bold fontL color100>
                { 
                  showValueMode === 'short'
                    ? convertUnits(total_balance, currency)
                    : currencyFormat({ 
                        value: total_balance,
                        prefix: getCurrencySymbol(currency)
                      })
                } 
              </Text>
              <PercentageWrap>
                <IncreaseDecreaseValue 
                  value={
                    !isFinite(portfolio_change_percentage_24h)
                      ? null
                      : digitToFixed(portfolio_change_percentage_24h, 2)
                  }
                  afterPrefix="%"
                  heavy
                  fontML
                />
              </PercentageWrap>
            </PublicWrap>
      }
    </>
  )
}

export default OverviewTitle;


const PrivateWrap = styled.View`
  width: 70px;
  height: 30px;
  background-color: ${({ theme }) => theme.base.background[200]};
  border-radius: ${({ theme }) => theme.border.m};
  align-items: center;
  justify-content: center;
`

const PublicWrap = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const PercentageWrap = styled.View`
  background-color: ${({ theme }) => theme.base.background[200] };
  border-radius: ${({ theme }) => theme.border.m};
  padding: 3px 3px;
  margin-left: 5px;
`