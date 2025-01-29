import React, { useState, useEffect } from 'react'
import { LayoutAnimation, UIManager, Platform } from 'react-native'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import * as WebBrowser from 'expo-web-browser'
import { MaterialIcons } from '@expo/vector-icons'

import useGlobalTheme from '/hooks/useGlobalTheme'

import Text from '/components/common/Text'
import Image from '/components/common/Image'
import HorizontalLine from '/components/common/HorizontalLine'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

type DescriptionProps = {
  localization: string
  symbol: string
  content: string
  imageSrc: string
}

const Description = ({
  localization,
  symbol,
  content,
  imageSrc,
}: DescriptionProps) => {
  const { t } = useTranslation()
  const [isShow, setIsShow] = useState(false)
  const [updatedContent, setUpdatedContent] = useState<
    (string | JSX.Element)[]
  >([])
  const { theme } = useGlobalTheme()

  const handleShowMorePress = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, 'easeInEaseOut', 'opacity')
    )
    setIsShow((prev) => !prev)
  }

  useEffect(() => {
    const regExp = new RegExp(/<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/, 'g')
    const match = content.split(regExp)
    const replacedText = []
    for (let i = 0; i < match.length; i += 1) {
      const href = match[i].match(/href=(["'])(.*?)\1/)
      if (href) {
        i += 1
        replacedText.push(
          <LinkText
            key={i.toString()}
            onPress={() => {
              if (href)
                WebBrowser.openBrowserAsync(href[2], {
                  toolbarColor: theme.base.background.surface,
                  enableBarCollapsing: true,
                })
            }}
          >
            <Text bold primaryColor>
              {match[i]}
            </Text>
          </LinkText>
        )
      } else if (match[i]) {
        replacedText.push(match[i])
      }
    }
    setUpdatedContent(replacedText)
  }, [content, theme])

  return (
    <Container>
      <ContentWrap>
        <NameWrap>
          <Image uri={imageSrc} width={30} height={30} />
          <Text fontL color100 bold margin="0 10px 0 10px">
            {localization}
          </Text>
          <Text fontL color100 bold>
            ({symbol.toUpperCase()})
          </Text>
        </NameWrap>
        <Text fontML numberOfLines={isShow ? undefined : 5} lineHeight={22}>
          {updatedContent.length > 0
            ? updatedContent
            : t('coinDetail.no information available')}
        </Text>
      </ContentWrap>
      <HorizontalLine />
      {updatedContent.length > 0 && (
        <ShowMore>
          <ShowMoreButton
            onPress={handleShowMorePress}
            activeOpacity={0.8}
            underlayColor={theme.base.background[200]}
            hitSlop={{
              left: 100,
              right: 100,
              top: 30,
              bottom: 30,
            }}
          >
            <ShowMoreText>
              <Text fontML>
                {isShow ? t('coinDetail.Read less') : t('coinDetail.Read more')}
              </Text>
              <MaterialIcons
                name={isShow ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={24}
                color={theme.base.text[200]}
              />
            </ShowMoreText>
          </ShowMoreButton>
        </ShowMore>
      )}
    </Container>
  )
}

export default Description

const Container = styled.View`
  background-color: ${({ theme }) => theme.base.background.surface};
  padding: 20px ${({ theme }) => theme.content.spacing} 0;
`

const ContentWrap = styled.View`
  padding-bottom: 20px;
`

const NameWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`

const ShowMore = styled.View`
  height: 45px;
  align-items: center;
  justify-content: center;
`

const ShowMoreButton = styled.TouchableHighlight`
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 35px;
  border-radius: ${({ theme }) => theme.border.s};
`

const ShowMoreText = styled.View`
  flex-direction: row;
  align-items: center;
`

const LinkText = styled.TouchableOpacity``
