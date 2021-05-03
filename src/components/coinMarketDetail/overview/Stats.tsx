import React from 'react'
import styled, { css } from 'styled-components/native';
import Text from '/components/common/Text';
import { useTranslation } from 'react-i18next';
import { convertUnits, currencySymbol } from '/lib/utils';

type StatsProps = {
  rank: number;
  marketcap: number;
  totalVolume: number,
  genesis_date: string,
  maxSupply: number,
  circulatingSupply: number,
  hashingAlgorithm: string,
  language: 'en' | 'ko'
}
const Stats = ({ 
  rank,
  marketcap,
  totalVolume,
  genesis_date,
  maxSupply,
  circulatingSupply,
  hashingAlgorithm,
  language
}: StatsProps) => {
  const { t } = useTranslation();
  console.log(circulatingSupply)
  return (
    <Container>
      <Header>
        <Text fontL color100 bold margin="0 10px 0 0">
          { t('coinDetail.stats') }
        </Text>
      </Header>
      <Table>
        <Row top>
          <Col>
            <Title>
              <Text fontML color100>
                { t('coinDetail.rank') }
              </Text>
            </Title>
            <Text fontML>
              { rank || '--' }
            </Text>
          </Col>
          <Col left>
            <Title>
              <Text fontML color100>
                { t('coinDetail.market cap') }
              </Text>
            </Title>
            <Text fontML>
              { marketcap
                ? currencySymbol(language === 'ko' ? 'krw' : 'usd') 
                  + convertUnits(marketcap, language) 
                : '--' 
              }
            </Text>
          </Col>
        </Row>
        <Row top>
          <Col>
            <Title>
              <Text fontML color100>
                { t('coinDetail.algorithm') }
              </Text>
            </Title>
            <Text fontML>
              { hashingAlgorithm || '--' }
            </Text>
          </Col>
          <Col left>
            <Title>
              <Text fontML color100>
                { t('coinDetail.total volume') }
              </Text>
            </Title>
            <Text fontML>
              { totalVolume
                ? currencySymbol(language === 'ko' ? 'krw' : 'usd') 
                  + convertUnits(totalVolume, language) 
                : '--' 
              }
            </Text>
          </Col>
        </Row>
        <Row top bottom>
          <Col>
            <Title>
              <Text fontML color100>
                { t('coinDetail.launched date') }
              </Text>
            </Title>
            <Text fontML>
              { genesis_date || '--' }
            </Text>
          </Col>
          <Col left>
            <Title>
              <Text fontML color100>
                { t('coinDetail.circulating supply') } 
                { ' / ' } 
                { t('coinDetail.max supply') }
              </Text>
            </Title>
            <Text fontML>
              { convertUnits(circulatingSupply, language) || '--' }
              { ' / ' } 
              { maxSupply || '--' }
            </Text>
          </Col>
        </Row>
      </Table>
    </Container>
  )
}

export default Stats;

type RowProps = {
  top?: boolean;
  bottom?: boolean;
}

type ColProps = {
  left?: boolean;
}

const Container = styled.View`
  margin-top: ${({ theme }) => theme.content.blankSpacing};
  background-color: ${({ theme }) => theme.base.background.surface};
`

const Header = styled.View`
  padding: 20px ${({ theme }) => theme.content.spacing};
`

const Table = styled.View`
  margin-bottom: 20px;
`

const Row = styled.View<RowProps>`
  flex-direction: row;
  ${
    (props) => 
      props.top && css`
        border-top-width: 1px;
        border-top-color: ${props.theme.base.background[200]};
      `
  } 
  ${
    (props) => 
      props.bottom && css`
        border-bottom-width: 1px;
        border-bottom-color: ${props.theme.base.background[200]};
      `
  } 
`

const Col = styled.View<ColProps>`
  width: 50%;
  padding: 10px ${({ theme }) => theme.content.spacing};
  ${
    (props) => 
      props.left && css`
        border-left-width: 1px;
        border-left-color: ${props.theme.base.background[200]};
      `
  }
`

const Title = styled.View`
  padding-bottom: 10px;
`