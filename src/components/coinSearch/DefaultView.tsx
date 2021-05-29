import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { SearchTrandingCoin, SearchCoin } from '/lib/api/CoinGeckoReturnType';
import Item from './Item';
import SurfaceWrap from '/components/common/SurfaceWrap';
import Image from '/components/common/Image';
import Text from '/components/common/Text';
import useGlobalTheme from '/hooks/useGlobalTheme';


type DefaultViewProps = {
  data?: SearchTrandingCoin[];
  searchesData: SearchCoin[];
  onPressItem: (id: string, symbol: string) => void;
}

type SearchesItemProps = {
  item: SearchCoin;
  onPressItem: (id: string, symbol: string) => void;
}

const SearchesItem = ({ item, onPressItem }: SearchesItemProps) => {
  return (
    <SearchesItemContainer onPress={() => onPressItem(item.id, item.symbol)}>
      <Image uri={item.large} width={30} height={30} borderRedius="m" />
      <Text 
        fontML 
        bold 
        color100 
        numberOfLines={1}
        ellipsizeMode="tail"
        margin="5px 0 0 0"
      >
        { item.name }
      </Text>
      <Text 
        fontM 
        bold
        numberOfLines={1}
        ellipsizeMode="tail"
        margin="2px 0 0 0"
      >
        { item.symbol }
      </Text>
    </SearchesItemContainer>
  )
}

const DefaultView = ({ data, searchesData, onPressItem }: DefaultViewProps) => {

  const { t } = useTranslation();
  const { theme } = useGlobalTheme();

  return (
    <Container>
      <SurfaceWrap title={t('search.recent searches')} marginTopZero fontL parentPaddingZero>
        <SearchesScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: parseInt(theme.content.spacing)
          }}
        >
          { searchesData.map((coin, index) => (
            <SearchesItem 
              key={coin.id + index}
              item={coin}
              onPressItem={onPressItem}
            />
            )) 
          }
        </SearchesScrollView>
      </SurfaceWrap>
      <SurfaceWrap title={t('search.trending search')} fontL>
        { data?.map((coin, index) => {
          const { item } = coin;
          return (
            <Item 
              key={item.coin_id}
              index={index}
              item={item} 
              onPressItem={() => onPressItem(item.id, item.symbol)}
            />
          )
        })}
      </SurfaceWrap>
    </Container>
  )
}

export default DefaultView;


const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.base.background[100]};
`

const SearchesScrollView = styled.ScrollView`
`
const SearchesItemContainer = styled.TouchableOpacity`
  width: 120px;
  height: 100px;
  margin-right: 10px;
  background-color: ${({ theme }) => theme.base.background[300]};
  border-radius: ${({ theme }) => theme.border.ml};
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`