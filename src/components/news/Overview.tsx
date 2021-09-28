import React, { useState, useCallback } from 'react';
import { 
  Animated, 
  LayoutAnimation, 
  ActivityIndicator,
  Platform,
  UIManager,
  FlatList
} from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import useNewsArticles from '/hooks/useNewsArticles';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppSelector, useAppDispatch } from '/hooks/useRedux';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import { NewsStateType, changeSortOrder, SortOrderType } from '/store/news';
import { NewsData } from '/lib/api/CryptoCompareReturnType'; 
import Text from '/components/common/Text';
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import ItemSkeleton from '/components/skeletonPlaceholder/news/Item';
import SurfaceTopView from '/components/common/SurfaceTopView';
import Item from './Item';
import FiltersBar from './FiltersBar';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface TitleProps extends Pick<NewsStateType, 'sortOrder'> {
  scrollY: Animated.Value
  onResetLTs: () => void
}

const Title = ({ sortOrder, scrollY, onResetLTs }: TitleProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleSortOrderChange = (order: SortOrderType) => {
    Haptics.impactAsync();
    onResetLTs();
    dispatch(changeSortOrder(order));
  }

  return (
    <TitleWrap
      as={Animated.View}
      style={{
        height: scrollY.interpolate({
          inputRange: [0, 100],
          outputRange: [40, 0],
          extrapolate: 'clamp'
        })
      }}
    >
      <TitleTextWrap>
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
      </TitleTextWrap>
    </TitleWrap>
  )
}
const Overview = () => {
  const { t } = useTranslation();
  const { theme } = useGlobalTheme();
  const { categories, feeds, sortOrder } = useAppSelector(state => state.newsReducer);
  const { scrollY } = useAnimatedHeaderTitle({ 
    title: t(`news.${sortOrder}`) + ' ' + t(`common.news`), 
    triggerPoint: 60 
  });
  const [newsData, setNewsData] = useState<NewsData[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);  
  const [lTs, setLTs] = useState<number | undefined>(undefined);
  const { data, mutate, isValidating } = useNewsArticles({ 
    lTs,
    categories,
    sortOrder,
    feeds,
    suspense: false
  });

  React.useEffect(() => {
    if(data) {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          300,
          LayoutAnimation.Types.easeIn ,
          LayoutAnimation.Properties.opacity
        )
      );
        
      if(lTs === undefined || !newsData) {
        setNewsData(data[0].Data);
      } else {
        // infinite loading ...
        if(newsData.slice(-1)[0].published_on === data[0].Data.slice(-1)[0].published_on) return ;

        setNewsData(prevState => prevState ? [...prevState, ...data[0].Data] : null);
      }
    }
  }, [data])

  const handleScroll = Animated.event(
    [ { nativeEvent: { contentOffset: { y: scrollY } } } ], 
    { useNativeDriver: false }
  )

  const handleRefresh = useCallback(async() => {
    setRefreshing(true);
    if(lTs === undefined) {
      await mutate()
    } else {
      setLTs(undefined);
    }
    setRefreshing(false);
  }, [refreshing, lTs]);

  const handleEndReached = () => {
    if(!newsData || sortOrder === 'popular') return ;
    
    setLTs(newsData.slice(-1)[0].published_on);
  }
  
  const onResetLTs = () => {
    setLTs(undefined);
  }

  return (
    <>
      { isValidating && newsData && (
        <IndicatorWrap>
          <ActivityIndicator 
            size="large"
          />
        </IndicatorWrap>
      ) }
      <Title 
        sortOrder={sortOrder} 
        scrollY={scrollY}
        onResetLTs={onResetLTs}
      />
      <FlatList 
        data={newsData}
        onScroll={ handleScroll }
        ListHeaderComponent={
          <>
            <SurfaceTopView />
            <FiltersBar />
          </>
        }
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ backgroundColor: theme.base.background.surface }}
        refreshControl={
          <CustomRefreshControl
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        }
        ListEmptyComponent={ <ItemSkeleton /> }
        renderItem={
          ({ item }) => {
            return (
              <Item 
                key={item.id}
                item={item}
                currentCategory={null}
              />
            )
          }
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </>
  )
}

export default Overview;

const TitleWrap = styled.View`
  padding: ${({ theme }) => `0 ${theme.content.spacing}`};
  background-color: ${({ theme }) => theme.base.background.surface};
`

const TitleTextWrap = styled.View`
  flex-direction: row;
  align-items: flex-end;
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