import React, { useState, useEffect} from 'react';
import styled from 'styled-components/native';
import { SearchTrandingCoin } from '/lib/api/CoinGeckoReturnType';
import { useAppSelector } from '/hooks/useRedux';
import Item from './Item';
import SurfaceWrap from '/components/common/SurfaceWrap';

type DefaultViewProps = {
  data?: SearchTrandingCoin[];
  onPressItem: (id: string, symbol: string) => void;
}

type SearchedItemProps = {
  coin: SearchTrandingCoin
}

const SearchedItem = ({ coin }: SearchedItemProps) => {
  const { item } = coin;
  console.log(item);
  return (
    <SearchedItemContainer>
    </SearchedItemContainer>
  )
}

const DefaultView = ({ data, onPressItem }: DefaultViewProps) => {
  const { recentlySearched } = useAppSelector(state => state.baseSettingReducer);
  const [searchedData, setSearchedData] = useState<SearchTrandingCoin[]>([]);

  useEffect(() => {
    console.log(data)
    console.log(data?.filter(coin => coin.item.name === 'bitcoin'))
    if(data) {
      setSearchedData(data.filter(coin => recentlySearched.includes(coin.item.id)))
    }
  }, [recentlySearched, data])


  return (
    <Container>
      <SurfaceWrap title="최근 검색" marginTopZero fontL >
        <SearchedListContainer
          horizontal
        >
          { searchedData.map(coin => (
            <SearchedItem 
              key={coin.item.coin_id}
              coin={coin}
            />
            )) 
          }
        </SearchedListContainer>
      </SurfaceWrap>
      <SurfaceWrap title="인기 검색어" fontL>
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
`

const SearchedListContainer = styled.ScrollView`
 flex: 1;
`
const SearchedItemContainer = styled.View`
  width: 60px;
  height: 40px;
  background-color: ${({ theme }) => theme.base.background[300]};
`