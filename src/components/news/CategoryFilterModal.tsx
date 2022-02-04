import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next';
import { Octicons } from '@expo/vector-icons';

import { useAppSelector, useAppDispatch } from '/hooks/useRedux';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { changeCategories, ALL_NEWS_CATEGORIES } from '/store/news';
import { FeedAndCategoryData } from '/types/CryptoCompareReturnType';

import ScrollCloseModal from '/components/common/ScrollCloseModal';
import AsyncButton from '/components/common/AsyncButton';
import Text from '/components/common/Text';

interface ModalType extends Pick<FeedAndCategoryData, 'Categories'> {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CategoryFilterModal = ({
  visible,
  setVisible,
  Categories: CategoriesData
}: ModalType) => {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme } = useGlobalTheme();
  const { categories } = useAppSelector(state => state.newsReducer);
  const [categoriesTemp, setCategoriesTemp] = useState(categories);

  const handleSavePress = useCallback(() => {
    dispatch(changeCategories(categoriesTemp));
    setVisible(false);
  }, [categoriesTemp])

  const handleRowPress = (key: string) => {
    if (categoriesTemp === ALL_NEWS_CATEGORIES) {
      if (key === ALL_NEWS_CATEGORIES) return;

      setCategoriesTemp([key]);
    } else {
      if (key === ALL_NEWS_CATEGORIES) {
        setCategoriesTemp(ALL_NEWS_CATEGORIES);
        return;
      }
      const isContain = categoriesTemp.findIndex(category => category === key);

      if (isContain === -1) {
        setCategoriesTemp(prevState => [...prevState, key]);
      } else {
        if (categoriesTemp.length === 1) {
          setCategoriesTemp(ALL_NEWS_CATEGORIES);
        } else {
          setCategoriesTemp(prevState => (prevState as string[]).filter(category => category !== key));
        }
      }
    }
  }

  return (
    <ScrollCloseModal
      visible={visible}
      setVisible={setVisible}
      titleComponent={
        <TitleWrap>
          <Text fontX color100 bold>
            {t(`news.categories`)}
          </Text>
        </TitleWrap>
      }
      footerComponent={
        <AsyncButton
          text={t(`news.save categories`)}
          onPress={handleSavePress}
          isDisabled={false}
          isLoading={false}
          height={45}
          borderPosition={['top']}
          fontML
          hasNotch
        />
      }
    >
      <Container>
        <Row
          underlayColor={theme.base.underlayColor[100]}
          onPress={() => handleRowPress(ALL_NEWS_CATEGORIES)}
          isActive={categoriesTemp === ALL_NEWS_CATEGORIES}
        >
          <>
            <Text color100 heavy margin="0 0 0 10px">
              {t(`news.all news categories`)}
            </Text>
            <Octicons
              name="check"
              size={24}
              color={
                categoriesTemp === ALL_NEWS_CATEGORIES
                  ? theme.base.primaryColor
                  : 'transparent'
              }
            />
          </>
        </Row>
        {CategoriesData.map(category => {
          return (
            <Row
              key={category.categoryName}
              underlayColor={theme.base.underlayColor[100]}
              onPress={() => handleRowPress(category.categoryName)}
              isActive={categoriesTemp !== ALL_NEWS_CATEGORIES}
            >
              <>
                <Text color100 heavy margin="0 0 0 10px">
                  {category.categoryName}
                </Text>
                <Octicons
                  name="check"
                  size={24}
                  color={
                    categoriesTemp !== ALL_NEWS_CATEGORIES && (
                      categoriesTemp.findIndex(temp => temp === category.categoryName) !== -1
                    )
                      ? theme.base.primaryColor
                      : 'transparent'
                  }
                />
              </>
            </Row>
          )
        })}
      </Container>
    </ScrollCloseModal>
  )
}

export default CategoryFilterModal;

type RowProps = {
  isActive: boolean
}
const Container = styled.View`
  padding-bottom: 30px;
`
const TitleWrap = styled.View`
  align-items: flex-end;
  justify-content: center;
  
`
const Row = styled.TouchableHighlight<RowProps>`
  flex-direction: row;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.content.spacing};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.base.background[300]};
  opacity: ${({ isActive }) => isActive ? 1 : 0.6};
`