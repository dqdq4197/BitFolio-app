import React from 'react';
import { Dimensions, View } from 'react-native';
import styled from 'styled-components/native';
import fromUnixTime from 'date-fns/fromUnixTime';
import ko from "date-fns/locale/ko"
import us from "date-fns/locale/en-US"
import formatDistance from 'date-fns/formatDistance'
import * as WebBrowser from 'expo-web-browser';
import { NewsData } from '/lib/api/CryptoCompareReturnType';
import Text from '/components/common/Text';
import Image from '/components/common/Image';
import useLocales from '/hooks/useLocales';
import useGlobalTheme from '/hooks/useGlobalTheme';


const { width } = Dimensions.get('window');
const IMAGE_SIZE = 60;
type ItemProps = {
  item: NewsData;
  currentCategory: string;
}
const Item = ({ item, currentCategory }: ItemProps) => {
  const theme = useGlobalTheme();
  const { language } = useLocales();

  
  return (
    <Container 
      activeOpacity={0.6}
      onLongPress={() => WebBrowser.openBrowserAsync(item.url, {
        toolbarColor: theme.base.background.surface,
        enableBarCollapsing: true
      })}
    >
      <Text fontS>
        { formatDistance( 
            fromUnixTime(item.published_on), new Date(),
            { addSuffix: true, locale: language === 'ko' ? ko : us },
          )
        } ∙ { item.source }
      </Text>
      <FlexBox>
        <TitleWrap>
          <Text fontL color100 bold margin="0 10px 0 0">
            { item.title }        
          </Text>
        </TitleWrap>
        <Image 
          uri={item.imageurl} 
          width={IMAGE_SIZE} 
          height={IMAGE_SIZE}
          borderRedius='m'
        />
      </FlexBox>
      <CategoriesWrap>
        { item.categories.split('|').map(category => {
          return (
            <CategoryWrap key={category}>
              { category.toLowerCase() === currentCategory 
                ? <Text primaryColor fontXS>
                    { category }
                  </Text>
                : <Text color100 fontXS>
                    { category }
                  </Text>
              }
              
            </CategoryWrap>
          )
        }) }
      </CategoriesWrap>
      <Text fontML numberOfLines={5} margin="10px 0 0 0">
        { item.body }        
      </Text>
    </Container>
  )
}

export default Item;

const Container = styled.TouchableOpacity`
  width: ${width}px;
  padding: ${({ theme }) => theme.content.surfacePadding};
`

const FlexBox = styled.View`
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-between;
`
const TitleWrap = styled.View`
  // 10 => margin-right value of title text
  width: ${({ theme }) => width - parseInt(theme.content.spacing) * 2 - IMAGE_SIZE - 10}px
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