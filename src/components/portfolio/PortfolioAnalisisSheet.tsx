import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as habtics from 'expo-haptics';
import { PortfolioStatsType } from '/hooks/usePortfolioStats';
import useLocales from '/hooks/useLocales';
import { useAppDispatch, useAppSelector } from '/hooks/useRedux';
import Text from '/components/common/Text';
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat';
import { convertUnits, digitToFixed } from '/lib/utils'
import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue';
import { changeMode, ModeType } from '/store/portfolio';
import { Container as SkeletonContainer, SkeletonItem } from '/components/skeletonPlaceholder/common';
import PrivatePlaceholder from './PrivatePlaceholder';

type SheetProps = {
  portfolioStats: PortfolioStatsType | null
}

type ContentProps = {
  mode?: ModeType
  privatePlaceholder?: JSX.Element
  children: JSX.Element
  skeletonSize: {
    width: number
    height: number
  }
  isLoading: boolean
}

const ConditionalContent = ({ 
  mode,
  privatePlaceholder,
  children, 
  skeletonSize, 
  isLoading 
}: ContentProps) => {
  if(mode === 'private' && privatePlaceholder) {
    return privatePlaceholder
  } else {
    if(isLoading) {
      const { width, height } = skeletonSize;

      return (
        <SkeletonContainer>
          <View style={{ width, height, borderRadius: 6 }} />
        </SkeletonContainer>
      )
    } else {
      return children
    }
  }

}

const PortfolioAnalisisSheet = ({ portfolioStats }: SheetProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => ({
    mode: state.portfolioReducer.mode
  }));
  const { currency } = useLocales();

  const onPortfolioModeChange = () => {
    if(mode === 'private') {
      habtics.impactAsync();
      dispatch(changeMode('public'));
    } else {
      habtics.impactAsync();
      dispatch(changeMode('private'));
    }
  }

  
  return (
    <Container>
      <Text fontML bold margin="0 0 5px 0">
        { t(`portfolio.total balance`) }
      </Text>
      <SpaceBetweenView
        activeOpacity={0.6}
        onLongPress={onPortfolioModeChange}
      >
        <ConditionalContent 
          mode={mode}
          privatePlaceholder={
            <PrivatePlaceholder 
              color100
              diameter={13}
              numberOfCircle={5}
              horizontalSpacing={7}
            />
          }
          isLoading={!portfolioStats}
          skeletonSize={{
            width: 130,
            height: 35
          }}
        >
          <Text fontXXL heavy color100>
            { portfolioStats && convertUnits(portfolioStats.total_balance, currency) }
          </Text>
        </ConditionalContent>
        <PercentageWrap>
          <ConditionalContent 
            isLoading={!portfolioStats}
            skeletonSize={{
              width: 50,
              height: 20
            }}
          >
            <IncreaseDecreaseValue
                heavy 
                fontL
                value={ portfolioStats && digitToFixed(portfolioStats.portfolio_all_time_pl_percentage, 2) }
                afterPrefix="%"
              />
          </ConditionalContent>
        </PercentageWrap>
      </SpaceBetweenView>
      { portfolioStats 
        ? <Text fontML bold>
            { portfolioStats 
              ? convertUnits(portfolioStats.portfolio_change_24h, currency)
              : 0
            } today
          </Text>
        : null
      }
      
    </Container>
  )
}


export default PortfolioAnalisisSheet;

type CircleProps = {
  diameter: number
}
const Container = styled.View`
  height: 170px;
`

const PercentageWrap = styled.View`
  background-color: ${({ theme }) => theme.base.background[300]};
  padding: 5px 8px;
  border-radius: ${({ theme }) => theme.border.m};
`

const Row = styled.View`
  flex-direction: row;
`

const SpaceBetweenView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const PrivateCircle = styled.View<CircleProps>`
  width: ${({ diameter }) => diameter}px;
  height: ${({ diameter }) => diameter}px;
  border-radius: ${({ diameter }) => diameter / 2}px;
  background-color: ${({ theme }) => theme.base.text[300]};
  margin: 0 ${({ diameter }) => diameter / 2}px;
`