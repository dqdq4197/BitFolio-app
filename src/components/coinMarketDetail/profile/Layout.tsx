import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { CoinIdContext } from '/screens/coinMarket/detail';
import useCoinDetailInfoData from '/hooks/useCoinDetailData';
import useLocales from '/hooks/useLocales';
import Image from '/components/common/Image';
import Text from '/components/common/Text';
import { TAB_BAR_HEIGHT } from '/lib/constant';

const Layout = () => {
  const { t } = useTranslation();
  const coinId = useContext(CoinIdContext) as string;
  const { data } = useCoinDetailInfoData(coinId);
  const { language, currency } = useLocales();

  if(!data) return <></>

  return (
    <Container>
      {/* <Image uri={data.image.small} width={30} height={30}/> */}
      <Description>
        <Name>
          <Text fontXL margin="0 10px 0 0">
            { data.localization[language] }
          </Text>
          <Text fontXL>
            ({ data.symbol.toUpperCase() })
          </Text>
        </Name>
        <Text fontML numberOfLines={5} lineHeight={22}>
          { data.description[language] }
        </Text>
        <ShowMore>
          <Text>
            {t('title')}
          </Text>
        </ShowMore>
      </Description>
    </Container>
  )
}

export default Layout;

const Container = styled.ScrollView`
  padding: ${({ theme }) => theme.content.spacing};
  padding-bottom: ${TAB_BAR_HEIGHT}px;
`

const Name = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`
const Description = styled.View`

`

const ShowMore = styled.View`

`