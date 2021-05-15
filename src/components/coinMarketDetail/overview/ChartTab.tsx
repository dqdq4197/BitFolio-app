import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { baseTypes } from 'base-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CoinSvg } from '/lib/svg';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Text from '/components/common/Text';
import { useAppDispatch, useAppSelector } from '/hooks/useRedux';
import { changeChartTimeFrame, changeChartOption } from '/store/baseSetting';



type TimeFrameType = baseTypes.ChartTimeFrame;
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

const ChartTab = () => {
  const theme = useGlobalTheme();
  const { chartTimeFrame, chartOption } = useAppSelector(state => state.baseSettingReducer);
  const dispatch = useAppDispatch();

  const handleTimeSelectorPress = (value: number | string) => {
    dispatch(changeChartTimeFrame(value as TimeFrameType));
  }
  
  const handleChartSelectorPress = (value: 'prices' | 'ohlc') => {
    dispatch(changeChartOption(value))
  }

  return (
    <ChartTabWrap>
      <ChartTimeSelectorWrap horizontal>
        <View>
          {timeFrame.map((v) => {
            return (
              <TimeSelector 
                key={v.value} 
                onPress={() => handleTimeSelectorPress(v.value)}
                isSelected={v.value === chartTimeFrame}
              >
                <Text fontL color={v.value === chartTimeFrame ? '#eeeeee' : '#bdbdbd'}>
                  {v.label}
                </Text>
              </TimeSelector>
            )
          })}
        </View>
      </ChartTimeSelectorWrap>
      <ChartSelectorWrap>
        <ChartSelector 
          isSelected={chartOption === 'prices'} 
          onPress={() => handleChartSelectorPress('prices')}
        >
          <MaterialCommunityIcons 
            name="chart-line-variant" 
            size={24} 
            color={chartOption === 'prices' ? theme.base.text[100] : theme.base.text[200]}
          />
        </ChartSelector>
        <ChartSelector 
          isSelected={chartOption === 'ohlc'} 
          onPress={() => handleChartSelectorPress('ohlc')}
        >
          <CoinSvg name="candlestick" width={24} height={24}/>
        </ChartSelector>
      </ChartSelectorWrap>
    </ChartTabWrap>
  )
}

export default ChartTab;


interface TimeSelectorProps {
  isSelected: boolean
}

const View = styled.View`
  flex: 2.5;
  flex-direction: row;
`
const ChartTabWrap = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: ${ width }px;
  margin-top: 20px;
  padding: 0 ${({theme}) => theme.content.spacing};
`

const ChartTimeSelectorWrap = styled.ScrollView`
  flex: 2.5;
`

const TimeSelector = styled.TouchableOpacity<TimeSelectorProps>`
  margin-right: 10px;
  padding: 3px 8px;
  border-radius: ${({theme}) => theme.border.xl};
  background-color: ${
    (props) => 
      props.isSelected 
      ? 'rgba(255,255,255, .2)'
      : 'transparent'
  };
`

const ChartSelectorWrap = styled.View`
  flex-direction: row;
  flex: 1;
`

const ChartSelector = styled.TouchableOpacity<TimeSelectorProps>`
  margin-right: 10px;
  padding: 3px 8px;
  border-radius: ${({theme}) => theme.border.xl};
  background-color: ${
    (props) => 
      props.isSelected 
      ? 'rgba(255,255,255, .2)'
      : 'transparent'
  };
`