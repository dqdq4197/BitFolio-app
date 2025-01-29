/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-restricted-syntax */
/* eslint-disable default-case */
import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import * as WebBrowser from 'expo-web-browser'
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons'

import useGlobalTheme from '/hooks/useGlobalTheme'

import SurfaceWrap from '/components/common/SurfaceWrap'
import Text from '/components/common/Text'
import HorizontalLine from '/components/common/HorizontalLine'

const TWITTER_PREFIX = 'https://twitter.com/'
const FACEBOOK_PREFIX = 'https://www.facebook.com/'

type RowComponentProps = {
  url: string
  title: string
  icon: React.ReactNode
  color: string
}

type LinkProps = {
  websites: string[]
  explorers: string[]
  officialForums: string[]
  reddit: string
  githubs: string[]
  twitterScreenName: string
  facebookUsername: string
}

const RowComponent = ({ url, title, icon, color }: RowComponentProps) => {
  const { theme } = useGlobalTheme()
  return (
    <Row
      onPress={() => {
        WebBrowser.openBrowserAsync(url, {
          toolbarColor: theme.base.background.surface,
          enableBarCollapsing: true,
        })
      }}
      underlayColor={theme.base.background[300]}
    >
      <>
        <TitleWrap>
          {icon}
          <Text fontML margin="0 0 0 20px">
            {title}
          </Text>
        </TitleWrap>
        <MaterialIcons name="arrow-forward-ios" size={20} color={color} />
      </>
    </Row>
  )
}

const Link = (props: LinkProps) => {
  // telegram, explorers 추가 하기
  const { t } = useTranslation()
  const { theme } = useGlobalTheme()
  const color = theme.base.text[200]

  const renderLink = useCallback(() => {
    const rows = []
    for (const [key, value] of Object.entries(props)) {
      switch (key) {
        case 'websites':
          if (value[0])
            rows.push({
              url: value[0],
              title: t('coinDetail.Website'),
              icon: (
                <MaterialCommunityIcons name="web" size={20} color={color} />
              ),
            })
          break
        case 'githubs':
          if (value[0])
            rows.push({
              url: value[0],
              title: t('coinDetail.Source code'),
              icon: <Entypo name="code" size={20} color={color} />,
            })
          break
        case 'officialForums':
          if (value[0])
            rows.push({
              url: value[0],
              title: t('coinDetail.Official Forum'),
              icon: (
                <MaterialCommunityIcons name="forum" size={20} color={color} />
              ),
            })
          break
        case 'facebookUsername':
          if (value)
            rows.push({
              url: `${FACEBOOK_PREFIX}${value}`,
              title: t('coinDetail.Facebook'),
              icon: <MaterialIcons name="facebook" size={20} color={color} />,
            })
          break
        case 'twitterScreenName':
          if (value)
            rows.push({
              url: `${TWITTER_PREFIX}${value}`,
              title: t('coinDetail.Twitter'),
              icon: (
                <MaterialCommunityIcons
                  name="twitter"
                  size={20}
                  color={color}
                />
              ),
            })
          break
        case 'reddit':
          if (value)
            rows.push({
              url: value as string,
              title: t('coinDetail.Reddit'),
              icon: (
                <MaterialCommunityIcons name="reddit" size={20} color={color} />
              ),
            })
          break
      }
    }

    return rows
  }, [color, props, t])

  return (
    <SurfaceWrap
      title={
        <>
          <Text fontL color100 bold margin="0 10px 0 0">
            {t('coinDetail.Link')}
          </Text>
          <Feather
            name="external-link"
            size={20}
            color={theme.base.text[100]}
          />
        </>
      }
      parentPaddingZero
    >
      <HorizontalLine fullWidth />
      {renderLink().map((row) => (
        <RowWrap key={row.title}>
          <RowComponent
            url={row.url}
            title={row.title}
            icon={row.icon}
            color={color}
          />
          <HorizontalLine />
        </RowWrap>
      ))}
    </SurfaceWrap>
  )
}

export default Link

const RowWrap = styled.View``

const Row = styled.TouchableHighlight`
  height: 55px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
`

const TitleWrap = styled.View`
  flex-direction: row;
`
