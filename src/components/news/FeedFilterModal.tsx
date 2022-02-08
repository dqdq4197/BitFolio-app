import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native'
import { Octicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useAppSelector, useAppDispatch } from '/hooks/useRedux';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { ALL_NEWS_FEEDS, changeFeeds } from '/store/news';
import { FeedAndCategoryData } from '/types/CryptoCompareReturnType';

import ScrollCloseModal from '/components/common/ScrollCloseModal';
import AsyncButton from '/components/common/AsyncButton';
import Text from '/components/common/Text';
import Image from '/components/common/Image';

interface ModalType extends Pick<FeedAndCategoryData, 'Feeds'> {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const FeedFilterModal = ({
  visible,
  setVisible,
  Feeds: FeedsData
}: ModalType) => {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme } = useGlobalTheme();
  const { feeds } = useAppSelector(state => state.newsReducer);
  const [feedsTemp, setFeedsTemp] = useState(feeds);

  const handleSavePress = useCallback(() => {
    dispatch(changeFeeds(feedsTemp));
    setVisible(false);
  }, [feedsTemp])

  const handleRowPress = (key: string) => {
    if (feedsTemp === ALL_NEWS_FEEDS) {
      if (key === ALL_NEWS_FEEDS) return;

      setFeedsTemp([key]);
    } else {
      if (key === ALL_NEWS_FEEDS) {
        setFeedsTemp(ALL_NEWS_FEEDS);
        return;
      }
      const isContain = feedsTemp.findIndex(feed => feed === key);

      if (isContain === -1) {
        setFeedsTemp(prevState => [...prevState, key]);
      } else {
        if (feedsTemp.length === 1) {
          setFeedsTemp(ALL_NEWS_FEEDS);
        } else {
          setFeedsTemp(prevState => (prevState as string[]).filter(category => category !== key));
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
            {t(`news.feeds`)}
          </Text>
        </TitleWrap>
      }
      footerComponent={
        <AsyncButton
          text={t(`news.save feeds`)}
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
          onPress={() => handleRowPress(ALL_NEWS_FEEDS)}
          isActive={feedsTemp === ALL_NEWS_FEEDS}
        >
          <>
            <Text color100 heavy margin="0 0 0 10px">
              {t(`news.all news feeds`)}
            </Text>
            <Octicons
              name="check"
              size={24}
              color={
                feedsTemp === ALL_NEWS_FEEDS
                  ? theme.base.primaryColor
                  : 'transparent'
              }
            />
          </>
        </Row>
        {FeedsData.map(feed => {
          return (
            <Row
              key={feed.key}
              underlayColor={theme.base.underlayColor[200]}
              onPress={() => handleRowPress(feed.key)}
              isActive={feedsTemp !== ALL_NEWS_FEEDS}
            >
              <>
                <NameWrap>
                  <Image
                    width={25}
                    height={25}
                    uri={feed.img}
                    borderRedius={'s'}
                  />
                  <Text color100 heavy margin="0 0 0 10px">
                    {feed.name}
                  </Text>
                </NameWrap>
                <Octicons
                  name="check"
                  size={24}
                  color={
                    feedsTemp !== ALL_NEWS_FEEDS && (
                      feedsTemp.findIndex(temp => temp === feed.key) !== -1
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

export default FeedFilterModal;

type RowProps = {
  isActive: boolean
}

const Container = styled.View`
  padding-bottom: 30px;
`

const TitleWrap = styled.View`
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

const NameWrap = styled.View`
  flex-direction: row;
  align-items: center;
`