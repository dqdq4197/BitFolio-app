import { useScrollToTop } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import styled from 'styled-components/native';

import useNewsArticles from '/hooks/data/useNewsArticles';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppDispatch, useAppSelector } from '/hooks/useRedux';
import {
  changeSortOrder,
  NewsStateType,
  SortOrderType,
} from '/store/slices/news';
import type { NewsData } from '/types/cryptoCompareReturnType';

import FiltersBar from './FiltersBar';
import Item from './Item';
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import SurfaceTopView from '/components/common/SurfaceTopView';
import Text from '/components/common/Text';
import { NewsArticleListSkeleton } from '/components/skeletonPlaceholder/news';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface TitleProps extends Pick<NewsStateType, 'sortOrder'> {
  scrollY: Animated.Value;
  onResetLTs: () => void;
}

const Title = ({ sortOrder, scrollY, onResetLTs }: TitleProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleSortOrderChange = (order: SortOrderType) => {
    Haptics.impactAsync();
    onResetLTs();
    dispatch(changeSortOrder(order));
  };

  return (
    <TitleWrap
      as={Animated.View}
      style={{
        height: scrollY.interpolate({
          inputRange: [0, 100],
          outputRange: [40, 0],
          extrapolate: 'clamp',
        }),
      }}
    >
      <TitleTextWrap>
        <Text fontXL color100 heavy margin="0 15px 0 0">
          {sortOrder === 'latest' ? t(`news.latest`) : t(`news.popular`)}
        </Text>
        <Text
          onPress={() =>
            handleSortOrderChange(sortOrder === 'latest' ? 'popular' : 'latest')
          }
          fontL
          heavy
        >
          {sortOrder === 'latest' ? t(`news.popular`) : t(`news.latest`)}
        </Text>
      </TitleTextWrap>
    </TitleWrap>
  );
};

const Overview = () => {
  const { t } = useTranslation();
  const { theme } = useGlobalTheme();
  const flatListRef = useRef<FlatList>(null);
  const { categories, feeds, sortOrder } = useAppSelector(
    state => state.newsReducer
  );
  const { scrollY } = useAnimatedHeaderTitle({
    title: `${t(`news.${sortOrder}`)} ${t(`common.news`)}`,
    triggerPoint: 60,
  });
  const [newsData, setNewsData] = useState<NewsData[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lTs, setLTs] = useState<number | undefined>(undefined);
  const { data, mutate, isValidating } = useNewsArticles({
    lTs,
    categories,
    sortOrder,
    feeds,
    suspense: false,
  });
  useScrollToTop(flatListRef);

  useEffect(() => {
    if (data) {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          300,
          LayoutAnimation.Types.easeIn,
          LayoutAnimation.Properties.opacity
        )
      );

      if (lTs === undefined || !newsData) {
        setNewsData(data[0].Data);
      } else {
        // infinite loading ...
        if (
          newsData.slice(-1)[0].published_on ===
          data[0].Data.slice(-1)[0].published_on
        )
          return;

        setNewsData(prevState =>
          prevState ? [...prevState, ...data[0].Data] : null
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, lTs]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    if (lTs === undefined) {
      await mutate();
    } else {
      setLTs(undefined);
    }
    setRefreshing(false);
  }, [lTs, mutate]);

  const handleEndReached = () => {
    if (!newsData || sortOrder === 'popular') return;

    setLTs(newsData.slice(-1)[0].published_on);
  };

  const onResetLTs = () => {
    setLTs(undefined);
  };

  return (
    <>
      {isValidating && newsData && (
        <IndicatorWrap>
          <ActivityIndicator size="large" />
        </IndicatorWrap>
      )}
      <Title sortOrder={sortOrder} scrollY={scrollY} onResetLTs={onResetLTs} />
      <FlatList
        ref={flatListRef}
        data={newsData}
        onScroll={handleScroll}
        ListHeaderComponent={
          <>
            <SurfaceTopView />
            <FiltersBar />
          </>
        }
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          backgroundColor: theme.base.background.surface,
        }}
        refreshControl={
          <CustomRefreshControl
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        }
        ListEmptyComponent={<NewsArticleListSkeleton />}
        renderItem={({ item }) => {
          return (
            <Item key={item.id} item={item} currentCategory={categories} />
          );
        }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </>
  );
};

export default Overview;

const TitleWrap = styled.View`
  padding: ${({ theme }) => `0 ${theme.content.spacing}`};
  background-color: ${({ theme }) => theme.base.background.surface};
`;

const TitleTextWrap = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const IndicatorWrap = styled.View`
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  transform: translateX(-30px);
  z-index: 111;
  background-color: ${({ theme }) => theme.base.background.surface};
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.border.l};
`;
