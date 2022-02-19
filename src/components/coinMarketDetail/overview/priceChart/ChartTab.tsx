import React, { useMemo } from 'react';
import { Dimensions, LayoutAnimation, UIManager, Platform } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppDispatch, useAppSelector } from '/hooks/useRedux';
import { useChartState } from '/hooks/context/useChartContext';
import { changeChartInterval, changeChartType } from '/store/baseSetting';
import { CoinSvg } from '/lib/svg';
import { CHART_TYPE } from '/lib/constant';
import type { ChartType } from '/types/common';

import Text from '/components/common/Text';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const { width } = Dimensions.get('window');

const ChartTab = () => {
  const { theme } = useGlobalTheme();
  const { interval, changeRate } = useChartState();
  const { chartType, exchange, chartOptions } = useAppSelector(
    state => state.baseSettingReducer
  );
  const dispatch = useAppDispatch();

  const handleTimeSelectorPress = (value: number | string) => {
    dispatch(
      changeChartInterval({
        exchange,
        interval: value,
      })
    );
  };

  const color = useMemo(() => {
    if (!changeRate || changeRate >= 0) {
      return theme.base.upColor;
    }

    return theme.base.downColor;
  }, [changeRate, theme]);

  const handleChartSelectorPress = (value: ChartType) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, 'easeInEaseOut', 'opacity')
    );
    dispatch(changeChartType(value));
  };

  return (
    <ChartTabWrap>
      <ChartTimeSelectorScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {interval.map(frame => {
          return (
            <Selector
              key={frame.value}
              onPress={() => handleTimeSelectorPress(frame.value)}
              isSelected={frame.value === chartOptions[exchange].interval}
              activeOpacity={0.6}
            >
              <Text
                fontM
                bold
                color={
                  frame.value === chartOptions[exchange].interval
                    ? theme.base.text[100]
                    : theme.base.text[200]
                }
              >
                {frame.label}
              </Text>
            </Selector>
          );
        })}
      </ChartTimeSelectorScrollView>
      <ChartSelectorWrap>
        <Selector
          isSelected={chartType === CHART_TYPE.LINE}
          onPress={() => handleChartSelectorPress(CHART_TYPE.LINE)}
          activeOpacity={0.6}
        >
          <MaterialCommunityIcons
            name="chart-line-variant"
            size={20}
            color={color}
          />
        </Selector>
        <Selector
          isSelected={chartType === CHART_TYPE.CANDLESTICK}
          onPress={() => handleChartSelectorPress(CHART_TYPE.CANDLESTICK)}
          activeOpacity={0.6}
          marginRightZero
        >
          <CoinSvg
            name="candlestick"
            width={20}
            height={20}
            fstColor={
              !changeRate || changeRate > 0
                ? theme.base.downColor
                : theme.base.upColor
            }
            scdColor={color}
          />
        </Selector>
      </ChartSelectorWrap>
    </ChartTabWrap>
  );
};

export default ChartTab;

interface SelectorProps {
  isSelected: boolean;
  marginRightZero?: boolean;
}

const ChartTabWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${width}px;
  padding: 0 ${({ theme }) => theme.content.spacing};
`;

const ChartTimeSelectorScrollView = styled.ScrollView``;

const ChartSelectorWrap = styled.View`
  flex-direction: row;
`;

const Selector = styled.TouchableOpacity<SelectorProps>`
  margin-right: ${({ marginRightZero }) => (marginRightZero ? 0 : 10)}px;
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.border.m};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.base.background[300] : 'transparent'};
`;
