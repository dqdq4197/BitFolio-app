import React, { useState } from 'react';
import { Dimensions, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { fromUnixTime, formatDistance } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';
import * as WebBrowser from 'expo-web-browser';
import translate from 'translate-google-api';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NewsData } from '/lib/api/CryptoCompareReturnType';
import { LANGUAGES } from '/lib/constant';
import useLocales from '/hooks/useLocales';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Text from '/components/common/Text';
import Image from '/components/common/Image';
import GlobalIndicator from '/components/common/GlobalIndicator';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = 60;
type ItemProps = {
  item: NewsData;
  currentCategory: string | null;
}
const Item = ({ item, currentCategory }: ItemProps) => {
  const { t } = useTranslation();
  const { theme } = useGlobalTheme();
  const { language, getDeviceLanguage } = useLocales();
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState<string>(item.body);
  const [didTranslate, setDidTranslate] = useState(false);
  const [translateLoading, setTranslateLoading] = useState(false);
  const deviceLanguage = getDeviceLanguage();

  const handleItemPress = () => {
    return WebBrowser.openBrowserAsync(item.url, {
      toolbarColor: theme.base.background.surface,
      enableBarCollapsing: true
    })
  }

  const handleTranslatePress = () => {
    if(!didTranslate) {
      setTranslateLoading(true);
      const translateTitle = translate(item.title, {
        tld: "com",
        to: deviceLanguage,
      });
      const translateContent = translate(item.body, {
        tld: "com",
        to: deviceLanguage,
      });
  
      Promise.all([translateTitle, translateContent])
      .then(res => {
        setTitle(res[0][0]);
        setContent(res[1][0]);
        setDidTranslate(true);
        setTranslateLoading(false);
      })
      .catch(e => console.log('Error: google translate', e));
    } else {
      setTitle(item.title);
      setContent(item.body);
      setDidTranslate(false);
    }
  }

  return (
    <Container 
      activeOpacity={0.6}
      onPress={handleItemPress}
      underlayColor={ theme.base.background[300] }
    >
      <>
        { translateLoading && (
          <GlobalIndicator 
            isLoaded={false}
            size="small"
            transparent
          />
        ) }
        <Text fontS>
          { formatDistance( 
              fromUnixTime(item.published_on), new Date(),
              { addSuffix: true, locale: language === 'ko' ? ko : enUS },
            )
          } ∙ { item.source }
        </Text>
        <FlexBox>
          <TitleWrap>
            <Text fontL color100 bold margin="0 10px 0 0">
              { title }        
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
                  ? <Text primaryColor fontXS bold>
                      { category }
                    </Text>
                  : <Text color100 fontXS bold>
                      { category }
                    </Text>
                }

              </CategoryWrap>
            )
          }) }
        </CategoriesWrap>
        <Text fontML numberOfLines={5} margin="10px 0 0 0">
          { content }        
        </Text>
        <TranslateButton 
          activeOpacity={0.6}
          onPress={handleTranslatePress}
          hitSlop={{ top: 10, bottom: 25, left: 10, right: 40 }}
        >
          <MaterialCommunityIcons name="google-translate" size={16} color={ theme.base.text[200] } />
          <Text margin="0 0 0 3px" fontS>
            { !didTranslate 
              ? t(`news.translate to n`, { 
                n: deviceLanguage === 'ko' 
                  ? '한국어' 
                  : LANGUAGES[deviceLanguage] === undefined 
                    ? deviceLanguage
                    : LANGUAGES[deviceLanguage]
              }) 
              : t(`news.see original`)
            }
          </Text>
        </TranslateButton>
      </>
    </Container>
  )
}

export default Item;

const Container = styled.TouchableHighlight`
  width: ${ width }px;
  padding: ${({ theme }) => theme.content.spacing};
`

const FlexBox = styled.View`
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-between;
`
const TitleWrap = styled.View`
  // 10 => margin-right value of title text
  width: ${({ theme }) => width - parseInt(theme.content.spacing) * 2 - IMAGE_SIZE - 10}px;
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

const TranslateButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${({ theme }) => theme.base.background[300]};
  border-radius: ${({ theme }) => theme.border.m};
  margin-top: 10px;
  padding: 3px 8px;
  align-items: center;
  justify-content: center;
  align-self: baseline;
`

const Indicator = styled.View`
  position: absolute;
  width: ${ width }px; 
  flex: 1;
  height: 100px;
  align-items: center;
  justify-content: center;
  background-color: white;
`