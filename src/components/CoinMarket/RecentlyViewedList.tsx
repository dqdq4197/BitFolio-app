import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue';
import Image from '/components/common/Image';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { digitToFixed } from '/lib/utils';
import WatchListIcon from '/components/common/WatchListIcon';
import { useAppSelector } from '/hooks/useRedux';
import useCoinMarketData from '/hooks/useCoinMarketData';

type ListProps = {
  onPressItem: (id: string, symbol: string) => void;
}
const RecentlyViewedList = ({ onPressItem }: ListProps) => {
  const navigation = useNavigation();
  const { recentlyViewed } = useAppSelector(state => state.baseSettingReducer );
  const { data } = useCoinMarketData({ 
    ids: recentlyViewed, 
    suspense: false,
    refreshInterval: 300000,
  });
  const { t } = useTranslation();
  const { theme } = useGlobalTheme();

  const handleSearchCardPress = () => {
    navigation.navigate('CoinSearch');
  }
  return (
    <SurfaceWrap title={t('coinMarketHome.recently viewed')} parentPaddingZero>
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
              onPress={() => onPressItem(coin.id, coin.symbol)}
            >
              <IconWrap>
                <Image uri={coin.image} width={35} height={35} />
                <WatchListIcon id={coin.id} size={28} />
              </IconWrap>
              <TitleAndPercentage>
                <Text fontML bold>
                  { coin.name }
                </Text>
                <IncreaseDecreaseValue
                  value={ digitToFixed(coin.price_change_percentage_24h ?? 0, 2) }
                  afterPrefix='%'
                  textStyle={{
                    fontML: true,
                    bold: true,
                    margin: '5px 0 0 0'
                  }}
                />
              </TitleAndPercentage>
            </Card>
          )
        }) }
        <SearchCard onPress={handleSearchCardPress}>
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