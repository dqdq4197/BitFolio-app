export type TrendingNFTData = {
  /** NFT collection floor price */
  floor_price: string
  /** NFT collection floor price in usd 24 hours percentage change */
  floor_price_in_usd_24h_percentage_change: string
  /** NFT collection volume in 24 hours */
  h24_volume: string
  /** NFT collection 24 hours average sale price */
  h24_average_sale_price: string
  /** NFT collection sparkline image url */
  sparkline: string
  /** NFT collection content string */
  content: string
}

export type TrendingNFT = {
  /** NFT collection ID */
  id: string
  /** NFT collection name */
  name: string
  /** NFT collection symbol */
  symbol: string
  /** NFT collection thumb image url */
  thumb: string
  nft_contract_id: number
  /** NFT collection native currency symbol */
  native_currency_symbol: string
  /** NFT collection floor price in native currency */
  floor_price_in_native_currency: number
  /** NFT collection floor price 24 hours percentage change */
  floor_price_24h_percentage_change: number
  data: TrendingNFTData
}
