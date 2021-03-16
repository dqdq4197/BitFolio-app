import React, { useLayoutEffect } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import LineChart from './LineChart';
import useMarketLineChartData from '/hooks/useMarketLineChartData';
import { useAppSelector } from '/hooks/useRedux';
import Text from '/components/common/Text';
import PriceAndDetail from './PriceAndDetail';
import { useAppDispatch } from '/hooks/useRedux';
import { changeChartTimeFrame } from '/store/baseSetting';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type ParamList = {
  CoinMarketDetail: {
    id: string
  }
}

type TimeFrameType = 1 | 7 | 30 | 365 | 'max';

const ItemDetail = () => {

  const { params } = useRoute<RouteProp<ParamList, 'CoinMarketDetail'>>();
  const { detailOption, chartTimeFrame } = useAppSelector(state => state.baseSettingReducer);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { data, mutate, isValidating } = useMarketLineChartData({
    id: params.id,
    days: 1,
  })
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.id
    })
  }, [params.id])

  const handleTimeSelectorPress = (value: number | string) => {
    dispatch(changeChartTimeFrame(value as TimeFrameType));
  }

  if(!data) return <></>;

  return (
    <Container>
      <Text fontXXL>
        {params.id.charAt(0).toUpperCase() + params.id.slice(1)}
      </Text>
      <PriceAndDetail />
      {detailOption === 'ohlc' 
        ? <>
          </>
        : <LineChart 
            isValidating={isValidating}
            data={data[detailOption]}
          />
      }
      <ChartTimeSelectorWrap>
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
      </ChartTimeSelectorWrap>
    </Container>
  )
}

export default ItemDetail;


interface TimeSelectorProps {
  isSelected: boolean
}
const Container = styled.ScrollView`
  
`

const HeaderView = styled.View`
`

const ChartTimeSelectorWrap = styled.View`
  width: ${wp('100%')}px;
  justify-content: space-evenly;
  margin-top: 20px;
  flex-direction: row;
  padding: 0 ${({theme}) => theme.content.spacing};
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
  }
`