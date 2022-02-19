import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';

import useGlobalTheme from '/hooks/useGlobalTheme';
import type {
  SearchTrandingCoin,
  SearchCoin,
} from '/types/coinGeckoReturnType';

import SurfaceWrap from '/components/common/SurfaceWrap';
import Image from '/components/common/Image';
import Text from '/components/common/Text';
import GlobalIndicator from '/components/common/GlobalIndicator';
import Item from './Item';

const { width } = Dimensions.get('window');

type DefaultViewProps = {
  data?: SearchTrandingCoin[];
  searchesData: SearchCoin[];
  onPressItem: (id: string, symbol: string) => void;
};

type SearchesItemProps = {
  item: SearchCoin;
  onPressItem: (id: string, symbol: string) => void;
};

const SearchesEmptyView = () => {
  const { t } = useTranslation();

  return (
    <SearchesEmptyContainer>
      <Text fontML bold>
        {t(`search.there are no recent searches`)}
      </Text>
    </SearchesEmptyContainer>
  );
};

const SearchesItem = ({ item, onPressItem }: SearchesItemProps) => {
  return (
    <SearchesItemContainer
      onPress={() => onPressItem(item.id, item.symbol)}
      activeOpacity={0.8}
    >
      <Image uri={item.large} width={30} height={30} borderRedius="m" />
      <Text
        fontML
        bold
        color100
        numberOfLines={1}
        ellipsizeMode="tail"
        margin="8px 0 0 0"
      >
        {item.name}
      </Text>
      <Text
        fontM
        bold
        numberOfLines={1}
        ellipsizeMode="tail"
        margin="2px 0 0 0"
      >
        {item.symbol}
      </Text>
    </SearchesItemContainer>
  );
};

const DefaultView = ({ data, searchesData, onPressItem }: DefaultViewProps) => {
  const { t } = useTranslation();
  const { theme } = useGlobalTheme();

  return (
    <Container>
      <SurfaceWrap
        title={t('search.recent searches')}
        marginTopZero
        parentPaddingZero
      >
        {searchesData.length === 0 ? (
          <SearchesEmptyView />
        ) : (
          <SearchesScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: parseInt(theme.content.spacing, 10),
            }}
          >
            {data ? (
              searchesData.map(coin => (
                <SearchesItem
                  key={coin.id + coin.name}
                  item={coin}
                  onPressItem={onPressItem}
                />
              ))
            ) : (
              <SearchesLoadingView>
                <GlobalIndicator transparent isLoaded={false} size="large" />
              </SearchesLoadingView>
            )}
          </SearchesScrollView>
        )}
      </SurfaceWrap>
      <SurfaceWrap title={t('search.trending search')} parentPaddingZero>
        {data?.map((coin, index) => {
          const { item } = coin;

          return (
            <Item
              key={item.coin_id}
              index={index}
              item={item}
              onPressItem={() => onPressItem(item.id, item.symbol)}
            />
          );
        })}
      </SurfaceWrap>
    </Container>
  );
};

export default DefaultView;

const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.base.background[100]};
`;

const SearchesScrollView = styled.ScrollView``;

const SearchesEmptyContainer = styled.View`
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const SearchesLoadingView = styled.View`
  width: ${({ theme }) => width - parseInt(theme.content.spacing, 10) * 2}px;
  height: 110px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const SearchesItemContainer = styled.TouchableOpacity`
  width: 120px;
  height: 110px;
  margin-right: 10px;
  background-color: ${({ theme }) => theme.base.background[300]};
  border-radius: ${({ theme }) => theme.border.ml};
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;
