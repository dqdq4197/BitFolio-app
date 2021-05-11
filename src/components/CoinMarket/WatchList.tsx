import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import useLocales from '/hooks/useLocales';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Image from '/components/common/Image';
import { useAppSelector } from '/hooks/useRedux';
import useCoinMarketData from '/hooks/useCoinMarketData';

type ListProps = {
  onPressItem: (id: string) => void;
}

const WatchList = ({ onPressItem }: ListProps) => {
  const { watchList } = useAppSelector(state => state.baseSettingReducer);
  const { data } = useCoinMarketData({ ids: watchList });
  const { t } = useTranslation();
  const theme = useGlobalTheme();
  const { currency } = useLocales();

  return (
    <SurfaceWrap title='관심 목록' parentPaddingZero>
      
    </SurfaceWrap>
  )
}

export default WatchList;

const Card = styled.TouchableOpacity`
  width: 135px;
  height: 135px;
  border-radius: ${({ theme }) => theme.border.xl};
  background-color: ${({ theme }) => theme.base.background[300]};
  margin-right: 10px;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px;
`

const SearchCard = styled(Card)`
  align-items: center;
  justify-content: center;
`