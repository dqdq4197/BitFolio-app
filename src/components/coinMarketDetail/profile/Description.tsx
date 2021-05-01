import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import Text from '/components/common/Text';
import Image from '/components/common/Image';
import HorizontalLine from '/components/common/HorizontalLine';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { MaterialIcons } from '@expo/vector-icons';


type DescriptionProps = {
  localization: string,
  symbol: string,
  content: string,
}
const Description = ({ localization, symbol, content }: DescriptionProps) => {
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  const theme = useGlobalTheme();

  const handleShowMorePress = () => {
    setIsShow((prev) => !prev);
  }
  return (
    <Container>
      <ContentWrap>
        <NameWrap>
          <Text fontL color100 bold margin="0 10px 0 0">
            { localization }
          </Text>
          <Text fontL color100 bold>
            ({ symbol.toUpperCase() })
          </Text>
        </NameWrap>
        <Text fontML numberOfLines={isShow ? undefined : 5} lineHeight={22}>
          { content }
        </Text>
      </ContentWrap>
      <HorizontalLine />
      <ShowMore>
        <ShowMoreButton 
          onPress={handleShowMorePress}
          activeOpacity={0.8}
          underlayColor={theme.base.background[200]}
          hitSlop={{ 
            left: 100,
            right: 100,
            top: 30,
            bottom: 30
          }}
        >
          <ShowMoreText>
            <Text fontL>
              { isShow 
                ? t('coinDetail.Read less') 
                : t('coinDetail.Read more')
              }
            </Text>
            <MaterialIcons 
              name={isShow ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
              size={24} 
              color={theme.base.text[200]} 
            />
          </ShowMoreText>
        </ShowMoreButton>
      </ShowMore>
    </Container>
  )
}

export default Description;

const Container = styled.View`
  background-color:${({ theme }) => theme.base.background.surface};
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
  height: 50px;
  align-items: center;
  justify-content: center;
`

const ShowMoreButton = styled.TouchableHighlight`
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 35px;
  border-radius: ${({ theme }) => theme.border.s};
`

const ShowMoreText = styled.View`
  flex-direction: row;
  align-items: center;
`