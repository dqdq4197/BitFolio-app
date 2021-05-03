import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import * as WebBrowser from 'expo-web-browser';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Text from '/components/common/Text';
import HorizontalLine from '/components/common/HorizontalLine';
import useGlobalTheme from '/hooks/useGlobalTheme';

const TWITTER_PREFIX = 'https://twitter.com/';
const FACEBOOK_PREFIX = 'https://www.facebook.com/'

type RowComponentProps = {
  url: string, 
  title: string, 
  icon: React.ReactNode,
  color: string,
}

type LinkProps = {
  websites: string[],
  explorers: string[],
  officialForums: string[],
  reddit: string,
  githubs: string[],
  twitterScreenName: string,
  facebookUsername: string,
}

const RowComponent = ({ url, title, icon, color }: RowComponentProps) => {
  const theme = useGlobalTheme();
  return (
    <Row onPress={() => {
      WebBrowser.openBrowserAsync(url, {
        toolbarColor: theme.base.background.surface,
        enableBarCollapsing: true
      })
    }}>
      <TitleWrap>
        { icon }
        <Text fontL margin="0 0 0 20px">
          { title }
        </Text>
      </TitleWrap>
      <MaterialIcons 
        name="arrow-forward-ios" 
        size={24} 
        color={color} 
      />
    </Row>
  )
}


const Link = ( props : LinkProps) => {
  // telegram, explorers 추가 하기
  const { t } = useTranslation();
  const theme = useGlobalTheme();
  const color = theme.base.text[200];

  const renderLink = useCallback(() => {
    let rows = [];
    for(let [key, value] of Object.entries(props)) {
      switch(key) {
        case 'websites': 
          if(value[0])
            rows.push({
              url: value[0],
              title: t('coinDetail.Website'),
              icon: <MaterialCommunityIcons name="web" size={24} color={color} />
            })
          break;
        case 'githubs':
          if(value[0])
            rows.push({
              url: value[0],
              title: t('coinDetail.Source code'), 
              icon: <Entypo name="code" size={24} color={color} />
            })
          break;
        case 'officialForums':
          if(value[0])
            rows.push({
              url: value[0],
              title: t('coinDetail.Official Forum'), 
              icon: <MaterialCommunityIcons name="forum" size={24} color={color} />
            })
          break;
        case 'facebookUsername':
          if(value)
            rows.push({
              url: `${FACEBOOK_PREFIX}${value}`,
              title: t('coinDetail.Facebook'), 
              icon: <MaterialIcons name="facebook" size={24} color={color} />
            })
            break;
        case 'twitterScreenName':
          if(value)
            rows.push({
              url: `${TWITTER_PREFIX}${value}`,
              title: t('coinDetail.Twitter'), 
              icon: <MaterialCommunityIcons name="twitter" size={24} color={color} />
            })
          break;
        case 'reddit':
          if(value)
            rows.push({
              url: value as string,
              title: t('coinDetail.Reddit'), 
              icon: <MaterialCommunityIcons name="reddit" size={24} color={color} />
            })
          break;
      }
    }

    return rows
  }, [])

  return (
    <Container>
      <ChapterTitle>
        <Text fontL color100 bold margin="0 10px 0 0">
          { t('coinDetail.Link') }
        </Text>
        <Feather name="external-link" size={20} color={theme.base.text[100]} />
      </ChapterTitle>
      <HorizontalLine fullWidth/>
      { 
        renderLink().map((row, index) => (
          <RowWrap key={row.title}>
            { index !== 0 && <HorizontalLine /> }
            <RowComponent
              url={row.url}
              title={row.title}
              icon={row.icon}
              color={color}
            />
          </RowWrap>
        ))
      }
    </Container>
  )
}

export default Link;

const Container = styled.View`
  background-color:${({ theme }) => theme.base.background.surface};
  margin-top: ${({ theme }) => theme.content.blankSpacing};
  padding:0 ${({ theme }) => theme.content.spacing};
`
const ChapterTitle = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
`
const RowWrap = styled.View``
const Row = styled.TouchableOpacity`
  height: 55px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

`

const TitleWrap = styled.View`
  flex-direction: row;
`