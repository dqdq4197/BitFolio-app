import React from 'react';
import { Dimensions, LayoutAnimation, UIManager, Platform } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppDispatch, useAppSelector } from '/hooks/useRedux';
import { useChartState } from '/hooks/context/useChartContext';
import { changeChartInterval, changeChartOption } from '/store/baseSetting';
import { CoinSvg } from '/lib/svg';

import Text from '/components/common/Text';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const { width } = Dimensions.get('window');

type TabProps = {
  lastUpdatedPercentage: number;
};

const ChartTab = ({ lastUpdatedPercentage }: TabProps) => {
  const { theme } = useGlobalTheme();
  const { interval } = useChartState();
  const { chartOption, exchange, chartOptions } = useAppSelector(
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

  const handleChartSelectorPress = (value: 'prices' | 'ohlc') => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, 'easeInEaseOut', 'opacity')
    );
    dispatch(changeChartOption(value));
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
          isSelected={chartOption === 'prices'}
          onPress={() => handleChartSelectorPress('prices')}
          activeOpacity={0.6}
        >
          <MaterialCommunityIcons
            name="chart-line-variant"
            size={20}
            color={
              lastUpdatedPercentage > 0
                ? theme.base.upColor
                : lastUpdatedPercentage === 0
                ? theme.base.background[200]
                : theme.base.downColor
            }
          />
        </Selector>
        <Selector
          isSelected={chartOption === 'ohlc'}
          onPress={() => handleChartSelectorPress('ohlc')}
          activeOpacity={0.6}
          marginRightZero
        >
          <CoinSvg
            name="candlestick"
            width={20}
            height={20}
            fstColor={
              lastUpdatedPercentage > 0
                ? theme.base.downColor
                : lastUpdatedPercentage === 0
                ? theme.base.background[200]
                : theme.base.upColor
            }
            scdColor={
              lastUpdatedPercentage > 0
                ? theme.base.upColor
                : lastUpdatedPercentage === 0
                ? theme.base.background[200]
                : theme.base.downColor
            }
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
