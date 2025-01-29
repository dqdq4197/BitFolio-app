import React, { useEffect, useState, useMemo } from 'react'
import { Dimensions } from 'react-native'
import Svg, { Path, Line } from 'react-native-svg'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'

import { CoinStatType, PortfolioStatsType } from '/hooks/usePortfolioStats'
import useSparkLineModel from '/hooks/useSparkLineModel'
import useGlobalTheme from '/hooks/useGlobalTheme'
import useLocales from '/hooks/useLocales'
import { getCurrencySymbol, currencyFormat } from '/lib/utils/currencyFormat'
import { digitToFixed } from '/lib/utils'
import type { CoinMarketReturn } from '/types/coinGeckoReturnType'

import Image from '/components/common/Image'
import Text from '/components/common/Text'
import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue'
import DynamicSizeText from '/components/common/DynamicSizeText'
import { usePortfolioContext } from './PortfolioDataContext'

const YSIZE = 70
const CARD_SPACING = 5

const { width } = Dimensions.get('window')
interface PerformerType
  extends CoinStatType,
    Pick<CoinMarketReturn, 'sparkline_in_7d' | 'image' | 'symbol'> {
  oneDayAgoPrice: number
}

type PerformersType = {
  bestPerformer: PerformerType
  worstPerformer: PerformerType
}

interface SparkLineProps extends Pick<PerformerType, 'oneDayAgoPrice'> {
  prices: number[]
  isRising: boolean
}

type PerformerCardProps = {
  renderKey: keyof PerformersType
  data: PerformersType | null
}

interface StatisticsViewProps extends Pick<PortfolioStatsType, 'coins'> {
  portfolio_all_time_pl?: number
  portfolio_all_time_pl_percentage?: number
}

const SparkLine = ({ prices, isRising, oneDayAgoPrice }: SparkLineProps) => {
  const { theme } = useGlobalTheme()

  const XSIZE = useMemo(() => {
    return (
      (width - parseInt(theme.content.spacing, 10) * 2) / 2 - 26 - CARD_SPACING
    )
  }, [theme])

  const { path, scaleY } = useSparkLineModel({
    prices: prices.slice(-100),
    xSize: XSIZE,
    ySize: YSIZE,
  })

  return (
    <Svg width={XSIZE} height={YSIZE}>
      <Path
        d={path}
        stroke={
          isRising === null
            ? theme.base.text[200]
            : isRising
            ? theme.base.upColor
            : theme.base.downColor
        }
      />
      <Line
        x1={0}
        y1={scaleY(oneDayAgoPrice)}
        x2={XSIZE}
        y2={scaleY(oneDayAgoPrice)}
        stroke={theme.base.text[200]}
        strokeWidth="1"
        strokeDasharray="5, 5"
      />
    </Svg>
  )
}

const TopPerPormerCard = ({ renderKey, data }: PerformerCardProps) => {
  const { t } = useTranslation()
  const { currency } = useLocales()
  if (!data) return <></>
  const stats = data[renderKey]
  return (
    <CardContainer>
      <Row>
        <Image uri={stats.image} width={30} height={30} borderRedius="m" />
        <Text color100 fontML bold margin="5px 0 0 10px">
          {stats.symbol.toUpperCase()}
        </Text>
      </Row>
      <SparkLine
        prices={stats.sparkline_in_7d.price}
        isRising={stats.pl_24h > 0}
        oneDayAgoPrice={stats.oneDayAgoPrice}
      />
      <Text bold margin="10px 0 5px 0">
        {renderKey === 'bestPerformer'
          ? `24h${t(`portfolio.best performer`)}`
          : `24h${t(`portfolio.worst performer`)}`}
      </Text>
      <DynamicSizeText heavy color100 margin="0 0 3px 0" defaultSize="font_ml">
        {currencyFormat({
          value: stats.pl_24h,
          prefix:
            stats.pl_24h > 0
              ? `+${getCurrencySymbol(currency)}`
              : getCurrencySymbol(currency),
        })}
      </DynamicSizeText>
      <IncreaseDecreaseValue
        value={digitToFixed(
          stats.total_purchase_quantity === 0
            ? 0
            : stats.pl_percentage_24h ?? 0,
          2
        )}
        afterPrefix="%"
        bold
      />
    </CardContainer>
  )
}

const StatisticsView = ({
  coins,
  portfolio_all_time_pl,
  portfolio_all_time_pl_percentage,
}: StatisticsViewProps) => {
  const { t } = useTranslation()
  const { coinsData } = usePortfolioContext()
  const { currency } = useLocales()
  const [topPerformers, setTopPerformers] = useState<PerformersType | null>(
    null
  )

  useEffect(() => {
    if (coinsData) {
      const sortedCoins = Object.entries(coins).sort((a, b) => {
        return b[1].pl_24h - a[1].pl_24h
      })

      const bestPerformerData = coinsData.find(
        coin => coin.id === sortedCoins[0][0]
      )
      const worstPerformerData = coinsData.find(
        coin => coin.id === sortedCoins.slice(-1)[0][0]
      )

      const bestPerformerStats = sortedCoins[0][1]
      const worstPerformerStats = sortedCoins.slice(-1)[0][1]

      const BestPerformerOneDayAgoPrice =
        (bestPerformerStats.price -
          bestPerformerStats.pl_24h / bestPerformerStats.holding_quantity) /
        bestPerformerStats.price_per_usd

      const WorstPerformerOneDayAgoPrice =
        (worstPerformerStats.price -
          worstPerformerStats.pl_24h / worstPerformerStats.holding_quantity) /
        worstPerformerStats.price_per_usd

      setTopPerformers({
        bestPerformer: {
          ...bestPerformerStats,
          oneDayAgoPrice: BestPerformerOneDayAgoPrice,
          sparkline_in_7d: {
            ...bestPerformerData!.sparkline_in_7d,
          },
          image: bestPerformerData!.image,
          symbol: bestPerformerStats!.symbol,
        },
        worstPerformer: {
          ...worstPerformerStats,
          oneDayAgoPrice: WorstPerformerOneDayAgoPrice,
          sparkline_in_7d: {
            ...worstPerformerData!.sparkline_in_7d,
          },
          image: worstPerformerData!.image,
          symbol: worstPerformerData!.symbol,
        },
      })
    }
  }, [coins, coinsData])

  if (
    portfolio_all_time_pl === undefined ||
    portfolio_all_time_pl_percentage === undefined ||
    topPerformers === undefined
  ) {
    return <></>
  }

  return (
    <>
      <AllTimePLContainer>
        <Text bold>{t(`portfolio.all time profit/loss`)}</Text>
        <AllTimePLValueWrap>
          <Text right bold fontML margin="0 0 5px 0">
            {currencyFormat({
              value: portfolio_all_time_pl,
              prefix:
                portfolio_all_time_pl > 0
                  ? `+${getCurrencySymbol(currency)}`
                  : getCurrencySymbol(currency),
            })}
          </Text>
          <IncreaseDecreaseValue
            value={digitToFixed(
              portfolio_all_time_pl_percentage === 0
                ? 0
                : portfolio_all_time_pl_percentage ?? 0,
              2
            )}
            afterPrefix="%"
            bold
            right
          />
        </AllTimePLValueWrap>
      </AllTimePLContainer>
      <TopPerformerContents>
        <TopPerPormerCard renderKey="bestPerformer" data={topPerformers} />
        <TopPerPormerCard renderKey="worstPerformer" data={topPerformers} />
      </TopPerformerContents>
    </>
  )
}

export default StatisticsView

const AllTimePLContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.base.background[200]};
  border-radius: ${({ theme }) => theme.border.m};
  padding: 10px 13px;
  margin-top: 15px;
`

const AllTimePLValueWrap = styled.View``

const TopPerformerContents = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`

const CardContainer = styled.View`
  width: ${({ theme }) =>
    (width - parseInt(theme.content.spacing, 10) * 2) / 2 - CARD_SPACING}px;
  background-color: ${({ theme }) => theme.base.background[200]};
  border-radius: ${({ theme }) => theme.border.m};
  padding: 13px;
`

const Row = styled.View`
  flex-direction: row;
`
