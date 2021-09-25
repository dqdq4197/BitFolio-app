import React, { useState, useCallback } from 'react';
import { Animated, LayoutAnimation, Dimensions, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import useNewsArticles from '/hooks/useNewsArticles';
import { useAppSelector, useAppDispatch } from '/hooks/useRedux';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import { NewsStateType, changeSortOrder, SortOrderType } from '/store/news';
import { NewsData } from '/lib/api/CryptoCompareReturnType'; 
import ScrollView from '/components/common/ScrollView';
import Text from '/components/common/Text';
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import Item from './Item';
import FiltersBar from './FiltersBar';
import ItemSkeleton from '../skeletonPlaceholder/news/Item';

const { width, height } = Dimensions.get('window');

interface TitleProps extends Pick<NewsStateType, 'sortOrder'> {}

const Title = ({ sortOrder }: TitleProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleSortOrderChange = (order: SortOrderType) => {
    dispatch(changeSortOrder(order));
  }

  return (
    <TitleWrap>
      <Text
        fontXL 
        color100 
        heavy 
        margin="0 15px 0 0"
      >
        { sortOrder === 'latest' 
          ? t(`news.latest`)
          : t(`news.popular`)
        }
      </Text>
      <Text 
        onPress={() => handleSortOrderChange(sortOrder === 'latest' ? 'popular' : 'latest')}
        fontL 
        heavy
      >
        { sortOrder === 'latest' 
          ? t(`news.popular`)
          : t(`news.latest`)
        }
      </Text>
    </TitleWrap>
  )
}
const Overview = () => {
  const { t } = useTranslation();
  const { categories, feeds, sortOrder } = useAppSelector(state => state.newsReducer);
  const { scrollY } = useAnimatedHeaderTitle({ 
    title: t(`news.${sortOrder}`) + ' ' + t(`common.news`), 
    triggerPoint: 30 
  });
  const { data, mutate, isValidating } = useNewsArticles({ 
    categories,
    sortOrder,
    feeds,
    suspense: false
  });
  const [newsData, setNewsData] = useState<NewsData[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);  

  React.useEffect(() => {
    if(data) {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          300,
          LayoutAnimation.Types.easeIn ,
          LayoutAnimation.Properties.opacity
        )
      );
      setNewsData(data[0].Data);
    }
  }, [data])

  const handleScroll = Animated.event(
    [ { nativeEvent: { contentOffset: { y: scrollY } } } ], 
    { useNativeDriver: false }
  )

  const handleRefresh = useCallback(async() => {
    setRefreshing(true);
    await mutate()
    setRefreshing(false);
  }, []);

  return (
    <>
      { isValidating && (
        <IndicatorWrap>
          <ActivityIndicator 
            size="large"
          />
        </IndicatorWrap>
      ) }
      <Container
        as={ Animated.ScrollView }
        onScroll={ handleScroll }
        stickyHeaderIndices={[1]}
        refreshControl={
          <CustomRefreshControl
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        }
      >
        <Title sortOrder={sortOrder}/>
        <FiltersBar />
        { newsData 
          ? newsData.map(item => {
              return (
                <Item 
                  key={item.id}
                  item={item}
                  currentCategory={null}
                />
              )
            })
          : <ItemSkeleton />
        }
      </Container>
    </>
  )
}

export default Overview;

const Container = styled(ScrollView)`
  background-color: ${({ theme }) => theme.base.background.surface};
`
const TitleWrap = styled.View`
  flex-direction: row;
  align-items: flex-end;
  padding: ${({ theme }) => `${theme.content.blankSpacing} ${theme.content.spacing}`};
`

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
`