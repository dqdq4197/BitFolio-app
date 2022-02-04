import React, { useState, useMemo } from 'react';
import styled from 'styled-components/native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppSelector, useAppDispatch, shallowEqual } from '/hooks/useRedux';
import useRequest from '/hooks/useRequest';
import { ALL_NEWS_FEEDS, ALL_NEWS_CATEGORIES, resetFilters } from '/store/news';
import { Cryptocompare, http } from '/lib/api/CryptocompareClient';
import { FeedAndCategoryReturn } from '/types/CryptoCompareReturnType';

import SkeletonContainer from '/components/skeletonPlaceholder/common/Container';
import Text from '/components/common/Text';
import FeedFilterModal from './FeedFilterModal';
import CategoryFilterModal from './CategoryFilterModal';

const FiltersBar = () => {
  const { theme } = useGlobalTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { feeds, categories } = useAppSelector(state => ({
    feeds: state.newsReducer.feeds,
    categories: state.newsReducer.categories
  }), shallowEqual);
  const [feedsVisible, setFeedsVisible] = useState(false);
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const { data } = useRequest<FeedAndCategoryReturn>(
    Cryptocompare.news.feedAndCategories({}),
    http,
  );

  const activeReset = useMemo(() => {
    return feeds !== ALL_NEWS_FEEDS || categories !== ALL_NEWS_CATEGORIES;
  }, [feeds, categories])

  const handleResetPress = () => {
    if (!activeReset) return;

    dispatch(resetFilters());
  }

  const handleFeedsPress = () => {
    setFeedsVisible(true);
  }

  const handleCategoriesPress = () => {
    setCategoriesVisible(true);
  }

  if (!data) return (
    <>
      <SkeletonContainer>
        <SkeletonPlaceholder.Item height={45} alignItems="center" flexDirection="row" paddingHorizontal={parseInt(theme.content.spacing)}>
          <SkeletonPlaceholder.Item width={100} height={30} marginRight={10} borderRadius={6} />
          <SkeletonPlaceholder.Item width={50} height={30} marginRight={10} borderRadius={6} />
          <SkeletonPlaceholder.Item width={75} height={30} marginRight={10} borderRadius={6} />
        </SkeletonPlaceholder.Item>
      </SkeletonContainer>
    </>
  )

  return (
    <Container
      horizontal
    >
      <Button
        activeOpacity={0.6}
        onPress={handleResetPress}
      >
        <MaterialIcons
          name="refresh"
          size={18}
          color={
            activeReset
              ? theme.base.removeColor
              : theme.base.text[300]
          }
        />
        <CustomText
          isActive={activeReset}
          margin="0 0 0 5px"
          bold
        >
          {t(`news.reset filter`)}
        </CustomText>
      </Button>
      <Button
        activeOpacity={0.6}
        onPress={handleFeedsPress}
      >
        <FontAwesome name="filter" size={14} color={theme.base.text[100]} />
        <Text margin="0 0 0 5px" bold color100 >
          {t(`news.feeds`)}
        </Text>
      </Button>
      <Button
        activeOpacity={0.6}
        onPress={handleCategoriesPress}
      >
        <FontAwesome name="filter" size={14} color={theme.base.text[100]} />
        <Text margin="0 0 0 5px" bold color100 >
          {t(`news.categories`)}
        </Text>
      </Button>
      {feedsVisible && (
        <FeedFilterModal
          visible={feedsVisible}
          setVisible={setFeedsVisible}
          Feeds={data.Data.Feeds}
        />
      )}
      {categoriesVisible && (
        <CategoryFilterModal
          visible={categoriesVisible}
          setVisible={setCategoriesVisible}
          Categories={data.Data.Categories}
        />
      )}
    </Container>
  )
}


export default FiltersBar;

type TextProps = {
  isActive: boolean
}

const Container = styled.ScrollView`
  height: 45px;
  background-color: ${({ theme }) => theme.base.background.surface};
  padding: 5px ${({ theme }) => theme.content.spacing} 10px;
`

const CustomText = styled(Text) <TextProps>`
  color: ${({ theme, isActive }) => isActive
    ? theme.base.removeColor
    : theme.base.text[300]
  }
`

const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 30px;
  background-color: ${({ theme }) => theme.base.background[300]};
  border-radius: ${({ theme }) => theme.border.m};
  padding: 2px 6px;
  margin-right: 10px;
`