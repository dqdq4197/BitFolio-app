export interface SearchIcos {
  categories: SearchCategory[]
  nfts: SearchNFT[]
}

export interface SearchCategory {
  /** category ID */
  id: string
  /** category name */
  name: string
}

export interface SearchNFT {
  /** NFT collection ID */
  id: string
  /** NFT name */
  name: string
  /** NFT collection symbol */
  symbol: string
  /** NFT collection thumb image url */
  thumb: string
}
