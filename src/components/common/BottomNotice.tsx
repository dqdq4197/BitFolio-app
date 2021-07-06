import React from 'react';
import { Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from '/components/common/Text';
import useGlobalTheme from '/hooks/useGlobalTheme';


const { width } = Dimensions.get('window');

const BottomNotice = () => {

  const { theme } = useGlobalTheme();
  const { t } = useTranslation();


  return (
    <Container>
      <TitleWrap>
        <MaterialCommunityIcons name="information" size={19} color={theme.base.text[200]} />
        <Text fontML bold margin="0 0 0 5px">
          { t(`common.bottom notice.title`) }
        </Text>
      </TitleWrap>
      <Row>
        <BulletCol>
          <Text color300 bold fontL>
            { '\u2022' }
          </Text>
        </BulletCol>
        <TextWrap>
          <Text color300 lineHeight={18}>
            { t(`common.bottom notice.first`) }
          </Text>
        </TextWrap>
      </Row>
      <Row>
        <BulletCol>
          <Text color300 bold fontL>
            { '\u2022' }
          </Text>
        </BulletCol>
        <TextWrap>
          <Text color300 lineHeight={18}>
            { t(`common.bottom notice.second`) }
          </Text>
        </TextWrap>
      </Row>
      <Row>
        <BulletCol>
          <Text color300 bold fontL>
            { '\u2022' }
          </Text>
        </BulletCol>
        <TextWrap>
          <Text color300 lineHeight={18}>
            { t(`common.bottom notice.third`) }
          </Text>
        </TextWrap>
      </Row>
    </Container>
  )
}

export default BottomNotice;

const Container = styled.View`
  flex: 1;
  padding: 30px ${({ theme }) => theme.content.spacing};
`

const TitleWrap = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
  align-items: center;
`

const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 5px;
`
const BulletCol = styled.View`
  width: 20px;
 `

const TextWrap = styled.View`
  width: ${({ theme }) => width - parseInt(theme.content.spacing) * 2 - 20}px;
  padding-top: 3px;
`
