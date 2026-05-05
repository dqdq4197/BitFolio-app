import { formatDistance, fromUnixTime } from 'date-fns'
import { enUS, ko } from 'date-fns/locale'
import * as WebBrowser from 'expo-web-browser'
import { Dimensions, View } from 'react-native'
import styled from 'styled-components/native'

import useGlobalTheme from '@/hooks/use-global-theme'
import useLocales from '@/hooks/use-locales'
import type { NewsData } from '@/types/crypto-compare-return-type'

import Image from '@/components/common/image'
import Text from '@/components/common/text'

const { width } = Dimensions.get('window')
const IMAGE_SIZE = 60

type ItemProps = {
  item: NewsData
  currentCategory: string | null
}

const Item = ({ item, currentCategory }: ItemProps) => {
  const { theme } = useGlobalTheme()
  const { language } = useLocales()

  const handleItemPress = () => {
    return WebBrowser.openBrowserAsync(item.url, {
      toolbarColor: theme.base.background.surface,
      enableBarCollapsing: true,
    })
  }

  return (
    <Container
      activeOpacity={0.6}
      onPress={handleItemPress}
      underlayColor={theme.base.background[300]}
    >
      <View>
        <Text fontS>
          {`${formatDistance(fromUnixTime(item.published_on), new Date(), {
            addSuffix: true,
            locale: language === 'ko' ? ko : enUS,
          })} ∙ ${item.source}`}
        </Text>
        <FlexBox>
          <TitleWrap>
            <Text fontL color100 bold margin="0 10px 0 0">
              {item.title}
            </Text>
          </TitleWrap>
          <Image
            uri={item.imageurl}
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            borderRedius="m"
          />
        </FlexBox>
        <CategoriesWrap>
          {item.categories.split('|').map(category => {
            return (
              <CategoryWrap key={category}>
                {category.toLowerCase() === currentCategory ? (
                  <Text primaryColor fontXS bold>
                    {category}
                  </Text>
                ) : (
                  <Text color100 fontXS bold>
                    {category}
                  </Text>
                )}
              </CategoryWrap>
            )
          })}
        </CategoriesWrap>
        <Text fontML numberOfLines={5} margin="10px 0 0 0">
          {item.body}
        </Text>
      </View>
    </Container>
  )
}

export default Item

const Container = styled.TouchableHighlight`
  width: ${width}px;
  padding: ${({ theme }) => theme.content.spacing};
`

const FlexBox = styled.View`
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-between;
`

const TitleWrap = styled.View`
  // 10 => margin-right value of title text
  width: ${({ theme }) =>
    width - parseInt(theme.content.spacing, 10) * 2 - IMAGE_SIZE - 10}px;
`

const CategoriesWrap = styled.View`
  flex-direction: row;
  margin-top: 5px;
`

const CategoryWrap = styled.View`
  padding: 3px 5px;
  border-radius: ${({ theme }) => theme.border.s};
  background-color: ${({ theme }) => theme.base.background[300]};
  margin-right: 5px;
`
