import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as habtics from 'expo-haptics';
import useLocales from '/hooks/useLocales';
import { useAppDispatch, useAppSelector, shallowEqual } from '/hooks/useRedux';
import Text from '/components/common/Text';
import { convertUnits, digitToFixed } from '/lib/utils'
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat';
import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue';
import { changeMode, changeShowValueMode, ModeType } from '/store/portfolio';
import { Container as SkeletonContainer } from '/components/skeletonPlaceholder/common';
import PrivatePlaceholder from './PrivatePlaceholder';

type AnalysisProps = {
  total_balance?: number
  portfolio_all_time_pl_percentage?: number
  portfolio_change_24h?: number
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

const CommonAnalysis = ({
  total_balance,
  portfolio_all_time_pl_percentage,
  portfolio_change_24h
}: AnalysisProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { mode, showValueMode } = useAppSelector(state => ({
    mode: state.portfolioReducer.mode,
    showValueMode: state.portfolioReducer.showValueMode
  }), shallowEqual);
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

  const showFullValue = () => {
    if(mode === 'private') return ;

    if(showValueMode === 'full') {
      dispatch(changeShowValueMode('short'))
    } else {
      dispatch(changeShowValueMode('full'))
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
        onPress={showFullValue}
      >
        <ConditionalContent 
          mode={mode}
          privatePlaceholder={
            <PrivatePlaceholder 
              color100
              diameter={13}
              numberOfCircle={5}
              horizontalSpacing={14}
            />
          }
          isLoading={!total_balance}
          skeletonSize={{
            width: 130,
            height: 35
          }}
        >
          { showValueMode === 'short'
            ? <Text fontXXL heavy color100>
                { total_balance !== undefined && convertUnits(total_balance, currency) }
               </Text>
            : <Text fontXL heavy color100>
                { total_balance && currencyFormat({
                  value: total_balance,
                  prefix: getCurrencySymbol(currency)
                }) }
              </Text>
          }
         
        </ConditionalContent>
        <Block>
          <ConditionalContent 
            isLoading={!portfolio_all_time_pl_percentage}
            skeletonSize={{
              width: 50,
              height: 20
            }}
          >
            <IncreaseDecreaseValue
              heavy 
              fontL
              value={ 
                portfolio_all_time_pl_percentage !== undefined && isFinite(portfolio_all_time_pl_percentage)
                  ? digitToFixed(portfolio_all_time_pl_percentage, 2) 
                  : null
              }
              afterPrefix="%"
            />
          </ConditionalContent>
        </Block>
      </SpaceBetweenView>
      <Row>
        <ConditionalContent 
          mode={mode}
          privatePlaceholder={
            <PrivatePlaceholder 
              diameter={8}
              numberOfCircle={3}
              horizontalSpacing={13}
            />
          }
          isLoading={!portfolio_change_24h}
          skeletonSize={{
            width: 50,
            height: 20
          }}
        >
          <Text fontML bold>
            { portfolio_change_24h && ( showValueMode === 'short'
              ? (portfolio_change_24h > 0 ? '+ ' : '') + convertUnits(portfolio_change_24h, currency)
              : (portfolio_change_24h > 0 ? '+ ' : '') + currencyFormat({
                  value: portfolio_change_24h,
                  prefix: getCurrencySymbol(currency)
                })
            ) }
          </Text>
        </ConditionalContent>
        <Wrap>
          <Text primaryColor bold>
            24h
          </Text>
        </Wrap>
      </Row>
    </Container>
  )
}

export default CommonAnalysis;

const Container = styled.View`
  width: 100%;
  height: 87px;
`

const Block = styled.View`
  padding: 5px 8px;
  border-radius: ${({ theme }) => theme.border.m};
  background-color: ${({ theme }) => theme.base.background[300]};
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const SpaceBetweenView = styled.TouchableOpacity`
  height: 45px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Wrap = styled.View`
  padding: 3px 5px;
  margin-left: 5px;
  border-radius: ${({ theme }) => theme.border.m};
  background-color: ${({ theme }) => theme.base.background[300]};
`