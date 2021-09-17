import React from 'react';
import { 
  Dimensions, 
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';
import styled from 'styled-components/native';
import { baseTypes } from 'base-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CoinSvg } from '/lib/svg';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Text from '/components/common/Text';
import { useAppDispatch, useAppSelector } from '/hooks/useRedux';
import { changeChartTimeFrame, changeChartOption } from '/store/baseSetting';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');
const timeFrame = [{
  label: '1D',
  value: 1,
}, {
  label: '1W',
  value: 7,
}, {
  label: '1M',
  value: 30,
}, {
  label: '1Y',
  value: 365,
}, {
  label: 'All',
  value: 'max',
},]
type TimeFrameType = baseTypes.ChartTimeFrame;

type TabProps = {
  lastUpdatedPercentage:number
}

const ChartTab = ({ lastUpdatedPercentage }: TabProps) => {
  const { theme } = useGlobalTheme();
  const { chartTimeFrame, chartOption } = useAppSelector(state => state.baseSettingReducer);
  const dispatch = useAppDispatch();

  const handleTimeSelectorPress = (value: number | string) => {
    dispatch(changeChartTimeFrame(value as TimeFrameType));
  }
  
  const handleChartSelectorPress = (value: 'prices' | 'ohlc') => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, 'easeInEaseOut', 'opacity')
    );
    dispatch(changeChartOption(value))
  }

  return (
    <ChartTabWrap>
      <ChartTimeSelectorScrollView horizontal>
        { timeFrame.map(frame => {
          return (
            <Selector 
              key={frame.value} 
              onPress={() => handleTimeSelectorPress(frame.value)}
              isSelected={frame.value === chartTimeFrame}
              activeOpacity={0.6}
            >
              <Text 
                fontM
                bold
                color={
                  frame.value === chartTimeFrame 
                    ? theme.base.text[100]
                    : theme.base.text[200]
                }
              >
                { frame.label }
              </Text>
            </Selector>
          )
        }) }
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
  )
}

export default ChartTab;


interface SelectorProps {
  isSelected: boolean
  marginRightZero?: boolean
}

const ChartTabWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${ width }px;
  padding: 0 ${({theme}) => theme.content.spacing};
`

const ChartTimeSelectorScrollView = styled.ScrollView``

const ChartSelectorWrap = styled.View`
  flex-direction: row;
`

const Selector = styled.TouchableOpacity<SelectorProps>`
  margin-right: ${({ marginRightZero }) => marginRightZero   ? 0  : 10 }px;
  padding: 5px 10px;
  border-radius: ${({theme}) => theme.border.m};
  align-items: center;
  justify-content: center;
  background-color: ${
    ({ theme, isSelected }) => 
      isSelected 
      ? theme.base.background[300]
      : 'transparent'
  };
`
