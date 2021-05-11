import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { baseTypes } from 'base-types';
import Text from '/components/common/Text';
import { useAppDispatch, useAppSelector } from '/hooks/useRedux';
import { changeChartTimeFrame, changeChartOption } from '/store/baseSetting';
import { MaterialCommunityIcons } from '@expo/vector-icons';



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

  const { chartTimeFrame } = useAppSelector(state => state.baseSettingReducer);
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
      <ChartSelectorWrap >
        <ChartSelector onPress={() => handleChartSelectorPress('prices')}>
          <MaterialCommunityIcons name="chart-line-variant" size={24} color="white" />
        </ChartSelector>
        <ChartSelector onPress={() => handleChartSelectorPress('ohlc')}>
          <MaterialCommunityIcons name="chart-line-variant" size={24} color="white" />
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

const ChartSelector = styled.TouchableOpacity`
  margin-right: 10px;
  padding: 3px 8px;
  border-radius: ${({theme}) => theme.border.xl};
`