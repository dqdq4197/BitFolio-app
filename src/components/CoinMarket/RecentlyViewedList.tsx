import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import { useAppSelector } from '/hooks/useRedux';
import useCoinSimplePrice from '/hooks/useCoinSimplePrice';


type ListProps = {
  onPressItem: (id: string) => void;
}
const RecentlyViewedList = ({ onPressItem }: ListProps) => {
  const { recentlyViewed } = useAppSelector(state => state.baseSettingReducer);
  const { data } = useCoinSimplePrice({ ids: 'bitcoin' });

  console.log(data);
  return (
    <SurfaceWrap title='최근 본 코인'>
      <CardWrap
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {recentlyViewed.map(id => {
          return (
            <Card>
              <Text fontX>
                { id }
              </Text>
            </Card>
          )
        })}
        <Card>
          <Text fontX>
            검색
          </Text>
        </Card>
      </CardWrap>
    </SurfaceWrap>
  )
}

export default RecentlyViewedList;

const CardWrap = styled.ScrollView`
  
`

const Card = styled.TouchableOpacity`
  width: 150px;
  height: 150px;
  border-radius: ${({ theme }) => theme.border.m};
  background-color: ${({ theme }) => theme.base.background[300]};
  margin-right: 10px;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px;
`