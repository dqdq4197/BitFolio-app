import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { digitToFixed } from '/lib/utils';
import Image from '/components/common/Image';
import WatchListIcon from '/components/common/WatchListIcon';
import { useAppSelector } from '/hooks/useRedux';
import useCoinMarketData from '/hooks/useCoinMarketData';

type ListProps = {
  onPressItem: (id: string) => void;
}
const RecentlyViewedList = ({ onPressItem }: ListProps) => {

  const { recentlyViewed } = useAppSelector(state => state.baseSettingReducer );
  const { data } = useCoinMarketData({ 
    ids: recentlyViewed, 
    suspense: false,
    refreshInterval: 300000,
  });
  const { t } = useTranslation();
  const theme = useGlobalTheme();


  console.log(data);
  return (
    <SurfaceWrap title='최근 본 코인' parentPaddingZero>
      <CardWrap
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16
        }}
      >
        { data?.map(coin => {
          return (
            <Card 
              key={coin.id} 
              onPress={() => onPressItem(coin.id)}
            >
              <IconWrap>
                <Image uri={coin.image} width={35} height={35} />
                <WatchListIcon id={coin.id} size={28} />
              </IconWrap>
              <TitleAndPercentage>
                <Text fontML bold>
                  { coin.name }
                </Text>
                <FigureText 
                  fontML 
                  bold 
                  percentage={coin.price_change_percentage_24h}
                  margin="5px 0 0 0"
                >
                  { coin.price_change_percentage_24h > 0 && '+' }
                  { digitToFixed(coin.price_change_percentage_24h, 2) }%
                </FigureText>
              </TitleAndPercentage>
            </Card>
          )
        }) }
        <SearchCard>
          <Ionicons 
            name="search-sharp" 
            size={24} 
            color={theme.base.text[200]} 
          />
          <Text fontML bold margin="10px 0 0 0">
            { t('coinMarketHome.search') }
          </Text>
        </SearchCard>
      </CardWrap>
    </SurfaceWrap>
  )
}

export default RecentlyViewedList;


type TextProps = {
  percentage: number
}
const CardWrap = styled.ScrollView``

const IconWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`

const TitleAndPercentage = styled.View``

const Card = styled.TouchableOpacity`
  width: 135px;
  height: 135px;
  border-radius: ${({ theme }) => theme.border.xl};
  background-color: ${({ theme }) => theme.base.background[300]};
  margin-right: 10px;
  padding: 16px;
  justify-content: space-between;
`

const SearchCard = styled(Card)`
  align-items: center;
  justify-content: center;
`

const FigureText = styled(Text)<TextProps>`
  color: ${(props) => props.percentage > 0 
    ? props.theme.colors.green.a400 
    : props.percentage === 0 
      ? props.theme.base.text[200]
      : props.theme.colors.red[500]
  };
`