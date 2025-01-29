import React from 'react'
import styled, { css } from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { baseTypes } from 'base-types'

import { convertUnits } from '/lib/utils'

import Text from '/components/common/Text'
import SurfaceWrap from '/components/common/SurfaceWrap'

type StatsProps = {
  rank: number
  marketcap: number
  totalVolume: number
  genesis_date: string
  maxSupply: number | null
  circulatingSupply: number
  hashingAlgorithm: string
  currency: baseTypes.Currency
}

const Stats = ({
  rank,
  marketcap,
  totalVolume,
  genesis_date,
  maxSupply,
  circulatingSupply,
  hashingAlgorithm,
  currency,
}: StatsProps) => {
  const { t } = useTranslation()

  return (
    <SurfaceWrap title={t('coinDetail.statistic')} fontL parentPaddingZero>
      <Table>
        <Row top>
          <Col>
            <Title>
              <Text>{t('coinDetail.rank')}</Text>
            </Title>
            <Text bold color100>
              {rank || '--'}
            </Text>
          </Col>
          <Col left>
            <Title>
              <Text>{t('coinDetail.market cap')}</Text>
            </Title>
            <Text bold color100>
              {marketcap ? convertUnits(marketcap, currency) : '--'}
            </Text>
          </Col>
        </Row>
        <Row top>
          <Col>
            <Title>
              <Text>{t('coinDetail.algorithm')}</Text>
            </Title>
            <Text bold color100>
              {hashingAlgorithm || '--'}
            </Text>
          </Col>
          <Col left>
            <Title>
              <Text>{t('coinDetail.total volume')}(24h)</Text>
            </Title>
            <Text bold color100>
              {totalVolume ? convertUnits(totalVolume, currency) : '--'}
            </Text>
          </Col>
        </Row>
        <Row top bottom>
          <Col>
            <Title>
              <Text>{t('coinDetail.launched date')}</Text>
            </Title>
            <Text bold color100>
              {genesis_date || '--'}
            </Text>
          </Col>
          <Col left>
            <Title>
              <Text>
                {t('coinDetail.circulating supply')}
                {' / '}
                {t('coinDetail.max supply')}
              </Text>
            </Title>
            <Text bold color100>
              {circulatingSupply !== 0
                ? convertUnits(circulatingSupply, currency, false)
                : '--'}
              {' / '}
              {maxSupply ? convertUnits(maxSupply, currency, false) : '--'}
            </Text>
          </Col>
        </Row>
      </Table>
    </SurfaceWrap>
  )
}

export default Stats

type RowProps = {
  top?: boolean
  bottom?: boolean
}

type ColProps = {
  left?: boolean
}

const Table = styled.View`
  margin-bottom: 10px;
`

const Row = styled.View<RowProps>`
  flex-direction: row;
  ${props =>
    props.top &&
    css`
      border-top-width: 1px;
      border-top-color: ${props.theme.base.background[300]};
    `}
  ${props =>
    props.bottom &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${props.theme.base.background[300]};
    `}
`

const Col = styled.View<ColProps>`
  width: 50%;
  padding: 10px ${({ theme }) => theme.content.spacing};
  ${props =>
    props.left &&
    css`
      border-left-width: 1px;
      border-left-color: ${props.theme.base.background[300]};
    `}
`

const Title = styled.View`
  padding-bottom: 10px;
`
