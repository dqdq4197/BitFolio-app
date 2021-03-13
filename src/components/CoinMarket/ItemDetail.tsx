import React, { useState, useLayoutEffect, useCallback } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import LineChart from './LineChart';
import useMarketChartData from '/hooks/useMarketChartData';
import { useAppSelector } from '/hooks/useRedux';
import { CoordinatesPropType, CallbackArgs } from "victory-core";
import styled from 'styled-components/native';


type ParamList = {
  CoinMarketDetail: {
    id: string
  }
}

const ItemDetail = () => {

  const { params } = useRoute<RouteProp<ParamList, 'CoinMarketDetail'>>();
  const { detailOption } = useAppSelector(state => state.baseSettingReducer);
  const navigation = useNavigation();
  const { data, mutate, isValidating } = useMarketChartData({
    id: params.id,
    days: 1,
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.id
    })
  }, [params.id])
  
  // const handleCursorChange = useCallback((value, props) => {
  //   setCursorValue({
  //     value: datum.y,
  //     time: datum.x
  //   })
  //   return ``;
  // }, [])

  if(!data) return <></>;

  return (
    <Container>
      <Text 
      />
    {detailOption === 'ohlc' 
      ? <>
        </>
      : <LineChart 
          data={data[detailOption]}
          // onCursorChange={handleCursorChange}
        />
    }
      
    </Container>
  )
}

export default ItemDetail;

const Container = styled.View`

`

const Text = styled.Text`
  font-size: ${({theme}) => theme.size.font_ml};
  color: ${({theme}) => theme.base.text[300]};
`