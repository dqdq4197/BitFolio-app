import React from 'react';
import styled from 'styled-components/native';
import { SearchTrandingReturn } from '/lib/api/CoinGeckoReturnType';
import { useAppSelector } from '/hooks/useRedux';

type DefaultView = {
  data?: SearchTrandingReturn;
}
const SearchDefaultView = ({ data }: DefaultView) => {


  const { recentSearches } = useAppSelector(state => state.baseSettingReducer);
  return (
    <Container>
      <RecentSearchesContainer
        horizontal
      >

      </RecentSearchesContainer>
    </Container>
  )
}

export default SearchDefaultView;


const Container = styled.View`
`

const RecentSearchesContainer = styled.ScrollView`

`
